import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { ClearCart } from "@/components/ClearCart";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content";
import { receiptForSession } from "@/lib/orders";

function dollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;
  const receipt = id ? await receiptForSession(id) : null;

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
      <main className="mx-auto flex w-full max-w-[26rem] flex-1 flex-col px-4 py-20">
        {receipt ? <ClearCart /> : null}
        <h1 className="text-center font-heading text-3xl tracking-[0.08em] uppercase">
          {receipt ? site.sheetCopy.orderReceived : site.sheetCopy.paymentUnconfirmed}
        </h1>
        <p className="mt-4 text-center text-[15px] text-ink/80">
          {receipt ? site.sheetCopy.orderReceivedBody : site.sheetCopy.paymentUnconfirmedBody}
        </p>
        {receipt?.email ? <p className="mt-2 text-center text-[15px]">{receipt.email}</p> : null}
        {receipt ? (
          <>
            <ul className="mt-10 flex flex-col gap-4 border-t border-craft/15 pt-6">
              {receipt.lines.map((line) => (
                <li key={`${line.name}-${line.quantity}`} className="flex justify-between gap-4 text-[15px]">
                  <span>{line.quantity > 1 ? `${line.name} × ${line.quantity}` : line.name}</span>
                  <span>{dollars(line.amount)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex justify-between border-t border-craft/15 pt-4 text-[15px]">
              <span>{site.sheetCopy.cartTotal}</span>
              <span>{dollars(receipt.total)}</span>
            </p>
            {receipt.shipping ? (
              <p className="mt-8 text-[15px] whitespace-pre-line text-ink/80">{receipt.shipping}</p>
            ) : null}
            <Link
              href="/shop"
              className="mt-10 flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase"
            >
              {site.navLabel}
            </Link>
          </>
        ) : null}
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
