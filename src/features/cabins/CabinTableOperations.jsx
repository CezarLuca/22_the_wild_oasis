import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

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
        </TableOperations>
    );
}

export default CabinTableOperations;
