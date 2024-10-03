export function Container({children, className = null}: any) {
    return (
        <div className={`container flex mx-auto items-center ${className}`}>
            {children}
        </div>
    );
}