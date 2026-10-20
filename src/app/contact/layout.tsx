import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Coupons } from "@/components/site/coupons";
import { MobileStickyBar } from "@/components/site/mobile-sticky-bar";
import { BackToTop } from "@/components/site/back-to-top";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Coupons />
      <Footer />
      <MobileStickyBar />
      <BackToTop />
    </>
  );
}
