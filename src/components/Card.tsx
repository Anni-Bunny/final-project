import {Icon} from "./Icon";
interface CardProps {
    name: string,
    heading: string,
    paragraph: string
}

export function Card({name, heading, paragraph }:CardProps) {
    return (
        <div
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Icon name={`${name}`}/>
            <h5>{heading}</h5>
            <p>{paragraph}</p>
        </div>

    );
}

