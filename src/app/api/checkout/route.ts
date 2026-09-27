import { products, site } from "@/content";
import { buildCheckoutItems, type CheckoutLine } from "@/lib/checkout";
import { integrationIdentifier, stripeClient } from "@/lib/stripe";

function isLine(value: unknown): value is CheckoutLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CheckoutLine;
  return (
    typeof line.slug === "string" &&
    typeof line.size === "string" &&
    typeof line.quantity === "number"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  const rawLines = body && typeof body === "object" && "lines" in body ? body.lines : null;
  if (!Array.isArray(rawLines) || !rawLines.every(isLine)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const built = buildCheckoutItems(
    rawLines,
    products.map((product) => ({
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      description: site.categoryBlurbs[product.category],
    })),
    site.apparelSizes,
  );
  if ("error" in built) {
    return Response.json({ error: built.error }, { status: 400 });
  }

  const stripe = stripeClient();
  if (!stripe) return Response.json({ error: "unavailable" }, { status: 503 });

  const origin = new URL(request.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: built.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.unitAmount,
        product_data: {
          name: item.name,
          description: item.description,
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ["US"] },
    phone_number_collection: { enabled: true },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/shop`,
    integration_identifier: integrationIdentifier(),
  });

  if (!session.url) return Response.json({ error: "unavailable" }, { status: 502 });
  return Response.json({ url: session.url });
}
