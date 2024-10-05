import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import { ErrorBoundary } from "react-error-boundary";
// import './index.css'
// if (typeof global === "undefined") {
//     window.global = window;
// }

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
        </ErrorBoundary>
    </StrictMode>
);
