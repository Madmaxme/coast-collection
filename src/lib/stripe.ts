import Stripe from "stripe";

let client: Stripe | null = null;

export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

export const INTEGRATION_IDENTIFIER = "coast_checkout_mkwqplzn";

export async function newestCustomerId(stripe: Stripe, email: string) {
  const customers = await stripe.customers.list({ email, limit: 100 });
  return customers.data.toSorted((left, right) => right.created - left.created)[0]?.id ?? null;
}
