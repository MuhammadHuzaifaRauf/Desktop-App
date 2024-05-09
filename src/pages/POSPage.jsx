import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

const products = [
  {
    id: 1,
    name: "Kashmir Oil",
    price: 480,
    image:
      "https://boulevardmart.com/cdn/shop/products/KashmirCanolaOilBottle3Ltr_1024x1024_crop_center.jpg?v=1674820477",
  },
  {
    id: 2,
    name: "National Tomato Ketchup",
    price: 200,
    image:
      "https://thehkb.com/cdn/shop/products/grocerapp-national-tomato-ketchup-5ec37362b0725_500x.jpg?v=1631191040",
  },
  {
    id: 3,
    name: "Lifebuoy Shampoo",
    price: 580,
    image:
      "https://highfy.pk/cdn/shop/files/Lifebuoysilkysoft370mlPowerImage.png?v=1708331402",
  },
  {
    id: 4,
    name: "Natioanl Mango Pickle",
    price: 350,
    image:
      "https://www.hkarimbuksh.com/cdn/shop/products/national-foods-limited-national-mixed-pickle-in-oil-750g-6954225762433_1800x.jpg?v=1629530519",
  },
  {
    id: 5,
    name: "Rose Petal Tissue",
    price: 180,
    image:
      "https://lahorebasket.com/cdn/shop/files/RosePetalLuxuryFacialTissues20_ExtraPulls_2.jpg?v=1700477857",
  },
  {
    id: 6,
    name: "Pamolive Soap 3 in 1",
    price: 320,
    image:
      "https://www.mycart.pk/media/catalog/product/cache/1/thumbnail/800x/17f82f742ffe127f42dca9de82fb58b1/8/8/8886950039138.jpg",
  },
  {
    id: 7,
    name: "Pond's FaceWash",
    price: 400,
    image:
      "https://shahalami.pk/cdn/shop/products/SHOPND0002_1000x.jpg?v=1614151297",
  },
  {
    id: 8,
    name: "Sugar-1kg",
    price: 150,
    image:
      "https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/1/1/1153151-1.jpg",
  },
  {
    id: 9,
    name: "Tapal Green Tea",
    price: 600,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX99kX0d4Wk8KXBSwym6S43-sVIIm0zdQEgDt40axp8A&s",
  },
  {
    id: 10,
    name: "Sprite 500ml",
    price: 1140,
    image:
      "https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/5/4/54491069_12s_h1l1jpg238jpg238.jpg",
  },
  {
    id: 10,
    name: "Nestle Yougurt",
    price: 140,
    image:
      "https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/1/0/1014836-1.jpg",
  },
  {
    id: 11,
    name: "Colgate Toothpaste",
    price: 140,
    image:
      "https://www.colgate.com/content/dam/cp-sites/oral-care/oral-care-center/en-my/product-detail-pages/toothpaste/colgate-mcp-fresh-cool-thumb.jpg",
  },
];

function POSPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOptions = {
    autoClose: 2000,
    pauseOnHover: true,
  };

  const addProductToCart = async (product) => {
    let findProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`, toastOptions);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions);
    }
  };

  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
    toast(`${product.name} removed from cart`, toastOptions);
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

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
