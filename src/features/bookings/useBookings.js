import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };
    // If in the future we want to add more filters we can add an array of objects(filters) and loop through them to add them to the query

    // SORT

    // SortBy validation to prevent invalid sortBy values from creating app breaking loop
    // Define a list of valid sorting options
    const validSortOptions = [
        "starting_date-desc",
        "starting_date-asc",
        "total_price-desc",
        "total_price-asc",
    ];

    // Get the current sortBy value from searchParams
    let sortByValidator = searchParams.get("sortBy");

    // Check if the sortBy value is valid
    if (!validSortOptions.includes(sortByValidator)) {
        // If invalid, set it to a default valid option
        sortByValidator = "starting_date-desc";
        searchParams.set("sortBy", sortByValidator);
        // setSearchParams(searchParams); // Update the URL with the valid sortBy value
    }

    // Use the validated sortBy value in your application

    // const sortByRaw = searchParams.get("sortBy") || "starting_date-desc";
    const sortByRaw = sortByValidator;
    // console.log(searchParams.get("sortBy"));
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };

    // PAGINATION

    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    //QUERY
    const {
        isLoading,
        // data: { data: bookings, count },
        data,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // Desctructuring the data object to get the bookings and count and setting them to default values in case the data object is undefined
    const bookings = data?.data || [];
    const count = data?.count || 0;
    // console.log(data, bookings, count);

    // PREFETCHING
    const pageCount = Math.ceil(count / 10);
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    }

    return { isLoading, error, bookings, count };
}
