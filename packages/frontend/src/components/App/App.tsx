import { FC, useState } from "react";
import { NameDisplay } from "../NameDisplay";

const App: FC = () => {
    const [name, setName] = useState<string>();

    return (
        <div>
            Hello, {name ? <NameDisplay name={name} /> : "[unknown]"}!
            <button onClick={() => setName("world")}>Set name</button>
        </div>
    );
};

export { App };
