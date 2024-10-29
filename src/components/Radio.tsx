const RarioTypes={
    color: {
        parentSpanClasses: "border-transparent p-1 rounded-full",
        childSpanClasses: "bg-blue-500 rounded-full"
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
    label?: string
}


export function Radio({value, name, type="text", label}: RadioProps) {

    let parentSpanClasses = RarioTypes[type].parentSpanClasses
    let childSpanClasses = RarioTypes[type].childSpanClasses

    return (
        <label className="inline-block cursor-pointer">
            <input type="radio" name={name} value={value} className="hidden peer"/>
            <span
                className={`${parentSpanClasses} flex items-center justify-center w-8 h-8 border peer-checked:border-[#0E1422] transition-all duration-200`}>
                    <span
                        className={`${childSpanClasses} flex items-center justify-center w-full h-full`}>
                        {label}
                    </span>
            </span>
        </label>
    );
}