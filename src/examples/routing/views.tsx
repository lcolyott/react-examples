import { RouteComponentProps } from "./types";

export type ViewProps = RouteComponentProps<{
    viewName?: string;
    color?: string;
}>

const View: React.FunctionComponent<ViewProps> = (props) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "400px", height: "300px", backgroundColor: `${props.color ?? ""}` }}>
            <h1>{props.viewName ?? "View"}</h1>
            {props.children}
        </div>
    );
};

export default View;