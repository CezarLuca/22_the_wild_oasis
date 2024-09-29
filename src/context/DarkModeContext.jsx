// import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import PropTypes from "prop-types";
import { DarkModeContext } from "./useDarkMode";

// const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        false,
        "isDarkMode"
    );

    function toggleDarkMode() {
        setIsDarkMode((prev) => !prev);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

// function useDarkMode() {
//     const context = useContext(DarkModeContext);
//     if (!context) {
//         throw new Error(
//             "useDarkMode context must be used within a DarkModeProvider"
//         );
//     }
//     return context;
// }

DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// export { DarkModeProvider, useDarkMode };

export { DarkModeProvider };
