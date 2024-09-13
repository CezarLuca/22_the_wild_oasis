import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const { booking, isLoading } = useBooking();
    const moveBack = useMoveBack();

    useEffect(
        () => setConfirmPaid(booking?.is_paid ?? false),
        [booking?.is_paid]
    );

    if (isLoading) {
        return <Spinner />;
    }

    // const booking = {};

    const {
        id: bookingId,
        guests,
        total_price: totalPrice,
        num_guests: numGuests,
        has_breakfast: hasBreakfast,
        num_nights: numNights,
    } = booking;

    function handleCheckin() {}

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox
                    value={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    id="confirm"
                    checked={confirmPaid}
                    disabled={confirmPaid}
                >
                    I confim that {guests.full_name} has paid the total amount.
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={!confirmPaid}>
                    Check in booking #{bookingId}
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
