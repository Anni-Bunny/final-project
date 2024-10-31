import {TabSwitcher} from "./TabSwitcher";

export function InfoTabsSwitcher() {

    const tabs = [
        {name: 'details', title: 'Details'},
        {name: 'reviews', title: 'Reviews'}
    ];

    const content = [
        {
            name: 'details',
            component:
                <div>
                    <h5 className="text-[1rem] font-semibold mb-6 text-[#0E1422]">Detail</h5>
                    <p className="text-sm text-[#5C5F6A] mb-14">Elevate your everyday style with our Men's Black
                        T-Shirts, the ultimate wardrobe essential for
                        modern men. Crafted with meticulous attention to detail and designed for comfort, these
                        versatile black tees are a must-have addition to your collection. <br/>
                        The classic black color never goes out of style. Whether you're dressing up for a special
                        occasion or keeping it casual, these black t-shirts are the perfect choice, effortlessly
                        complementing any outfit.
                    </p>
                    <div className="pl-5">
                        <ul className="list-disc text-sm text-[#5C5F6A]">
                            <li>Premium Quality</li>
                            <li>Versatile Wardrobe Staple</li>
                            <li>Available in Various Sizes</li>
                            <li>Tailored Fit</li>
                        </ul>
                    </div>
                </div>
        },
        {
            name: 'reviews',
            component: <div></div>
        }

    ];

    const containerClassName: string = "gap-[2rem]"
    const contentClassName:string = "max-w-[54rem]"

    return (
        <TabSwitcher
            tabs={tabs}
            content={content}
            containerClassName={containerClassName}
            type="horizontal"
            contentClassName={contentClassName}
            btnType="LightGrayBtn"
        />
    );
}
