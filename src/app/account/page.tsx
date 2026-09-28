import { SignIn, SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content";
import { paidOrdersForEmail } from "@/lib/orders";

function dollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function AccountPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const account = email ? await paidOrdersForEmail(email) : { shipping: null, orders: [] };
  const accountLabel = site.utilityNav.find((item) => item.label.toLowerCase() === "account")?.label;

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
      <main
        className={
          email
            ? "mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-16"
            : "account-login mx-auto flex w-full max-w-[26rem] flex-1 flex-col px-4 py-20"
        }
      >
        <h1
          className={`font-heading text-3xl tracking-[0.08em] uppercase ${email ? "" : "text-center"}`}
        >
          {email ? accountLabel : site.sheetCopy.signIn}
        </h1>
        {email ? (
          <>
            <p className="text-[15px]">{email}</p>
            {account.shipping ? (
              <p className="text-[15px] whitespace-pre-line text-ink/80">{account.shipping}</p>
            ) : null}
            {account.orders.length === 0 ? (
              <Link
                href="/shop"
                className="flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase"
              >
                {site.navLabel}
              </Link>
            ) : (
              <ul className="flex flex-col gap-6">
                {account.orders.map((order) => (
                  <li key={order.id} className="border-b border-craft/15 pb-6">
                    {order.names.map((name, index) => (
                      <p key={`${order.id}-${index}`} className="text-[15px]">
                        {name}
                      </p>
                    ))}
                    <p className="text-[13px] text-ink/70">{dollars(order.amountTotal)}</p>
                  </li>
                ))}
              </ul>
            )}
            <SignOutButton>
              <button
                type="button"
                className="flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase"
              >
                {site.sheetCopy.signOut}
              </button>
            </SignOutButton>
          </>
        ) : (
          <div className="mt-10 w-full">
            <SignIn routing="hash" fallbackRedirectUrl="/account" />
          </div>
        )}
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
