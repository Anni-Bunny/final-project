
import {Dropdown} from "./DropDown";
import React from "react";

export function ShareDropDown() {

    return (
        <Dropdown icon={"share"}
                  child2={
                      <div className="py-2 text-sm w-44 ">
                        <h5>Copy Link</h5>
                      </div>
                  }
                  mainDivClassName={"flex justify-center max-w-16"}
        />
    );
}