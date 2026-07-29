import { ContactForm } from "../components/ui/ContactForm"
import { SectionHeader } from "../components/ui/SectionHeader"

export function Cotizacion() {
  return (
    <section className="py-24 sm:py-28 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          overline="Cotización"
          title="Contanos sobre tu proyecto"
          description="Completá el formulario y nos pondremos en contacto para entender tus necesidades y preparar una propuesta personalizada."
          as="h1"
          className="text-shadow"
        />

        <div className="rounded-md border border-neutral-300/50 shadow-md p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}