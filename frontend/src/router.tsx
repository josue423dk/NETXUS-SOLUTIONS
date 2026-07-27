import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Layout } from "./components/layout/Layout"

const Inicio = lazy(() => import("./pages/Inicio").then((m) => ({ default: m.Inicio })))
const Cotizacion = lazy(() => import("./pages/Cotizacion").then((m) => ({ default: m.Cotizacion })))
const QuienesSomos = lazy(() => import("./pages/QuienesSomos").then((m) => ({ default: m.QuienesSomos })))
const Integrantes = lazy(() => import("./pages/Integrantes").then((m) => ({ default: m.Integrantes })))
const PreguntasFrecuentes = lazy(() => import("./pages/PreguntasFrecuentes").then((m) => ({ default: m.PreguntasFrecuentes })))

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<Spinner />}><Inicio /></Suspense> },
      { path: "cotizacion", element: <Suspense fallback={<Spinner />}><Cotizacion /></Suspense> },
      { path: "quienes-somos", element: <Suspense fallback={<Spinner />}><QuienesSomos /></Suspense> },
      { path: "integrantes", element: <Suspense fallback={<Spinner />}><Integrantes /></Suspense> },
      { path: "preguntas-frecuentes", element: <Suspense fallback={<Spinner />}><PreguntasFrecuentes /></Suspense> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
