export interface ViewProps {

};

const View: React.FunctionComponent<ViewProps> = (props) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "400px", height: "300px" }}>
            <h1>View</h1>
            {props.children}
        </div>
    );
};

export default View;