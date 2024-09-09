import PropTypes from "prop-types";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";

    function hangleChange(e) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }
    return (
        <Select
            options={options}
            type="white"
            onChange={hangleChange}
            value={sortBy}
        />
    );
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
