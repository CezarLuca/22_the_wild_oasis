import { createContext, useContext } from "react";

const DarkModeContext = createContext();

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error(
            "useDarkMode context must be used within a DarkModeProvider"
        );
    }
    return context;
}

export { useDarkMode, DarkModeContext };
