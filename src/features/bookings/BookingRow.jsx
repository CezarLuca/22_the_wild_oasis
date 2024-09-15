import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from "prop-types";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiEye, HiUserMinus, HiUserPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        created_at,
        starting_date: startDate,
        ending_date: endDate,
        num_nights: numNights,
        num_guests: numGuests,
        total_price: totalPrice,
        status,
        guests: { full_name: guestName, email_address: email },
        cabins,
    },
}) {
    const navigate = useNavigate();
    const { checkout, isCheckingOut } = useCheckout();
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    const cabinName = cabins?.name || "Unknown Cabin";

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
                    {isNaN(startDateObj)
                        ? "Invalid date"
                        : format(startDateObj, "MMM dd yyyy")}{" "}
                    &mdash;{" "}
                    {isNaN(endDateObj)
                        ? "Invalid date"
                        : format(endDateObj, "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                        >
                            See details
                        </Menus.Button>
                        {status === "unconfirmed" && (
                            <Menus.Button
                                icon={<HiUserPlus />}
                                onClick={() =>
                                    navigate(`/checkin/${bookingId}`)
                                }
                            >
                                Check in
                            </Menus.Button>
                        )}
                        {status === "checked-in" && (
                            <Menus.Button
                                icon={<HiUserMinus />}
                                onClick={() => checkout(bookingId)}
                                disabled={isCheckingOut}
                            >
                                Check out
                            </Menus.Button>
                        )}
                        <Modal.Open opens="delete"></Modal.Open>
                    </Menus.List>
                </Menus.Menu>
            </Modal>
        </Table.Row>
    );
}

BookingRow.propTypes = {
    booking: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        created_at: PropTypes.string.isRequired,
        starting_date: PropTypes.string.isRequired,
        ending_date: PropTypes.string.isRequired,
        num_nights: PropTypes.number.isRequired,
        num_guests: PropTypes.number.isRequired,
        total_price: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        guests: PropTypes.shape({
            full_name: PropTypes.string.isRequired,
            email_address: PropTypes.string.isRequired,
        }).isRequired,
        cabins: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};

export default BookingRow;
