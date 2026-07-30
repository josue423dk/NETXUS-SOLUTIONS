import { ContactForm, SectionHeader } from "../components/ui"

export function Cotizacion() {
  return (
    <section className="py-16 md:py-24 sm:py-28 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          overline="Cotización"
          title="Contanos sobre tu proyecto"
          description="Completá el formulario y nos pondremos en contacto para entender tus necesidades y preparar una propuesta personalizada."
          as="h1"
        />

        <div className="rounded-md border border-neutral-300/50 shadow-md p-4 sm:p-6 md:p-8 bg-neutral-50">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}