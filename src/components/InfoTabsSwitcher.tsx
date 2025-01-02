import {Tabs, TabSwitcher} from "./TabSwitcher";
import {ProductReviewList} from "./ProductReviewList";
import {product} from "../interfaces/product";
import {ProductDetails} from "./ProductDetails"

interface InfoTabsSwitcherProps{
    product: product;
}

export function InfoTabsSwitcher({product}:InfoTabsSwitcherProps) {

    const tabs: Tabs = [
        {name: 'details', title: 'Details', icon: 'more', textPosition: 'start'},
        {name: 'reviews', title: 'Reviews', icon: 'emptyStar', textPosition: 'start'}
    ];

    const content = [
        {
            name: 'details',
            component: <ProductDetails description={product.description}/>
        },
        {
            name: 'reviews',
            component: <ProductReviewList product={product}/>
        }

    ];

    const containerClassName: string = "items-start gap-[2rem]"
    const contentClassName:string = "max-w-[54rem]"

    return (
        <TabSwitcher
            tabs={tabs}
            content={content}
            containerClassName={containerClassName}
            type="horizontal"
            contentClassName={contentClassName}
            btnType="LightGrayBtn"
            iconPosition={"start"}
            btnDivClassName={"py-20"}
        />
    );
}
