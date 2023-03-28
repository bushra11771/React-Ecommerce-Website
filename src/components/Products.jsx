import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [btnLabel, setBtnLabel] = useState("All");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      // <div style={{ height: "100vh" }}>
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    const btnArr = [
      { id: 1, label: "All", handleClick: () => setFilter(data) },
      {
        id: 2,
        label: "Men's Clothing",
        handleClick: () => filterProduct("men's clothing"),
      },
      {
        id: 3,
        label: "Women's Clothing",
        handleClick: () => filterProduct("women's clothing"),
      },
      {
        id: 4,
        label: "Jewelery",
        handleClick: () => filterProduct("jewelery"),
      },
      {
        id: 5,
        label: "Electronics",
        handleClick: () => filterProduct("electronics"),
      },
    ];
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          {btnArr.map((btn) => (
            <button
              key={btn.id}
              className={`btn btn-outline-dark me-2 ${
                btnLabel === btn.label ? "bg-dark text-white" : ""
              }`}
              onClick={() => {
                setBtnLabel(btn.label);
                btn.handleClick();
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        {filter.map((product) => {
          return (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 text-center p-4 key={product.id}">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height="250px"
                />
                <div className="card-body">
                  <h5 className="card-title mb-0">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted"></h6>
                  <p className="card-text lead fw-bold">${product.price}</p>
                  <NavLink
                    to={`/product/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="column-12">
            <h1 className="display-6 fw-bolder text-center">Latest Product</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
