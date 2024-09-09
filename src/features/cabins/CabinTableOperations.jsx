import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField="discount"
                options={[
                    { value: "all", label: "All" },
                    { value: "no-discount", label: "No Discount" },
                    { value: "discounted", label: "Discounted" },
                ]}
            />
            <SortBy
                options={[
                    { value: "name-asc", label: "Sort by Name (ascending)" },
                    {
                        value: "name-desc",
                        label: "Sort by Name (descending)",
                    },
                    {
                        value: "regular_price-asc",
                        label: "Sort by Lowest Price",
                    },
                    {
                        value: "regular_price-desc",
                        label: "Sort by Highest Price",
                    },
                    {
                        value: "max_capacity-asc",
                        label: "Sort by Lowest Capacity",
                    },
                    {
                        value: "max_capacity-desc",
                        label: "Sort by Highest Capacity",
                    },
                    {
                        value: "discount-asc",
                        label: "Sort by Highest Discount",
                    },
                    {
                        value: "discount-desc",
                        label: "Sort by Lowest Discount",
                    },
                    { value: "rating", label: "Rating" },
                ]}
            />
        </TableOperations>
    );
}

export default CabinTableOperations;
