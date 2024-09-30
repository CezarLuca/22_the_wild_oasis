import { useLocalStorageState } from "../hooks/useLocalStorageState";
import PropTypes from "prop-types";
import { DarkModeContext } from "./useDarkMode";
import { useEffect } from "react";

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        true,
        "isDarkMode"
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode((prev) => !prev);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DarkModeProvider;
