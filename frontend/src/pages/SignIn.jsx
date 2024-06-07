import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { SubHeading } from "../components/SubHeading";

export function SignIn() {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to sign in"} />
                    <InputBox label={"Username"} placeholder={"Enter your username"} />
                    <InputBox label={"Password"} placeholder={"Enter your password"} />
                    <Button label={"Sign in"}/>
                    <Message label={"Don't have an account ?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}