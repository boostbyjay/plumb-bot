import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { DispatchBanner } from "@/components/site/dispatch-banner";
import { Estimate } from "@/components/site/estimate";
import { MobileStickyBar } from "@/components/site/mobile-sticky-bar";
import { BackToTop } from "@/components/site/back-to-top";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <DispatchBanner />
      <main className="flex-1">
        {children}
        <Estimate />
      </main>
      <Footer />
      <MobileStickyBar />
      <BackToTop />
    </>
  );
}
