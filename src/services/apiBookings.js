import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getBookings({ filter, sortBy, page }) {
    let query = supabase
        .from("bookings")
        .select(
            "id, created_at, starting_date, ending_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email_address)",
            { count: "exact" }
        );

    //FILTER
    // If we want to use multiple filters, we can add an array of objects and loop through them to add them to the query variable
    if (filter) {
        query = query[filter.method || "eq"](filter.field, filter.value);
    }

    //SORT
    if (sortBy) {
        query = query.order(sortBy.field, {
            ascending: sortBy.direction === "asc",
        });
    }

    //PAGINATION

    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
        // console.log(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    // console.log(data, count);

    return { data, count };
}

export async function getBooking(id) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, cabins(*), guests(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking not found");
    }

    return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// Supabase expects a date as ISO string, so we need to convert it
export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        .select("created_at, total_price, extras_price")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from("bookings")
        // .select('*')
        .select("*, guests(full_name)")
        .gte("starting_date", date)
        .lte("starting_date", getToday());

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
    // console.log(getToday());
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(full_name, nationality, country_flag)")
        .or(
            `and(status.eq.unconfirmed,starting_date.eq.${getToday()}),and(status.eq.checked-in,ending_date.eq.${getToday()})`
        )
        .order("created_at");

    // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
    // (stay.status === 'unconfirmed' && isToday(new Date(stay.starting_date))) ||
    // (stay.status === 'checked-in' && isToday(new Date(stay.ending_date)))

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }
    return data;
}

export async function updateBooking(id, obj) {
    const { data, error } = await supabase
        .from("bookings")
        .update(obj)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }
    return data;
}

export async function deleteBooking(id) {
    // REMEMBER RLS POLICIES
    const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    return data;
}
