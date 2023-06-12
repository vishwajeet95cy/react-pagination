import React from "react";
import "./index.css";

const ProductCard = ({ title, image, description }) => {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={image} alt={image} />
      </div>
      <div className="product-card-data">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
