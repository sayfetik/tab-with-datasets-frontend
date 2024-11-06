import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./css/main.css";
import "@mantine/core/styles.css";

const app = ReactDOMClient.createRoot(document.getElementById("root"));
app.render(<App />);

/*ReactDOM.render(<App />, document.getElementById('root));*/
