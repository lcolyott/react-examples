import clsx from "clsx";
import React from "react";
import "./index.scss";

type MoveAction = "up" | "down" | "left" | "right";
const MoveActions: MoveAction[] = ["up", "down", "left", "right"];

interface TokenProps {
    onMove: (action: MoveAction) => void;
};

interface TokenState {
    selected?: boolean;
};

function useTokenState(defaultValue?: TokenState) {
    const state = React.useState<TokenState | undefined>(defaultValue);

    return state;
}

function Token(props: TokenProps) {
    const [state, setState] = useTokenState({ selected: false });
    const { onMove } = props;
    let className = clsx("Token", state?.selected && "Selected");

    const setSelected = (selected: boolean) => {
        setState({ selected });
    };

    const handleMove = (action: MoveAction) => {
        props.onMove(action);
    };

    return (
        <div className={className} onClick={() => setSelected(true)}>
            {MoveActions.map((action, index) => {
                className = clsx("MoveButton", action);

                return (
                    <button key={index} className={className} onClick={() => handleMove(action)} >
                        {'>'}
                    </button>
                );
            })}
        </div>
    );
};


interface BoardProps {
    dimensions: [length: number, height: number];
};

interface BoardState {
    tokenLocation: [x: number, y: number];
};

class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            tokenLocation: [0, 0],
        };

        this.setTokenLocation = this.setTokenLocation.bind(this);
        this.handleMoveToken = this.handleMoveToken.bind(this);
    };

    // Set the token location in state
    setTokenLocation = (location: [x: number, y: number]) => {
        console.log(location);

        let newState = { ...this.state };

        if (location[0] < 0) {
            location[0] = this.props.dimensions[0] - 1;
        }
        else if (location[0] > this.props.dimensions[0] - 1) {
            location[0] = 0;
        }

        if (location[1] < 0) {
            location[1] = this.props.dimensions[1] - 1;
        }
        else if (location[1] > this.props.dimensions[1] - 1) {
            location[1] = 0;
        }

        newState.tokenLocation = location;

        this.setState(newState);
    };

    // Determine how the token should move
    handleMoveToken = (action: MoveAction) => {
        let newLocation = this.state.tokenLocation;

        switch (action) {
            case "up": {
                newLocation[0] -= 1;

                break;
            }
            case "down": {
                newLocation[0] += 1;

                break;
            }
            case "left": {
                newLocation[1] -= 1;

                break;
            }
            case "right": {
                newLocation[1] += 1;
                break;
            }
        }

        this.setTokenLocation(newLocation);
    };

    //#region Component Lifecycle Callbacks
    componentDidMount() {
    };

    componentDidUpdate() { };

    componentWillUnmount() { };

    render() {
        const Tkn = <Token onMove={this.handleMoveToken} />

        //#region Subcomponents
        const GridTile = (props: React.PropsWithChildren<{}>) => {
            return (
                <div className={"BoardTile"}>
                    {props.children}
                </div>
            );
        };

        const GridRow = (props: React.PropsWithChildren<{}>) => {
            return (
                <div className={"BoardRow"}>
                    {props.children}
                </div>
            );
        };
        //#endregion

        return (
            <div className={"Board"}>
                {Array(this.props.dimensions[0]).fill(0).map((row, rIndex) => {
                    return (
                        <GridRow key={rIndex}>
                            {Array(this.props.dimensions[1]).fill(0).map((tile, tIndex) => {
                                return (
                                    <GridTile key={tIndex}>
                                        {this.state.tokenLocation[0] === rIndex && this.state.tokenLocation[1] === tIndex && Tkn}
                                    </GridTile>
                                );
                            })}
                        </GridRow>
                    );
                })}
            </div>
        );
    };
    //#endregion
};

function HooksSolution() {
    return (
        <Board dimensions={[5, 5]} />
    );
};

export default HooksSolution;