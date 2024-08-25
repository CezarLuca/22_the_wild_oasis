import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfully edited");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
            // reset();
        },
        onError: (error) => {
            toast.error(
                `An error occurred while editing the setting: ${error.message}`
            );
            console.error(error);
        },
    });

    return { isUpdating, updateSetting };
}
