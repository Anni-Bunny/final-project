export function Card({children}: any) {
    return (
        <div
            className="max-w-sm p-6 bg-white flex flex-col gap-3">
            {children}
        </div>
    );
}