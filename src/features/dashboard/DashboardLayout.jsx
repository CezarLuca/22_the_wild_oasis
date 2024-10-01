import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
    const {
        stays,
        confirmedStays,
        isLoading: isLoadingStays,
    } = useRecentStays();
    if (isLoadingBookings || isLoadingStays) {
        return <Spinner />;
    }
    console.log(
        "Bookings array:",
        bookings,
        "Stays array:",
        stays,
        "Confirmed stays array:",
        confirmedStays
    );
    return (
        <StyledDashboardLayout>
            <Stats bookings={bookings} confirmedStays={confirmedStays} />
            <div>Today&apos;s activity</div>
            <div>Chart stay durations</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
