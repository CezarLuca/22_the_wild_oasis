import Button from "../../ui/Button";
import PropTypes from "prop-types";

function CheckoutButton({ bookingId }) {
    return (
        <Button $variation="primary" size="small">
            Check out
        </Button>
    );
}

CheckoutButton.propTypes = {
    bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CheckoutButton;
