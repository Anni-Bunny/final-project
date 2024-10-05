import {Icon} from "./Icon";
interface ButtonProps{
    name: string,
    className?:string,
    title: string
}

export function Button({name, className, title}: ButtonProps) {
    return <button
        className={`overflow-hidden group/button relative rounded bg-black border py-3 px-6 transition duration-200 flex h-[2.75rem] items-center ${className}`}>
        <span className="invert flex items-center">{title}</span>
        <div
            className="group-hover/button:top-[-100%] left-0 absolute bg-white w-full h-full top-full transition-all duration-600">
        </div>
        <Icon name={`${name}`}/>
    </button>;
}