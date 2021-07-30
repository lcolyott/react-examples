export type RouteComponentProps<T = any> = T & {

};

export type Route<T = any> = {
    path: string;
    component: React.ElementType<RouteComponentProps<T>>;
    componentProps?: RouteComponentProps<T>;
};

export interface RouteSwitchProps {
    location?: string;
    routes?: Route[];
};

export interface RouterProps {
    basename?: string;
    routes: Route[];
};

export interface RouterState {
    location?: string;
};