function ProtectedRoute({ children }) {
    // 1. Load the authenticated user

    // 2. While loading, show a loading spinner

    // 3.If there is no authenticated user, redirect to the login page

    // 4. If there is an authenticated user, show the children (render the app)

    return children;
}

export default ProtectedRoute;
