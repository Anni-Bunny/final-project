import {Icon} from "./Icon";
import {Card} from "./Card";


interface PromiseCardProps {
    icon: string,
    heading: string,
    paragraph: string
}

export function PromiseCard({icon, heading, paragraph }: PromiseCardProps) {
    return (
        <Card>
            <Icon name={`${icon}`}/>
            <h5 className="font-bold mt-3">{heading}</h5>
            <p className="text-[0.875rem]">{paragraph}</p>
        </Card>
    );
}

