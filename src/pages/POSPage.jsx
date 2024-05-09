import React from "react";
import MainLayout from "../layout/MainLayout";
import { ComponentToPrint } from "../components/ComponentToPrint";

import usePOS from "../hooks/usePOS";

function POSPage() {
  const {
    addProductToCart,
    totalAmount,
    isLoading,
    handlePrint,
    removeProduct,
    cart,
    componentRef,
  } = usePOS();

  return (
    <MainLayout>
      <div className="row">
        <div className="col-lg-8">
          {isLoading ? (
            "Loading"
          ) : (
            <div className="row">
              {products.map((product, key) => (
                <div key={key} className="col-lg-4 mb-4">
                  <div
                    className="pos-item px-3 text-center"
                    onClick={() => addProductToCart(product)}
                  >
                    <h5 className="color-primary">{product.name}</h5>
                    <img
                      src={product.image}
                      className="img-fluid rounded"
                      alt={product.name}
                    />
                    <h6>{product.price}rs</h6>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div style={{ display: "none" }}>
            <ComponentToPrint
              cart={cart}
              totalAmount={totalAmount}
              ref={componentRef}
            />
          </div>
          <div className="table-responsive bg-dark">
            <table className="table table-responsive table-dark table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {cart
                  ? cart.map((cartProduct, key) => (
                      <tr key={key}>
                        <td>{cartProduct.id}</td>
                        <td>{cartProduct.name}</td>
                        <td>{cartProduct.price}</td>
                        <td>{cartProduct.quantity}</td>
                        <td>{cartProduct.totalAmount}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeProduct(cartProduct)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  : "No Item in Cart"}
              </tbody>
            </table>
            <h2 className="px-2 text-white">Total Amount: {totalAmount}</h2>
          </div>

          <div className="mt-3">
            {totalAmount !== 0 ? (
              <div>
                <button className="btn btn-primary" onClick={handlePrint}>
                  Pay Now
                </button>
              </div>
            ) : (
              "Please add a product to the cart"
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
