import styled from "styled-components";
import PropTypes from "prop-types";
import { Children } from "react";

const StyledFormRowVertical = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem 0;
    position: relative;

    ${(props) =>
        props.label === "Password" &&
        `
        button {
            position: absolute;
            right: 1rem;
            top: 65%;
            transform: translateY(-50%);
        }
    `}
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function FormRowVertical({ label, children, error }) {
    // Ensure children is an array
    const childrenArray = Children.toArray(children);
    const firstChildId = childrenArray[0]?.props?.id;

    return (
        <StyledFormRowVertical label={label}>
            {/* {label && <Label htmlFor={children.props.id}>{label}</Label>} */}
            {label && <Label htmlFor={firstChildId}>{label}</Label>}
            {childrenArray}
            {error && <Error>{error}</Error>}
        </StyledFormRowVertical>
    );
}

FormRowVertical.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
};

export default FormRowVertical;
