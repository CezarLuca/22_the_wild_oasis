import styled from "styled-components";
import PropTypes from "prop-types";
// import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import Input from "./Input";
// import Form from "./Form";
// import Button from "./Button";
// import FileInput from "./FileInput";
// import Textarea from "./Textarea";
// import { createCabin } from "../../services/apiCabins";

const StyledFormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function FormRow({ label, errors, children }) {
    return (
        <StyledFormRow>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}

            {/* <Input
                type="text"
                id="name"
                {...register("name", {
                    required: "This field is required",
                })}
            /> */}
            {children}
            {errors && <Error>{errors}</Error>}
        </StyledFormRow>
    );
}

FormRow.propTypes = {
    label: PropTypes.string.isRequired,
    errors: PropTypes.string,
    children: PropTypes.node,
};

export default FormRow;
