import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                avatar: "",
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        throw new Error(error.message);
    }
    // console.log(data);
    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session) {
        return null;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1. Update passowrd OR fullName
    let updateData;
    if (password) {
        updateData = { password };
    } else if (fullName) {
        updateData = { data: { full_name: fullName } };
    }

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) {
        throw new Error(error.message);
    }
    if (!avatar) {
        return data;
    }

    // 2. Update avatar image
    const fileName = `avatar-${data.user.id}-${Math.floor(
        Math.random() * 1000000
    )}`;

    const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (updateError) {
        throw new Error(uploadError.message);
    }

    // 3. Update avater in the user
    const { data: updatedUser, error: updateError } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        });

    if (updateError) {
        throw new Error(updateError.message);
    }

    return updatedUser;
}
