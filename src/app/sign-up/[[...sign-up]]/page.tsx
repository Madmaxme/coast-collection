import { SignUp } from "@clerk/nextjs";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content";

export default function SignUpPage() {
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
      <main className="account-login mx-auto flex w-full max-w-[26rem] flex-1 flex-col px-4 py-20">
        <h1 className="text-center font-heading text-3xl tracking-[0.08em] uppercase">
          {site.sheetCopy.createAccount}
        </h1>
        <div className="mt-10 w-full">
          <SignUp fallbackRedirectUrl="/account" />
        </div>
      </main>
      <Footer name={site.name} social={site.social} infoNav={site.infoNav} />
    </div>
  );
}
