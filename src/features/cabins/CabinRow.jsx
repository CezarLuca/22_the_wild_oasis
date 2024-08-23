import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabins";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

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
    const [showForm, setShowForm] = useState(false);
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating, createCabin } = useCreateCabin();

    const {
        id: cabinId,
        name,
        max_capacity: maxCapacity,
        regular_price: regularPrice,
        discount,
        image,
        description,
    } = cabin;

    function hadleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            max_capacity: maxCapacity,
            regular_price: regularPrice,
            discount,
            image,
            description,
        });
    }

    return (
        <>
            <TableRow role="row">
                <Img src={image} alt={cabin.name} role="cell" />
                <Cabin role="cell">{name}</Cabin>
                <div role="cell">Fits up to {maxCapacity} guests</div>
                <Price role="cell">{formatCurrency(regularPrice)}</Price>
                {discount ? (
                    <Discount role="cell">{formatCurrency(discount)}</Discount>
                ) : (
                    <span role="cell">&mdash;</span>
                )}
                <div>
                    <button disabled={isCreating} onClick={hadleDuplicate}>
                        <HiSquare2Stack />
                    </button>
                    <button onClick={() => setShowForm((show) => !show)}>
                        <HiPencil />
                    </button>
                    <button
                        onClick={() => deleteCabin(cabinId)}
                        disabled={isDeleting}
                        role="cell"
                    >
                        <HiTrash />
                    </button>
                </div>
            </TableRow>
            {showForm && <CreateCabinForm cabinToEdit={cabin} />}
        </>
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
        description: PropTypes.string,
    }).isRequired,
};

export default CabinRow;
