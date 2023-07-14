import { useDynamicContext } from "@dynamic-labs/sdk-react"
import Auth from "./pages/Signin"
import BaseRouter from "./routes/BaseRouter"

function App() {
  const { isAuthenticated } = useDynamicContext()

  return <div className="App">{isAuthenticated ? <BaseRouter /> : <Auth />}</div>
}

export default App
