interface IconProps {
    name: string;
    className?: string
}

export function Icon({ name, className }: IconProps) {
    return (
        <>
            <img className="size-5" src={`/icons/${name}.svg`} alt={`${name} icon`} />
        </>
    );
}
