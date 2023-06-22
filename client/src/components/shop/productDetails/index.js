import React, { Fragment, createContext, useEffect, useReducer, useState } from "react";
import Layout from "../layout";
import {
  productDetailsState,
  productDetailsReducer,
} from "./ProductDetailsContext";
import Details from "./Details";
import axios from "axios"

export const ProductDetailsContext = createContext();

const DetailsComponent = () => {
  const [recommnededProducts, setRecommendedProducts] = useState([]);

  console.log(recommnededProducts, 'recommendedProducts')

  useEffect(() => {
    (async () => {
      try {
        const apiURL = process.env.REACT_APP_API_URL;
        let res = await axios.get(`${apiURL}/api/product/all-product`);
        setRecommendedProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  return (
    <Fragment>
      <Details />
      <div>
        <h2>Recommended for You</h2>
        <div className="recommended-products">
          {recommnededProducts.map(product => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>

    </Fragment>
  );
};

const ProductDetails = (props) => {
  const [data, dispatch] = useReducer(
    productDetailsReducer,
    productDetailsState
  );
  return (
    <Fragment>
      <ProductDetailsContext.Provider value={{ data, dispatch }}>
        <Layout children={<DetailsComponent />} />
      </ProductDetailsContext.Provider>
    </Fragment>
  );
};

export default ProductDetails;
