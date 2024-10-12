interface IconProps {
    name: string;
    className?: string
}

export function Icon({ name, className }: IconProps) {
    return (
        <>
            <img className={`size-[1.5rem] ${className}`} src={`/icons/${name}.svg`} alt={`${name} icon`} />
        </>
    );
}
