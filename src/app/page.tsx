import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { Coupons } from "@/components/site/coupons";
import { RecentWork } from "@/components/site/recent-work";
import { Services } from "@/components/site/services";
import { JettingVsSnaking } from "@/components/site/jetting-vs-snaking";
import { SecondOpinionBanner } from "@/components/site/second-opinion-banner";
import { Financing } from "@/components/site/financing";
import { CompetitorComparison } from "@/components/site/competitor-comparison";
import { Guarantees } from "@/components/site/guarantees";
import { Estimate } from "@/components/site/estimate";
import { Fixtures } from "@/components/site/fixtures";
import { Commercial } from "@/components/site/commercial";
import { About } from "@/components/site/about";
import { Testimonials } from "@/components/site/testimonials";
import { ServiceAreas } from "@/components/site/service-areas";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { MobileStickyBar } from "@/components/site/mobile-sticky-bar";
import { BackToTop } from "@/components/site/back-to-top";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 min-w-0 max-w-full overflow-x-clip">
        <Hero />
        <TrustBar />
        <Coupons />
        <RecentWork />
        <Services />
        <JettingVsSnaking />
        <SecondOpinionBanner />
        <Financing />
        <CompetitorComparison />
        <Guarantees />
        <Estimate />
        <Fixtures />
        <Commercial />
        <About />
        <Testimonials />
        <ServiceAreas />
        <Faq />
      </main>
      <Footer />
      <MobileStickyBar />
      <BackToTop />
    </>
  );
}
