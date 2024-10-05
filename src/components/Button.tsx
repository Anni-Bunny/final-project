export function Button({children}: any) {
    return <button
        className="overflow-hidden group/button relative rounded bg-black border p-2 transition duration-200 flex">
        <span className="invert">{children}</span>
        <div
            className="group-hover/button:top-[-100%] left-0 absolute bg-white w-full h-full top-full transition-all duration-600">
        </div>
    </button>;
}