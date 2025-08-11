import { createRootRoute } from "@tanstack/react-router";
import { homePageRoute } from "./homepage.js";
import { dashboardRoute } from "./dashboard.js";
import {authRoute} from "./auth.route.js";
import RootLayout from "../RouteLayout";

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dashboardRoute
])