import { AnnouncementBar } from "@/components/AnnouncementBar";
import { ClearCart } from "@/components/ClearCart";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content";
import { stripeClient } from "@/lib/stripe";

async function paymentSettled(sessionId: string) {
  const stripe = stripeClient();
  if (!stripe) return false;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    return false;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;
  const paid = id ? await paymentSettled(id) : false;

  return (
    <div className="flex flex-1 flex-col">
      <AnnouncementBar announcement={site.announcement} />
      <Header
        wordmark={site.wordmark}
        navLabel={site.navLabel}
        menuLabel={site.menuLabel}
        social={site.social}
        utilityNav={site.utilityNav}
        infoNav={site.infoNav}
        sheetCopy={site.sheetCopy}
      />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-16">
        {paid ? <ClearCart /> : null}
        <h1 className="font-heading text-3xl tracking-[0.08em] uppercase">
          {paid ? site.sheetCopy.orderReceived : site.sheetCopy.paymentUnconfirmed}
        </h1>
        <p className="mt-4 text-[15px] text-ink/80">
          {paid ? site.sheetCopy.orderReceivedBody : site.sheetCopy.paymentUnconfirmedBody}
        </p>
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
