import {Icon} from "./Icon";
interface CardProps {
    name: string,
    heading: string,
    paragraph: string
}

export function Card({name, heading, paragraph }:CardProps) {
    return (
        <div
            className="max-w-sm p-6 bg-white flex flex-col gap-3">
            <Icon name={`${name}`}/>
            <h5 className="font-bold mt-3">{heading}</h5>
            <p className="text-[0.875rem]">{paragraph}</p>
        </div>

    );
}

