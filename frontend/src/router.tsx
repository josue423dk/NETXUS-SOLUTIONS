import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Layout } from "./components/layout/Layout"
import { Spinner } from "./components/ui/Spinner"

const Inicio = lazy(() => import("./pages/Inicio").then((m) => ({ default: m.Inicio })))
const Cotizacion = lazy(() => import("./pages/Cotizacion").then((m) => ({ default: m.Cotizacion })))
const QuienesSomos = lazy(() => import("./pages/QuienesSomos").then((m) => ({ default: m.QuienesSomos })))
const Integrantes = lazy(() => import("./pages/Integrantes").then((m) => ({ default: m.Integrantes })))
const PreguntasFrecuentes = lazy(() => import("./pages/PreguntasFrecuentes").then((m) => ({ default: m.PreguntasFrecuentes })))

function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}>
      {children}
    </Suspense>
  )
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-heading font-bold text-primary-900 dark:text-neutral-900 mb-4">
        404
      </h1>
      <p className="text-lg text-neutral-700 dark:text-neutral-700 mb-8">
        La página que buscás no existe.
      </p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/50"
      >
        Volver al inicio
      </a>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <PageSuspense><Inicio /></PageSuspense> },
      { path: "cotizacion", element: <PageSuspense><Cotizacion /></PageSuspense> },
      { path: "quienes-somos", element: <PageSuspense><QuienesSomos /></PageSuspense> },
      { path: "integrantes", element: <PageSuspense><Integrantes /></PageSuspense> },
      { path: "preguntas-frecuentes", element: <PageSuspense><PreguntasFrecuentes /></PageSuspense> },
      { path: "*", element: <NotFound /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
