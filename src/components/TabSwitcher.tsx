import React, {useState} from "react";
import {Container} from "./Container";
import {Button} from "./Button";

const types = {
    vertical: {
        containerFlexDirection: "flex-col",
        btnFlexDirection: "flex-row"
    },
    horizontal: {
        containerFlexDirection: "flex-row",
        btnFlexDirection: "flex-col"
    },
}
type type = keyof typeof types;

interface TabSwitcherProps {
    tabs: { name: string; title: string }[];
    content: { name: string; component: React.ReactNode}[] ;
    containerClassName?: string;
    type? : type;
}

export function TabSwitcher({tabs, content, containerClassName, type = "vertical"}: TabSwitcherProps) {
    const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);

    function onChangeTab(event: React.MouseEvent<HTMLButtonElement>) {
        setCurrentTab(event.currentTarget.name);
    }

    let containerFlexDirection = types[type].containerFlexDirection + " " + containerClassName
    let btnFlexDirection = types[type].btnFlexDirection


    return (
        <section className="mt-36 mb-44">
            <Container className={`flex gap-12 ${containerFlexDirection}`}>
                <div className={`flex items-center mx-auto gap-6 text-sm ${btnFlexDirection}`}>
                    {tabs.map((tab) => (
                        <Button
                            key={tab.name}
                            name={tab.name}
                            onClick={onChangeTab}
                            type="whiteLightRoundedBtn"
                            title={tab.title}
                        />
                    ))}
                </div>

                <div className='w-full'>
                    {content.map((item, index) => (
                        <div key={index} className={currentTab === item.name ? '' : 'hidden'}>
                            {item.component}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
