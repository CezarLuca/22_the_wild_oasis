import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { register, formState, getValues, handleSubmit } = useForm();
    const { errors } = formState;
    const { signup, isLoading } = useSignup();
    // console.log(errors);

    function onSubmit({ fullName, email, password }) {
        signup({ fullName, email, password });
        console.log({ fullName, email, password });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" errors={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" errors={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                errors={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                errors={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            // value === formState.password ||
                            // value === getValues("password") ||
                            value === getValues().password ||
                            "The passwords do not match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button $variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
