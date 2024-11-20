import {Dropdown} from "./DropDown";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {CartItem} from "./CartItem";

export function CartDropDown() {
    const cart = useSelector((state: RootState) => state.cart)
    let totalQuantity = 0;

    cart.products.forEach((product) => {
        totalQuantity += product.quantity;
    });


    return (
        <Dropdown icon={"cart"}
                  child1={totalQuantity}
                  child1ClassName="top-0 right-0 bg-red-100 w-5 h-5 rounded-full flex items-center justify-center "
                  child2={
                      <>
                          {
                              cart.products.map((product) =>
                              <CartItem product={product}/>
                              )
                          }
                      </>
                  }
                  child2ClassName="max-w-96 w-full"
        />
    );
}