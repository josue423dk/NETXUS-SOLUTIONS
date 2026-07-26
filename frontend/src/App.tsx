import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { TrabajosGrid } from './components/sections/TrabajosGrid'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />
      <main>
        <Hero />
        <TrabajosGrid />
      </main>
      <Footer />
    </div>
  )
}

export default App
