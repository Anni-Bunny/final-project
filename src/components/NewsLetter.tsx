import {Container} from "./Container";
import {Input} from "./Input";
import {Button} from "./Button";

export function NewsLetter() {
    return (
        <div className="flex h-[12.5rem] bg-[#F6F6F6] w-full">
            <Container className="justify-between">
                <div className="flex flex-col gap-6">
                    <h3 className="text-2xl font-bold">Join Our Newsletter</h3>
                    <p className="text-sm">We love to surprise our subscribers with occasional gifts.</p>
                </div>
                <div className="flex gap-4">
                    <Input inputClassName="bg-[#F6F6F6]" inputType={"email"} placeholder={"Your email address"}/>
                    <Button title={"Subscribe"}/>
                </div>
            </Container>
        </div>
    );
}