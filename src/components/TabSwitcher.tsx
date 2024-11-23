import React, {useState} from "react";
import {Container} from "./Container";
import {Button} from "./Button";
import {BtnType} from "./Button";
import {IconPosition} from "./Button";
import {TextPosition} from "./Button";

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
export type Tabs = { name: string; title: string, icon?: string, textPosition?: TextPosition }[];

interface TabSwitcherProps {
    tabs: Tabs;
    content: { name: string; component: React.ReactNode }[];
    containerClassName?: string;
    type?: type;
    contentClassName?: string;
    btnType?: BtnType;
    iconPosition?: IconPosition;
    btnDivClassName?:string
}

export function TabSwitcher({
                                tabs,
                                content,
                                containerClassName,
                                type = "vertical",
                                contentClassName,
                                btnType = "whiteLightRoundedBtn",
                                iconPosition,
                                btnDivClassName
                            }: TabSwitcherProps) {
    const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);

    function onChangeTab(event: React.MouseEvent<HTMLButtonElement>) {
        setCurrentTab(event.currentTarget.name);
    }

    let containerFlexDirection = types[type].containerFlexDirection + " " + containerClassName
    let btnFlexDirection = types[type].btnFlexDirection


    return (
        <section className="pb-44">
            <Container>
                <div className={`${containerFlexDirection} flex gap-12 w-full`}>
                    <div className={`flex gap-6 text-sm py-20 ${btnFlexDirection} ${btnDivClassName}`}>
                        {tabs.map((tab) => (
                            <Button
                                key={tab.name}
                                name={tab.name}
                                onClick={onChangeTab}
                                type={btnType}
                                title={tab.title}
                                className={currentTab === tab.name ? 'bg-gray-100' : 'bg-white'}
                                iconPosition={iconPosition}
                                icon={tab.icon}
                                textPosition={tab.textPosition}
                            />
                        ))}
                    </div>

                    <div className={`w-full ${contentClassName}`}>
                        {content.map((item, index) => (
                            <div key={index} className={currentTab === item.name ? '' : 'hidden'}>
                                {item.component}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
