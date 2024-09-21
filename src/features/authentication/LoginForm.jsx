import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
// import { login } from "../../services/apiAuth";
import { HiEye } from "react-icons/hi";
import { HiEyeSlash } from "react-icons/hi2";
import { useLogin } from "./useLogin";

function LoginForm() {
    // const [email, setEmail] = useState("cezar@mustermail.com");
    // const [password, setPassword] = useState("asdasdasd");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, isPending } = useLogin();
    // console.log("isPending:", isPending);

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        login({ email, password });
    }

    function handleShowToggle() {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                />
                <Button
                    type="button"
                    id="password-toggle"
                    size="small"
                    onClick={handleShowToggle}
                    disabled={isPending}
                >
                    {showPassword ? <HiEyeSlash /> : <HiEye />}
                </Button>
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" disabled={isPending}>
                    {!isPending ? "Login" : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
