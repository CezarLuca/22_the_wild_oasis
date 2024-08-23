import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: (newCabin) => {
            return createEditCabin(newCabin);
        },
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            // reset();
        },
        onError: (error) => {
            toast.error(
                `An error occurred while creating the cabin: ${error.message}`
            );
            console.error(error);
        },
    });

    return { isCreating, createCabin };
}
