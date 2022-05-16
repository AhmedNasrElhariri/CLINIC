import React, { useEffect, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import client from "./apollo-client/client";
import "./i18n";

function AppWithCallbackAfterRender() {
  useEffect(() => {});

  return (
    <React.StrictMode>
      <Suspense fallback={<span>Loading...</span>}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Suspense>
    </React.StrictMode>
  );
}
const container = document.getElementById("root");
const root = createRoot(container);
// const root = ReactDOM.createRoot(container);
root.render(<AppWithCallbackAfterRender />);
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
