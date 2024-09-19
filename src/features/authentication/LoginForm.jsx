import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { login } from "../../services/apiAuth";
import { HiEye } from "react-icons/hi";
import { HiEyeSlash } from "react-icons/hi2";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <Button
                type="button"
                id="show"
                size="small"
                label="Toggle"
                onClick={handleShowToggle}
            >
                {showPassword ? <HiEyeSlash /> : <HiEye />}
            </Button>
            <FormRowVertical>
                <Button size="large">Login</Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
