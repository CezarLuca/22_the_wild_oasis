import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("An error occurred while fetching cabins");
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    // console.log(newCabin, id);
    // const hasImagePath = newCabin.image.includes(supabaseUrl);
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/edit a new cabin
    let query = supabase.from("cabins");

    //A) Create a new cabin
    if (!id) {
        // const { data, error } = await supabase
        //     .from("cabins")
        query = query.insert([{ ...newCabin, image: imagePath }]);
    }

    //B) Edit an existing cabin
    else {
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("An error occurred while creating the cabin");
    }

    // 2. Upload the image
    // https://izpcculeirjezmpfwdrd.supabase.co/storage/v1/object/public/cabin-images/cabin-007.jpg

    if (hasImagePath) {
        return data;
    }

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the Cabin if the image upload fails

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log(storageError);
        throw new Error(
            "An error occurred while uploading the image, the cabin was not created."
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("An error occurred while deleting the cabin");
    }
}
