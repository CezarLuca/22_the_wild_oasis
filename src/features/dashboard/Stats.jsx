import PropTypes from "prop-types";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";

function Stats({ bookings, confirmedStays }) {
    // 1. Calculate the number of bookings
    const numBookings = bookings.length;

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={numBookings}
            />
            <Stat
                title="Check-ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={numBookings}
            />
            <Stat
                title="Occcupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={numBookings}
            />
        </>
    );
}

Stats.propTypes = {
    bookings: PropTypes.array.isRequired,
    confirmedStays: PropTypes.array.isRequired,
};

export default Stats;
