import React from "react";
import { Model, createServer, Factory } from "miragejs";
import "../examples.scss";
import "./reminders.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { start } from "repl";
import * as _ from "lodash";
import clsx from "clsx";
import { ClickAwayListener } from "@material-ui/core";

type Reminder = {
    id: number;
    text: string;
    completed: boolean;
}

// I use MirageJS to create a mock API server and fake api calls
let server = createServer({
    models: {
        reminder: Model.extend<Partial<Reminder>>({}),
    },
    seeds(server) {
        server.createList("reminder", 0);
    },
    routes() {
        this.namespace = "api";

        this.get("reminders");
        this.post("reminders", (schema, request) => {
            //@ts-ignore
            return schema.reminders.create(JSON.parse(request.requestBody));
        });
        this.post("reminders/update", (schema, request) => {
            let attrs = JSON.parse(request.requestBody);

            //@ts-ignore
            return schema.reminders.find(attrs.id).update(attrs);
        })
    },
});

type ListStatus = "Idle" | "Add" | "Posting" | "Fetching";

const ReminderList: React.FunctionComponent<any> = (props) => {
    const [state, setState] = React.useState<{
        reminders: Reminder[],
    }>({
        reminders: [],
    });

    const [status, setStatus] = React.useState<ListStatus>("Idle");

    useEffect(() => {
        getReminders();
    }, []);

    useEffect(() => {
        console.log("Reminders updated!");
    }, [state.reminders])

    const getReminders = () => {
        fetch("/api/reminders", { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setState({ reminders: data.reminders as Reminder[] });
            })
            .catch(err => { console.log(err) });

        setStatus("Idle");
    };

    const postReminder = (event: React.FormEvent) => {
        //@ts-ignore
        let text = event.target.elements["description"].value;

        event.stopPropagation();

        if (!text) {
            return false;
        }

        setStatus("Posting")

        fetch("/api/reminders", { method: "POST", body: JSON.stringify({ text }) })
            .then(response => {
                getReminders();
            });
    };

    const updateReminder = (reminder: Reminder) => {
        fetch("/api/reminders/update", { method: "POST", body: JSON.stringify(reminder) })
            .then(response => {
                getReminders();
            });
    };

    const handleComplete = (id: number) => {
        let reminder: Reminder | undefined = _.find(state.reminders, { "id": id });

        if (reminder) {
            reminder.completed = !reminder.completed ?? true;

            updateReminder(reminder);
        }
    };

    const ReminderItem = (props: { reminder: Partial<Reminder>, onComplete?: (id: number) => void }) => {
        const { reminder, onComplete } = props;
        const className = clsx("ReminderItem", reminder.completed && "Completed")

        return (
            <div className={className} onClick={(event) => reminder.id ? onComplete?.(reminder.id) : {}}>
                {reminder.text}
                <input readOnly type={"checkbox"} checked={reminder.completed ?? false} />
            </div>
        );
    };

    const NewReminder = () => {
        return (
            <form onSubmit={(event) => postReminder(event)}>
                <div className={"ReminderItem AddReminder"}>
                    <input name={"description"} type={"text"} autoFocus={true} className={"Description"} />
                    <button type={"submit"} className={"Btn"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </div >
            </form>
        );
    };

    return (
        <ClickAwayListener onClickAway={() => {
            if (status === "Add") {
                setStatus("Idle");
            }
        }}>
            <div className={"Reminders"}>
                <div className={"Panel"}>
                    <div className={"Toolbar"}>
                        <h1>Reminders</h1>
                        <div className={"Btn"} onClick={() => setStatus("Add")}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                    <div className={"Content"}>
                        {state.reminders?.map((reminder, index) => {
                            console.log(reminder);
                            return <ReminderItem key={index} reminder={reminder} onComplete={handleComplete} />
                        })}
                        {status === "Add" && <NewReminder />}
                    </div>
                </div>
            </div >
        </ClickAwayListener>
    );
};

export default function APIExample() {
    return (
        <div className={"Solution"}>
            <h1>API Example</h1>
            <ReminderList />
        </div>
    );
};