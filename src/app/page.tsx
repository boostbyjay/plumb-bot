import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { DispatchBanner } from "@/components/site/dispatch-banner";
import { Services } from "@/components/site/services";
import { RecentWork } from "@/components/site/recent-work";
import { Fixtures } from "@/components/site/fixtures";
import { Commercial } from "@/components/site/commercial";
import { About } from "@/components/site/about";
import { Estimate } from "@/components/site/estimate";
import { ServiceAreas } from "@/components/site/service-areas";
import { Testimonials } from "@/components/site/testimonials";
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
        <DispatchBanner />
        <Services />
        <RecentWork />
        <Fixtures />
        <Commercial />
        <About />
        <Estimate />
        <ServiceAreas />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <MobileStickyBar />
      <BackToTop />
    </>
  );
}
