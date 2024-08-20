import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("An error occurred while fetching cabins");
    }
    return data;
}

export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create a new cabin
    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }]);
    if (error) {
        console.error(error);
        throw new Error("An error occurred while creating the cabin");
    }

    // 2. Upload the image
    // https://izpcculeirjezmpfwdrd.supabase.co/storage/v1/object/public/cabin-images/cabin-007.jpg

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("An error occurred while deleting the cabin");
    }
}
