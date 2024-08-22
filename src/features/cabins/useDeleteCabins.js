const queryClient = useQueryClient();

const { isLoading: isDeleting, mutate } = useMutation({
    // mutationFn: (id) => {
    //     deleteCabin(id);
    // },
    mutationFn: deleteCabin,
    onSuccess: () => {
        // alert("Cabin deleted successfully");
        toast.success("Cabin deleted successfully");
        queryClient.invalidateQueries({
            queryKey: ["cabins"],
        });
    },
    onError: (error) => {
        // alert("An error occurred: " + error.message);
        toast.error(error.message);
    },
});
