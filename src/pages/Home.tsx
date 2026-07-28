import ScrollProgress from '../components/ScrollProgress';
import Navbar from '../sections/Navbar';
import HeroParallax from '../sections/HeroParallax';
import Divider from '../sections/Divider';
import DividerAlt from '../sections/DividerAlt';
import About from '../sections/About';
import WhoWeAre from '../sections/WhoWeAre';
import MVV from '../sections/MVV';
import Services from '../sections/Services';
import WhyChoose from '../sections/WhyChoose';
import GalleryCarousel from '../sections/GalleryCarousel';
import Testimonials from '../sections/Testimonials';
import Partners from '../sections/Partners';
import Founder from '../sections/Founder';
import FAQ from '../sections/FAQ';
import Blog from '../sections/Blog';
import ContactEnhanced from '../sections/ContactEnhanced';
import Newsletter from '../sections/Newsletter';
import Footer from '../sections/Footer';
import WhatsAppWidget from '../components/WhatsAppWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0f14]">
      <ScrollProgress />
      <Navbar />
      <HeroParallax />
      <Divider />
      <About />
      <Divider />
      <WhoWeAre />
      <DividerAlt />
      <MVV />
      <Divider />
      <Services />
      <DividerAlt />
      <WhyChoose />
      <Divider />
      <GalleryCarousel />
      <DividerAlt />
      <Testimonials />
      <Divider />
      <Partners />
      <DividerAlt />
      <Founder />
      <Divider />
      <Blog />
      <Divider />
      <FAQ />
      <Divider />
      <ContactEnhanced />
      <Newsletter />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
