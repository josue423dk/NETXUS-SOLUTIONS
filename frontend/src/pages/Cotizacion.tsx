import { ContactForm } from "../components/ui/ContactForm"

export function Cotizacion() {
  return (
    <section className="py-24 sm:py-28 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-700 dark:text-primary-500 font-accent tracking-[0.2em] text-sm uppercase">
            Cotización
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-900 leading-tight">
            Contanos sobre tu proyecto
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-xl mx-auto leading-relaxed">
            Completá el formulario y nos pondremos en contacto para
            entender tus necesidades y preparar una propuesta personalizada.
          </p>
        </div>

        <div className="rounded-md border border-neutral-300/50 shadow-md p-6 sm:p-8 bg-neutral-50">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}