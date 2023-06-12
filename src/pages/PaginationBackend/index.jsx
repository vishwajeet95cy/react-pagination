import React, { useEffect, useState } from "react";
import "./index.css";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

const PaginationBackend = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(false);

  const fetchData = async () => {
    setFlag(false);
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setData(data.products);
      setTotal(data.total / 10);
      setFlag(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePagination = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= total && selectedPage !== page) {
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
              {data.map((item) => (
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
          {[...Array(total)].map((item, i) => (
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
            className={page == total ? "pagination_disabled" : ""}
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

export default PaginationBackend;
