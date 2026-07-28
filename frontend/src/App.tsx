import { AppRouter } from "./router"
import { ErrorBoundary } from "./components/ui/ErrorBoundary"

export default function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}
