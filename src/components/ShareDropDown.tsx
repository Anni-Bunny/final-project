import {Dropdown} from "./DropDown";
import React from "react";
import {Button} from "./Button";
import {Icon} from "./Icon";

interface shareDropDownProps {
    productId: string | number
}

export function ShareDropDown({productId}: shareDropDownProps) {
        const handleCopyClick = () => {
        const link = `http://localhost:3000/products/${productId}`;

        navigator.clipboard.writeText(link)
    };

    return (
        <Dropdown icon={"share"}
                  child2={
                      <div className="flex flex-col w-[24rem] h-[18rem] px-10 py-8 gap-6">
                          <div className="flex flex-col gap-6">
                              <h5 className="text-[#0E1422] font-bold">Copy Link</h5>
                              <div className="flex gap-2">
                                  <span
                                      className="border border-[#E6E7E8] p-2.5 rounded-md">http://localhost:3000/products/{productId}</span>
                                  <Button onClick={handleCopyClick} icon="copy" type={"CleanBtn"}
                                          className="border border-[#E6E7E8] p-2.5 rounded-md"/>
                              </div>
                          </div>

                          <div className="flex flex-col gap-6">
                              <h5 className="text-[#0E1422] font-bold">Share</h5>
                              <div className="flex gap-6">
                                  <Icon name="facebook"/>
                                  <Icon name="twitter"/>
                                  <Icon name="pinterest"/>
                                  <Icon name="telegram"/>
                                  <Icon name="whatsapp"/>
                              </div>

                          </div>
                      </div>}
                  mainDivClassName={"flex justify-center max-w-16"}
                  child2ClassName="right-2"
        />
    );
}