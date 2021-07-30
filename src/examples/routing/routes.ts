import React from "react";
import View from "./views";

export interface Route {
    path: string;
    component: React.ElementType<any>
};

const routes: Route[] = [
    {
        path: "/",
        component: View
    },
    {
        path: "/1",
        component: View
    },
    {
        path: "/2",
        component: View
    },
    {
        path: "/3",
        component: View
    }
];

export default routes;