import PropTypes from "prop-types";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    // 1. Calculate the number of bookings
    const numBookings = bookings.length;

    // 2. Calculate the number of total sales
    const totalSales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);

    // 3. Calculate the number of confirmed stays (total check-ins)
    const checkinsAmount = confirmedStays.length;

    // 4. Calculate the occupancy rate
    // For now, we'll use the number of checked-in nights divided by the total number of nights
    const occupancy = confirmedStays.reduce(
        (acc, cur) => acc + cur.num_nights,
        0
    );
    const totalNights = numDays * cabinCount;
    const occupancyRate = Math.round((occupancy / totalNights) * 100);

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
                value={formatCurrency(totalSales)}
            />
            <Stat
                title="Check-ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkinsAmount}
            />
            <Stat
                title="Occcupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={`${occupancyRate}%`}
            />
        </>
    );
}

Stats.propTypes = {
    bookings: PropTypes.array.isRequired,
    confirmedStays: PropTypes.array.isRequired,
    numDays: PropTypes.number.isRequired,
    cabinCount: PropTypes.number.isRequired,
};

export default Stats;
