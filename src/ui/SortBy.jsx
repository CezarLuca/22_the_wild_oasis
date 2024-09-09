import PropTypes from "prop-types";
import Select from "./Select";

function SortBy({ options }) {
    return <Select options={options} type="white" />;
}

SortBy.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SortBy;
