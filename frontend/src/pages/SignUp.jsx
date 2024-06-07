import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Message } from "../components/Message";
import { SubHeading } from "../components/SubHeading";

export function SignUp() {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox label={"First Name"} placeholder = {"Enter your first name"} />
                    <InputBox label={"Last Name"} placeholder={"Enter your last name"}/>
                    <InputBox label={"Username"} placeholder={"xyz@mail.com"} />
                    <InputBox label={"Password"} placeholder={"Enter your password"} />
                    <Button label={"Sign up"} />
                    <Message label={"Already have an account ?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}