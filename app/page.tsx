import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Stats from "@/components/Stats"
import Solutions from "@/components/Solutions"
import ProductFeature from "@/components/ProductFeature"
import Projects from "@/components/Projects"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Solutions />
      <ProductFeature />
      <Projects />
      <CTA />
      <Footer />
    </main>
  )
}
