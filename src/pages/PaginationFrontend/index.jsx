import React, { useEffect, useState } from "react";
import "./index.css";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

const PaginationFrontend = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=0");
    const data = await res.json();

    if (data && data.products) {
      setData(data.products);
      setFlag(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePagination = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= data.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <main>
      <h2>Products</h2>
      {flag ? (
        <>
          {data.length > 0 && (
            <section className="products-data">
              {data.slice(page * 10 - 10, page * 10).map((item) => (
                <ProductCard
                  key={item.id}
                  title={item.title}
                  image={item.thumbnail}
                  description={item.description}
                />
              ))}
            </section>
          )}
        </>
      ) : (
        <Loader />
      )}
      {data.length > 0 && (
        <section className="product-pagination">
          <span
            className={page > 1 ? "" : "pagination_disabled"}
            onClick={() => {
              handlePagination(page - 1);
            }}
          >
            &lt;
          </span>
          {[...Array(data.length / 10)].map((item, i) => (
            <span
              key={i}
              className={page === i + 1 ? "pagination_selected" : ""}
              onClick={() => {
                handlePagination(i + 1);
              }}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={page == data.length / 10 ? "pagination_disabled" : ""}
            onClick={() => {
              handlePagination(page + 1);
            }}
          >
            &gt;
          </span>
        </section>
      )}
    </main>
  );
};

export default PaginationFrontend;
