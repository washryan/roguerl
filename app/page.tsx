import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import CustomizationSection from "@/components/customization-section"
import AboutSection from "@/components/about-section"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />
      <FeaturedProducts />
      <CustomizationSection />
      <AboutSection />
      <Newsletter />
    </div>
  )
}
