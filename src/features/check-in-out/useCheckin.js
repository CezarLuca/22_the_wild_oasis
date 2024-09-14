import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, breakfast }) =>
            updateBooking(bookingId, {
                status: "checked-in",
                is_paid: true,
                ...breakfast,
            }),
        onSuccess: (data) => {
            toast.success(
                `Booking #${data.id} has been successfully checked in`
            );
            queryClient.invalidateQueries({ active: true });
            navigate("/bookings?status=checked-in");
        },
        onError: (error) => {
            toast.error(`There was an error checking in: ${error.message}`);
        },
    });

    return { checkin, isCheckingIn };
}
