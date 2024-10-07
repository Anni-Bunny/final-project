export function Card({children, className}: any) {
    return (
        <div
            className={`max-w-sm bg-white flex flex-col gap-3 ${className}`}>
            {children}
        </div>
    );
}