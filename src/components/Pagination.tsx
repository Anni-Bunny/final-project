import {Icon} from "./Icon";
import {Radio} from "./Radio";

interface paginationProps {
    className?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    selectedOptionsPage?: number | string,
    pageCount: number
}

export function Pagination({className, onChange, selectedOptionsPage, pageCount}: paginationProps) {

    const maxPagesToShow = 6;
    let pages = []

    const currentPage = Number(selectedOptionsPage);

    // Case 1: When pageCount is less than or equal to maxPagesToShow
    if (pageCount <= maxPagesToShow) {
        for (let i = 1; i <= pageCount; i++) {
            pages.push(
                <Radio
                    key={i}
                    name="page"
                    value={i}
                    label={i}
                    checked={currentPage === i}
                    onChange={onChange}
                    classname="border-none peer-checked:bg-gray-100"
                />
            );
        }
    } else {
        // Case 2: Current page is near the beginning
        if (currentPage < 3) {
            for (let i = 1; i <= 3; i++) {
                pages.push(
                    <Radio
                        key={i}
                        name="page"
                        value={i}
                        label={i}
                        checked={currentPage === i}
                        onChange={onChange}
                        classname="border-none peer-checked:bg-gray-100"
                    />
                );
            }
            if (pageCount > 4) pages.push(<span key="dots1"> ... </span>);
            pages.push(
                <Radio
                    key={pageCount}
                    name="page"
                    value={pageCount}
                    label={pageCount}
                    checked={currentPage === pageCount}
                    onChange={onChange}
                    classname="border-none peer-checked:bg-gray-100"
                />
            );
        }
        // Case 3: Current page is near the end
        else if (currentPage >= pageCount - 2) {
            pages.push(
                <Radio
                    key={1}
                    name="page"
                    value={1}
                    label={1}
                    checked={currentPage === 1}
                    onChange={onChange}
                    classname="border-none peer-checked:bg-gray-100"
                />
            );
            if (pageCount > 4) pages.push(<span key="dots1"> ... </span>);
            for (let i = pageCount - 2; i <= pageCount; i++) {
                pages.push(
                    <Radio
                        key={i}
                        name="page"
                        value={i}
                        label={i}
                        checked={currentPage === i}
                        onChange={onChange}
                        classname="border-none peer-checked:bg-gray-100"
                    />
                );
            }
        }
        // Case 4: Current page is somewhere in the middle
        else {
            pages.push(
                <Radio
                    key={1}
                    name="page"
                    value={1}
                    label={1}
                    checked={currentPage === 1}
                    onChange={onChange}
                    classname="border-none peer-checked:bg-gray-100"
                />
            );
            pages.push(<span key="dots1"> ... </span>);
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pages.push(
                    <Radio
                        key={i}
                        name="page"
                        value={i}
                        label={i}
                        checked={currentPage === i}
                        onChange={onChange}
                        classname="border-none peer-checked:bg-gray-100"
                    />
                );
            }
            pages.push(<span key="dots2"> ... </span>);
            pages.push(
                <Radio
                    key={pageCount}
                    name="page"
                    value={pageCount}
                    label={pageCount}
                    checked={currentPage === pageCount}
                    onChange={onChange}
                    classname="border-none peer-checked:bg-gray-100"
                />
            );
        }
    }


    return (
        <div
            className={`flex py-1 px-2 gap-1 ${className} `}>

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