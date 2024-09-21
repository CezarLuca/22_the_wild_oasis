import { useUser } from "../features/authentication/useUser";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-100);
    display: flex;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // 1. Load the authenticated user
    const { isAuthenticated, isLoading } = useUser();
    // console.log("isAuthenticated:", isAuthenticated);

    // 3. If there is no authenticated user, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    // 2. While loading, show a loading spinner
    if (isLoading) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    }

    // const [showSpinner, setShowSpinner] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowSpinner(false);
    //     }, 2000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)

    //     return () => clearTimeout(timer);
    // }, []);

    // if (isLoading || showSpinner) {
    //     return (
    //         <FullPage>
    //             <Spinner />
    //         </FullPage>
    //     );
    // }

    // 4. If there is an authenticated user, show the children (render the app)
    if (isAuthenticated) {
        return children;
    }
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
