import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const {
        id: cabinId,
        name,
        max_capacity: maxCapacity,
        regular_price: regularPrice,
        discount,
        image,
    } = cabin;

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

    return (
        <TableRow role="row">
            <Img src={image} alt={cabin.name} role="cell" />
            <Cabin role="cell">{name}</Cabin>
            <div role="cell">Fits up to {maxCapacity} guests</div>
            <Price role="cell">{formatCurrency(regularPrice)}</Price>
            <Discount role="cell">
                {discount ? `-${formatCurrency(discount)}` : ""}
            </Discount>
            <button
                onClick={() => mutate(cabinId)}
                disabled={isDeleting}
                role="cell"
            >
                Delete
            </button>
        </TableRow>
    );
}

CabinRow.propTypes = {
    cabin: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        name: PropTypes.string.isRequired,
        max_capacity: PropTypes.number.isRequired,
        regular_price: PropTypes.number.isRequired,
        discount: PropTypes.number,
        image: PropTypes.string,
    }).isRequired,
};

export default CabinRow;
