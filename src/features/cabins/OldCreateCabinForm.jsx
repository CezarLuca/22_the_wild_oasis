// import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

// const StyledFormRow = styled.div`
//     display: grid;
//     align-items: center;
//     grid-template-columns: 24rem 1fr 1.2fr;
//     gap: 2.4rem;

//     padding: 1.2rem 0;

//     &:first-child {
//         padding-top: 0;
//     }

//     &:last-child {
//         padding-bottom: 0;
//     }

//     &:not(:last-child) {
//         border-bottom: 1px solid var(--color-grey-100);
//     }

//     &:has(button) {
//         display: flex;
//         justify-content: flex-end;
//         gap: 1.2rem;
//     }
// `;

// const Label = styled.label`
//     font-weight: 500;
// `;

// const Error = styled.span`
//     font-size: 1.4rem;
//     color: var(--color-red-700);
// `;

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;
    // console.log(errors);
    const queryClient = useQueryClient();
    const { mutate, isCreating } = useMutation({
        mutationFn: (newCabin) => {
            return createCabin(newCabin);
        },
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (error) => {
            toast.error(
                `An error occurred while creating the cabin: ${error.message}`
            );
            console.error(error);
        },
    });

    function onSubmit(data) {
        // console.log(data);
        mutate(data);
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            {/* <StyledFormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
                {errors?.name?.message && <Error>{errors.name.message}</Error>}
            </StyledFormRow> */}

            <FormRow label="Cabin name" errors={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            {/* <StyledFormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register("max_capacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity must be at least 1",
                        },
                    })}
                />
            </StyledFormRow> */}

            <FormRow label="maxCapacity" errors={errors?.max_capacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    {...register("max_capacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity must be at least 1",
                        },
                    })}
                />
            </FormRow>

            {/* <StyledFormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input
                    type="number"
                    id="regularPrice"
                    {...register("regular_price", {
                        required: "This field is required",
                        min: {
                            value: 0,
                            message: "Price must be at least 0",
                        },
                    })}
                />
            </StyledFormRow> */}

            <FormRow
                label="regularPrice"
                errors={errors?.regular_price?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isCreating}
                    {...register("regular_price", {
                        required: "This field is required",
                        min: {
                            value: 0,
                            message: "Price must be at least 0",
                        },
                    })}
                />
            </FormRow>

            {/* <StyledFormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) => {
                            return (
                                value <= getValues().regular_price ||
                                "Discount must be smaller than regular price"
                            );
                        },
                    })}
                />
            </StyledFormRow> */}

            <FormRow label="discount" errors={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isCreating}
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) => {
                            return (
                                value <= getValues().regular_price ||
                                "Discount must be smaller than regular price"
                            );
                        },
                    })}
                />
            </FormRow>

            {/* <StyledFormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </StyledFormRow> */}

            <FormRow label="description" errors={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    disabled={isCreating}
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            {/* <StyledFormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput id="image" accept="image/*" />
            </StyledFormRow> */}

            <FormRow label="image" errors={errors?.image?.message}>
                <FileInput id="image" accept="image/*" disabled={isCreating} />
            </FormRow>

            {/* <StyledFormRow>
                -- type is an HTML attribute! --
                <Button $variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </StyledFormRow> */}

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button $variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
