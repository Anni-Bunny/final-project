import {Icon} from "./Icon";
import {Radio} from "./Radio";

interface paginationProps {
    className?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    selectedOptionsPage?: number | string,
    pageCount: number
}

export function Pagination({className, onChange, selectedOptionsPage, pageCount}: paginationProps) {

    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(<Radio key={i} name="page" value={i} label={i} checked={selectedOptionsPage == i} onChange={onChange}
                          classname="border-none peer-checked:bg-gray-100"/>)
    }

    return (
        <div
            className={`flex items-center justify-center border border-[#E9E9EB] max-w-48 w-full py-1 px-2 gap-1 ${className} `}>

            <Radio name={"page"}
                   onChange={onChange}
                   checked={selectedOptionsPage === "chevronLeft"}
                   value={Math.max(Number(selectedOptionsPage) - 1, 1)}
                   type={"text"}
                   label={<Icon name="chevronLeft"/>}
                   classname="border-none peer-checked:bg-gray-100"
            />

            {
                pages.map(page => page)
            }

            <Radio name={"page"}
                   onChange={onChange}
                   checked={selectedOptionsPage === "chevronRight"}
                   value={Math.min(Number(selectedOptionsPage) + 1, pageCount)}
                   type={"text"}
                   label={<Icon name="chevronRight"/>}
                   classname="border-none peer-checked:bg-gray-100"
            />

        </div>
    )
}