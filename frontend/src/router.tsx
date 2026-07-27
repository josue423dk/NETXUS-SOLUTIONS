import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Layout } from "./components/layout/Layout"
import { Spinner } from "./components/ui/Spinner"

const Inicio = lazy(() => import("./pages/Inicio").then((m) => ({ default: m.Inicio })))
const Cotizacion = lazy(() => import("./pages/Cotizacion").then((m) => ({ default: m.Cotizacion })))
const QuienesSomos = lazy(() => import("./pages/QuienesSomos").then((m) => ({ default: m.QuienesSomos })))
const Integrantes = lazy(() => import("./pages/Integrantes").then((m) => ({ default: m.Integrantes })))
const PreguntasFrecuentes = lazy(() => import("./pages/PreguntasFrecuentes").then((m) => ({ default: m.PreguntasFrecuentes })))

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}><Inicio /></Suspense> },
      { path: "cotizacion", element: <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}><Cotizacion /></Suspense> },
      { path: "quienes-somos", element: <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}><QuienesSomos /></Suspense> },
      { path: "integrantes", element: <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}><Integrantes /></Suspense> },
      { path: "preguntas-frecuentes", element: <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}><PreguntasFrecuentes /></Suspense> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
