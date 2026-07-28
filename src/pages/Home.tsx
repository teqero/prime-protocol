import ScrollProgress from '../components/ScrollProgress';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import Divider from '../sections/Divider';
import DividerAlt from '../sections/DividerAlt';
import About from '../sections/About';
import WhoWeAre from '../sections/WhoWeAre';
import MVV from '../sections/MVV';
import Services from '../sections/Services';
import WhyChoose from '../sections/WhyChoose';
import Gallery from '../sections/Gallery';
import Testimonials from '../sections/Testimonials';
import Partners from '../sections/Partners';
import Founder from '../sections/Founder';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0f14]">
      <ScrollProgress />
      <Navbar />
      <Hero />
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
      <Gallery />
      <DividerAlt />
      <Testimonials />
      <Divider />
      <Partners />
      <DividerAlt />
      <Founder />
      <Divider />
      <FAQ />
      <Divider />
      <Contact />
      <Footer />
    </div>
  );
}
