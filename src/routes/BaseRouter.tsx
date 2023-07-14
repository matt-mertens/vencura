import { Routes, Route } from "react-router-dom"
import { ROUTES_CONFIG } from "./routes"

export default function BaseRouter(): JSX.Element {
  return (
    <Routes>
      {ROUTES_CONFIG.map(
        ({ title, path, layout: Layout, page: Page }: { title: string; path: string; layout: any; page: any }) => (
          <Route
            key={title}
            path={path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        )
      )}
    </Routes>
  )
}
