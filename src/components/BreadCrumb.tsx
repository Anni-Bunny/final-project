import {Container} from "./Container";
import {Link} from "react-router-dom";
import {Icon} from "./Icon";
import React from 'react';

export interface BreadCrumbLink {
    name?: string,
    url?: string
}

interface BreadCrumbParams {
    links: BreadCrumbLink[],
    className?: string,
    containerClassName?: string,
    isInContainer?: boolean, // New prop to control whether it's in a container or just a div
}

export function BreadCrumb({links, className, containerClassName, isInContainer = true}: BreadCrumbParams) {
    // Conditional rendering based on isInContainer prop
    const Wrapper = isInContainer ? Container : 'div';

    return (
        <Wrapper className={isInContainer ? containerClassName : ''}>
            <nav className={`flex py-[1rem] w-full  ${className}`} aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">

                    {
                        links.map((link, index) => (
                            <React.Fragment key={index}>
                                {index !== 0 && <Icon name="chevronRight"/>}
                                <li className="inline-flex items-center">
                                    <Link to={link.url ?? "#"}
                                          className={`items-center text-sm font-medium hover:text-black ${index === links.length - 1 ? 'text-black' : 'text-gray-400'}`}>
                                        {link.name}
                                    </Link>
                                </li>
                            </React.Fragment>
                        ))
                    }

                </ol>
            </nav>
        </Wrapper>
    );
}
