import React from "react";
import { Route } from "./types";
import View, { ViewProps } from "./views";

const routes: Route<ViewProps>[] = [
    {
        path: "/",
        component: View,
        componentProps: {
            viewName: "Index",
            color: "chartreuse",
        }
    },
    {
        path: "/1",
        component: View,
        componentProps: {
            viewName: "Home",
            color: "dodgerblue"
        }
    },
    {
        path: "/2",
        component: View,
        componentProps: {
            viewName: "Account",
            color: "khaki"
        }
    },
    {
        path: "/3",
        component: View,
        componentProps: {
            viewName: "Settings",
            color: "tomato"
        }
    }
];

export default routes;