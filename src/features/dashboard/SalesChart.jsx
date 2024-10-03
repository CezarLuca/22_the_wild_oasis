import styled from "styled-components";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import PropTypes from "prop-types";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/useDarkMode";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

function SalesChart({ bookings, numDays }) {
    const { isDarkMode } = useDarkMode();

    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });
    // console.log("All dates:", allDates);

    const salesData = allDates.map((date) => {
        return {
            label: format(date, "MMM dd"),
            totalSales: bookings
                .filter((booking) => {
                    return isSameDay(date, new Date(booking.created_at));
                })
                .reduce((acc, cur) => acc + cur.total_price, 0),
            extrasSales: bookings
                .filter((booking) => {
                    return isSameDay(date, new Date(booking.created_at));
                })
                .reduce((acc, cur) => acc + cur.extras_price, 0),
        };
    });
    // console.log("Sales data:", salesData);

    const colors = isDarkMode
        ? {
              totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
              extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
              extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    return (
        <StyledSalesChart>
            <Heading as="h2">
                Sales from {format(allDates.at(0), "dd MMM yyyy")} &mdash;{" "}
                {format(allDates.at(-1), "dd MMM yyyy")}
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        unit="$"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <CartesianGrid strokeDasharray="4" />
                    <Tooltip
                        contentStyle={{ backgroundColor: colors.background }}
                    />
                    <Area
                        dataKey="totalSales"
                        type="monotone"
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        strokeWidth={2}
                        name="Total sales"
                        unit={"$"}
                    />
                    <Area
                        dataKey="extrasSales"
                        type="monotone"
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        strokeWidth={2}
                        name="Extras sales"
                        unit={"$"}
                    />
                </AreaChart>
            </ResponsiveContainer>
            {/* <LineChart /> */}
        </StyledSalesChart>
    );
}

SalesChart.propTypes = {
    bookings: PropTypes.array.isRequired,
    numDays: PropTypes.number.isRequired,
};

export default SalesChart;
