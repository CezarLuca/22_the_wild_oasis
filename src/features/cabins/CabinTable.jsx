// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) {
        return <Spinner />;
    }

    // 1) FILTER

    const filterValue = searchParams.get("discount") || "all";
    // console.log(filterValue);
    let filteredCabins = cabins;
    if (filterValue === "all") {
        filteredCabins = cabins;
    } else if (filterValue === "discounted") {
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
    } else if (filterValue === "no-discount") {
        filteredCabins = cabins.filter((cabin) => !cabin.discount);
    }

    // 2) SORT
    const sortBy = searchParams.get("sortBy") || "starting_date-asc";
    const [field, direction] = sortBy.split("-");
    // console.log(field, direction);
    const sortedCabins = filteredCabins.sort((a, b) => {
        if (direction === "asc") {
            return a[field] - b[field];
        } else {
            return b[field] - a[field];
        }
    });
    // console.log(sortedCabins);

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    // data={cabins}
                    // data={filteredCabins}
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
