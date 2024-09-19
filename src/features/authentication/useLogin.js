import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: () => {
            // onSuccess: (user) => {
            // console.log("User:", user);
            navigate("/dashboard");
        },
        onError: (err) => {
            console.log("Error:", err);
            toast.error(
                "Provided email and/or password are incorrect",
                err.message
            );
        },
    });
    return { login, isLoading };
}
