import type Stripe from "stripe";
import { stripeClient } from "@/lib/stripe";

export type PaidOrder = {
  id: string;
  amountTotal: number;
  names: string[];
};

function formatShipping(
  details: Stripe.Checkout.Session.CollectedInformation.ShippingDetails | null | undefined,
) {
  if (!details) return null;
  const cityLine = [details.address.city, details.address.state, details.address.postal_code]
    .filter(Boolean)
    .join(" ");
  const lines = [details.name, details.address.line1, details.address.line2, cityLine, details.address.country].filter(
    (line): line is string => Boolean(line),
  );
  return lines.length > 0 ? lines.join("\n") : null;
}

// ponytail: first 100 customers and 100 complete sessions each. Upgrade: auto-paging.
export async function paidOrdersForEmail(email: string) {
  const stripe = stripeClient();
  if (!stripe) return { shipping: null as string | null, orders: [] as PaidOrder[] };

  const customers = await stripe.customers.list({ email, limit: 100 });
  const pages = await Promise.all(
    customers.data.map((customer) =>
      stripe.checkout.sessions.list({
        customer: customer.id,
        status: "complete",
        limit: 100,
        expand: ["data.line_items"],
      }),
    ),
  );
  const paid = pages
    .flatMap((page) => page.data)
    .filter((session) => session.payment_status === "paid")
    .sort((left, right) => right.created - left.created);

  return {
    shipping: formatShipping(paid[0]?.collected_information?.shipping_details),
    orders: paid.map((session) => ({
      id: session.id,
      amountTotal: session.amount_total ?? 0,
      names: (session.line_items?.data ?? [])
        .map((item) => item.description)
        .filter((name): name is string => Boolean(name)),
    })),
  };
}
