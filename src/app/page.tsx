import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { ActivityFeatures } from "@/components/landing/activity-features"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ActivityFeatures />
      <Footer />
    </main>
  )
}