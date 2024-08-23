import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createEditCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditingSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditingSession ? editValues : {},
    });
    const { errors } = formState;
    // console.log(errors);
    const queryClient = useQueryClient();
    const { isCreating, createCabin } = useCreateCabin();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => {
            return createEditCabin(newCabinData, id);
        },
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (error) => {
            toast.error(
                `An error occurred while editing the cabin: ${error.message}`
            );
            console.error(error);
        },
    });

    const isWorking = isCreating || isEditing;

    function onSubmit(data) {
        // console.log(data);
        const image =
            typeof data.image === "string" ? data.image : data.image[0];
        if (isEditingSession) {
            editCabin({ newCabinData: { ...data, image }, id: editId });
        } else {
            createCabin({ ...data, image: data.image[0] });
        }
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" errors={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="maxCapacity" errors={errors?.max_capacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("max_capacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity must be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="regularPrice"
                errors={errors?.regular_price?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regular_price", {
                        required: "This field is required",
                        min: {
                            value: 0,
                            message: "Price must be at least 0",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="discount" errors={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) => {
                            const valueAsNumber = Number(value);
                            const regularPrice = Number(
                                getValues().regular_price
                            );
                            return (
                                valueAsNumber <= regularPrice ||
                                `Discount must be smaller than regular price: ${regularPrice}`
                            );
                        },
                    })}
                />
            </FormRow>

            <FormRow label="description" errors={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="image" errors={errors?.image?.message}>
                <FileInput
                    // type="file"
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    {...register("image", {
                        required: isEditingSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button $variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditingSession ? "Edit cabin" : "Add new cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

CreateCabinForm.propTypes = {
    cabinToEdit: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        max_capacity: PropTypes.number,
        regular_price: PropTypes.number,
        discount: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
    }),
};

export default CreateCabinForm;
