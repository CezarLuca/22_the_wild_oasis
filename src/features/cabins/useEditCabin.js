import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => {
            return createEditCabin(newCabinData, id);
        },
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            // reset();
        },
        onError: (error) => {
            toast.error(
                `An error occurred while editing the cabin: ${error.message}`
            );
            console.error(error);
        },
    });

    return { isEditing, editCabin };
}
