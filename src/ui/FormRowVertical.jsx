import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFormRowVertical = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem 0;
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function FormRowVertical({ label, children, error }) {
    return (
        <StyledFormRowVertical>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
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
