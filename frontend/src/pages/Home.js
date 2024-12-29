import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Home.css";
import Footer from './../components/Footer.js';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";


import home from "./../assets/home-logo.jpg";
import sofa from "./../assets/sofaCum.jpg";
import tableLamp from "./../assets/tableLamp.jpg";
import container from "./../assets/container.jpg";
import mattress from "./../assets/mattress.jpg";
import rack from "./../assets/rack.jpg";
import carpet from "./../assets/carpet.jpg";
import ballLight from "./../assets/ballLight.jpg";
import container1 from "./../assets/container1.jpg";

const Home = () => {
  const staticCategories = [
    { name: "Furniture", image: home },
    { name: "Lighting", image: tableLamp },
    { name: "Kitchen", image: container },
    { name: "Home-Decor", image: carpet },
  ];

  const staticProducts = [
    {
      image: home,
      name: "Coffee Table",
      category: "Furniture",
      description:
        "TAXOZY Square Coffee Table Set of 2 Modern Minimalist Style Furniture for Living Room Engineered Wood Coffee Table",
      price: 2265.0,
    },
    {
      image: sofa,
      name: "Sofa Cum Bed",
      category: "Furniture",
      description:
        "Solis Primus-comfort for all 4X6 size for 2 Person- Moshi Fabric Washable Cover 2 Seater Double Foam Fold Out Sofa Cum Bed",
      price: 5699,
    },
    {
      image: tableLamp,
      name: "Table Lamp",
      category: "Lighting",
      description:
        "HSH FASHION Touch Dimmable Table Light / Rose diamond table lamp Table Lamp (Multicolor) Night Lamp",
      price: 355.0,
    },
    {
      image: container,
      name: "Container",
      category: "Kitchen",
      description: "PANELS Glass Grocery Container 1100 ml",
      price: 348,
    },
    {
      image: mattress,
      name: "Form Mattress",
      category: "Bedding",
      description: "Wakefit EcoLatex Classic 8 inch Single Latex Foam Mattress",
      price: 7439,
    },
    {
      image: rack,
      name: "Rack",
      category: "Kitchen",
      description:
        "PEXMON Utensil Kitchen Rack Steel Stainless Steel Multipurpose Kitchen Corner Shelf Rack Stand",
      price: 198,
    },
    {
      image: carpet,
      name: "Polypropylene Carpet",
      category: "Home-Decor",
      description: "COMFY HOME Green Polypropylene Carpet",
      price: 210,
    },
    {
      image: ballLight,
      name: "Crystal Ball Night Light",
      category: "Lighting",
      description:
        "VN Fashion 3D Space Galaxy Planet Crystal Ball Night Light Ball with Wooden Base(1 piece) Night Lamp",
      price: 242,
    },
    {
      image: container1,
      name: "Container",
      category: "Kitchen",
      description: "Prayati Plastic Fridge Container - 1500 ml",
      price: 239,
    },
  ];

  const [categories, setCategories] = useState(staticCategories);
  const [products, setProducts] = useState(staticProducts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(staticProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    cvv: "",
  });
  const handleBuyNowClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const [cart, setCart] = useState([]);

  const handleAddToCartS = (product, index) => {
    setCart((prevCart) => [...prevCart, { ...product, index: index + 1 }]);
  };
  const getTotalPayable = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    setCardDetails({ name: "", number: "", cvv: "" });
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePayment = () => {
    if (!cardDetails.name || !cardDetails.number || !cardDetails.cvv) {
      alert("Please fill all card details!");
      return;
    }

    alert('Payment Successful for ${selectedProduct?.name}');
    handleDialogClose();
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    const filtered = staticProducts.filter(
      (product) => product.category === categoryName
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    Axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleBuyNow = async (product) => {
    const orderData = {
      amount: product.price * 100,
      currency: "INR",
      receipt:' order_rcptid_${product.name}',
    };

    try {
      const response = await Axios.post("/api/create-order", orderData);


      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", 
        amount: response.data.amount,
        currency: response.data.currency,
        name: "EliteMart",
        description: product.name,
        order_id: response.data.id,
        handler: async (paymentResponse) => {

          const verifyResponse = await Axios.post("/api/verify-payment", {
            paymentResponse,
          });

          if (verifyResponse.data.success) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Your Customer Name",
          email: "customer@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const handleAddToCart = (productName) => {
    alert('Added ${productName} to your cart!');
  };

  return (
    <div className="home">
      <section className="home-categories">
        <div className="categories-list">
          {staticCategories.map((category, index) => (
            <div
              key={index}
              className={`category-item ${
                selectedCategory === category.name ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-products">
        <div className="products-list">
          {filteredProducts.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
              <div className="product-actions">
                <button onClick={() => handleBuyNowClick(product)}>
                  Buy Now
                </button>
                <button onClick={() => handleAddToCartS(product, index)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {cart.length > 0 && (
        <section className="home-products" style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Cart</h2>
        <div
          className="cart-container"
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <table
            className="cart-table"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '20px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderWidth: '3px',
                    border: '1px solid black',
                    fontSize: '18px',
                  }}
                >
                  #Product Id
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderWidth: '3px',
                    border: '1px solid black',
                    fontSize: '18px',
                  }}
                >
                  Product Name
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderWidth: '3px',
                    border: '1px solid black',
                    fontSize: '18px',
                  }}
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '12px', textAlign: 'left', border: '3px solid black', fontSize: '16px' }}>
                    {item.index}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'left', border: '3px solid black', fontSize: '16px' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'left', border: '3px solid black', fontSize: '16px' }}>
                    ₹{item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="total"
            style={{
              textAlign: 'right',
              fontSize: '20px',
              fontWeight: 'bold',
              marginTop: '20px',
              paddingRight: '20px',
            }}
          >
            <h3>Total Payable Amount: ₹{getTotalPayable()}</h3>
          </div>
        </div>
      </section>     
      )}

         <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Complete Your Payment</DialogTitle>
        <DialogContent>
          <p>Product: {selectedProduct?.name}</p>
          <p>Price: ₹{selectedProduct?.price}</p>
          <TextField
            label="Card Holder Name"
            name="name"
            value={cardDetails.name}
            onChange={handleCardDetailsChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Card Number"
            name="number"
            value={cardDetails.number}
            onChange={handleCardDetailsChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="CVV"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleCardDetailsChange}
            type="password"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handlePayment} variant="contained" color="primary">
            Pay ₹{selectedProduct?.price}
          </Button>
        </DialogActions>
      </Dialog>
      <Footer/>
    </div>
 
  );
};

export default Home;