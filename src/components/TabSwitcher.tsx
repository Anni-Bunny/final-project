import React, {useState} from "react";
import {Container} from "./Container";
import {Button} from "./Button";

interface TabSwitcherProps {
    tabs: { name: string; title: string }[];
    content: { name: string; component: React.ReactNode}[] ;
}

export function TabSwitcher({tabs, content}: TabSwitcherProps) {
    const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);

    function onChangeTab(event: React.MouseEvent<HTMLButtonElement>) {
        setCurrentTab(event.currentTarget.name);
    }

    return (
        <section className="mt-36 mb-44">
            <Container className="flex flex-col gap-12">
                <div className="flex items-center mx-auto gap-6 text-sm">
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
