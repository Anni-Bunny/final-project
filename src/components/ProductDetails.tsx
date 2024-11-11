interface ProductDetailsProps {
    description: string
}

export function ProductDetails({description}: ProductDetailsProps) {
    return (
        <>
            <h5 className="text-[1rem] font-semibold mb-6 text-[#0E1422]">Detail</h5>
            <p className="text-sm text-[#5C5F6A] mb-14">
                {description}
            </p>
        </>
    );
}