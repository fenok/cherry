import { render } from "react-dom";
import { FC } from "react";

const App: FC = () => <div>Hello, world!</div>;

render(<App />, document.getElementById("root"));

export {};
