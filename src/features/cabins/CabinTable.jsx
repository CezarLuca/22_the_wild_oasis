// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) {
        return <Spinner />;
    }
    if (!cabins.length) {
        return <Empty resourceName="cabins" />;
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
    const sortedCabins = filteredCabins.sort((a, b) => {
        if (direction === "asc") {
            if (typeof a[field] === "number" && typeof b[field] === "number") {
                return a[field] - b[field];
            } else {
                return a[field]?.localeCompare(b[field]);
            }
        } else {
            if (typeof a[field] === "number" && typeof b[field] === "number") {
                return b[field] - a[field];
            } else {
                return b[field]?.localeCompare(a[field]);
            }
        }
    });

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
