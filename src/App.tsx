import { useDynamicContext } from "@dynamic-labs/sdk-react"
import Auth from "./pages/Signin"
import BaseRouter from "./routes/BaseRouter"
import { Analytics } from "@vercel/analytics/react"

function App() {
  const { isAuthenticated } = useDynamicContext()

  return (
    <div className="App">
      {isAuthenticated ? <BaseRouter /> : <Auth />}
      <Analytics />
    </div>
  )
}

export default App
