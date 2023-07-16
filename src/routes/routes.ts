// layouts
import Dashboard from "../layouts/Dashboard"

// pages
import Home from "../pages/Home"
import WalletDetail from "../pages/WalletDetail"
import Wallets from "../pages/Wallets"

interface Routes {
  [key: string]: string
}

export const ROUTES: Routes = {
  HOME: "/",
  WALLETS: "/wallets",
  ACCOUNT_DETAIL: "/accounts/:accountAddress",
}

export const ROUTES_CONFIG = [
  { title: "Home", path: ROUTES.HOME, layout: Dashboard, page: Home },
  { title: "Wallets", path: ROUTES.WALLETS, layout: Dashboard, page: Wallets },
  { title: "Wallet Detail", path: ROUTES.ACCOUNT_DETAIL, layout: Dashboard, page: WalletDetail },
]
