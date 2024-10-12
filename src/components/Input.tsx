interface InputProps {
    className?: string,
    label: string,
    inputType: string
}

export function Input({label, className, inputType}: InputProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            <h3 className="text-sm/6 font-medium text-black">{label}</h3>
            <input className="rounded-md bg-white border border-[#E6E7E8] py-2.5 px-[0.938rem] h-[2.813rem] w-80 text-black text-sm
            focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 required:"
                   type={inputType}/>
        </div>
    )
}
