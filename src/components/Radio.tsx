const RarioTypes={
    color: {
        parentSpanClasses: "border-transparent p-1 rounded-full",
        childSpanClasses: "rounded-full"
    },
    text: {
        parentSpanClasses: "border-[#E6E7E8] rounded p-1",
        childSpanClasses: ""
    }
}

type RadioType = keyof typeof RarioTypes;

interface RadioProps {
    value?: string,
    name: string,
    type?: RadioType,
    label?: string,
    checked?: boolean,
    onChange?:  React.ChangeEventHandler<HTMLInputElement>;
}


export function Radio({value, name, type="text", label, checked = false, onChange}: RadioProps) {

    let parentSpanClasses = RarioTypes[type].parentSpanClasses
    let childSpanClasses = RarioTypes[type].childSpanClasses

    if (type === 'color') {
        childSpanClasses += ` bg-${value}-300 `
    }

    return (
        <label className="inline-block cursor-pointer">
            <input onChange={onChange} checked={checked} type="radio" name={name} value={value} className="hidden peer"/>
            <span
                className={`${parentSpanClasses} flex items-center justify-center min-w-8 h-8 border peer-checked:border-[#0E1422] transition-all duration-200`}>
                    <span
                        className={`${childSpanClasses} flex items-center justify-center w-full h-full`}>
                        {label}
                    </span>
            </span>
        </label>
    );
}