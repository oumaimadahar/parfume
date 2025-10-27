import HeaderTop from '../components/HeaderTop';
import Navbar from '../components/NavBar';
import BackgroundSlider from '../components/BackgroundSlider';
import CategoriesSection from '../components/CategoriesSection';
import NewProductsSection from '../components/NewProductsSection';
import GalleryShowcase from '../components/GalleryShowcase';
import QualityOffers from "@/components/QualityOffers";
import ContactSection from '@/components/ContactSection';
import Testimonials from '@/components/Testimonials';
import Benefits from '@/components/Benefits';
import Footer from '@/components/footer';



export default function Home() {
  return (
    <div>
     
        <HeaderTop />
        <Navbar />
        <BackgroundSlider />
        {/* Section Catégories (importée) */}
        <CategoriesSection />
        {/* Section Nouveaux Produits (importée) */}
        <NewProductsSection />
        {/* Section des Galerry */}
        <GalleryShowcase />
        {/* Section Quality Offers */}
        <QualityOffers />
        {/* Section Contact */}
        <ContactSection/>
        {/* Section Benefits */}
        <Benefits/>
        {/* Section Testimonials */}
        <Testimonials/>
        {/* Footer */}
        <Footer/>
      

    </div>
  );
}