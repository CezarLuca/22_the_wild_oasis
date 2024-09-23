import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            // queryClient.setQueryData(["user"], { role: "authenticated" });
            queryClient.setQueryData(["user"], user.user);
            // onSuccess: (user) => {
            // console.log("User:", user);
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.log("Error:", err);
            toast.error(
                "Provided email and/or password are incorrect",
                err.message
            );
        },
    });
    return { login, isPending };
}
