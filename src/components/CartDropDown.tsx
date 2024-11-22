import {Dropdown} from "./DropDown";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {CartItem} from "./CartItem";
import {Button} from "./Button";
import React from "react";
import {Link} from "react-router-dom";

export function CartDropDown() {
    const cart = useSelector((state: RootState) => state.cart)
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.products.forEach((product) => {
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
    });

    const isCartEmpty = cart.products.length === 0;

    return (
        <Dropdown icon={"cart"}
                  child1={totalQuantity}
                  child1ClassName="top-0 right-0 bg-red-100 w-5 h-5 rounded-full flex items-center justify-center "
                  child2={
                      <div className="flex flex-col w-[26rem] ">
                          <div className="flex flex-col gap-8 p-4 max-h-[29rem] overflow-y-auto">
                              {
                                  Array.isArray(cart.products) && cart.products.length > 0 ? (
                                      cart.products.map((product) => (
                                          <CartItem key={product.productId} product={product}/>
                                      ))
                                  ) : (
                                      <h3 className="flex items-center justify-center pt-10 font-bold text-xl mb-6">Cart is
                                          empty</h3>
                                  )
                              }
                          </div>

                          {!isCartEmpty && (
                              <div className="px-4 flex flex-col gap-4 py-8">
                                  <div className="flex justify-between px-3">
                                      <span>Total</span>
                                      <span>{totalPrice > 0 ? `$${totalPrice}.00` : `$${totalPrice}`}</span>
                                  </div>

                                  <Link to={"/shoppingCart"}><Button title={"View Cart"} className="w-full"/></Link>

                                  <Link to={"#"} className="flex justify-center"><span
                                      className="border-b">Checkout</span></Link>
                              </div>
                          )}

                      </div>
                  }
                  mainDivClassName={"flex justify-center max-w-16"}
        />
    );
}