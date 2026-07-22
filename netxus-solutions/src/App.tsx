import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/Hero'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App
