export function Container({children, className = null}: any) {
    return (
        <div className={`container w-3/4 flex mx-auto items-center ${className}`}>
            {children}
        </div>
    );
}