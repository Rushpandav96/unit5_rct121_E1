import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";
import axios from "axios";

// const url = "http://localhost:8080/candidates";
const url = "https://json-server-mocker-masai.herokuapp.com/candidates";
const fetchCandidates = (page = 1, order = "ASC", limit = 5) => {
  return axios.get(url, {
    params: {
      _page: page,
      _limit: limit,
      _sort: "salary",
      _order: order,
    },
  });
};
export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    setLoading(true);
    const order = ascending ? "ASC" : "DESC";
    fetchCandidates(page, order)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setError(false);
        setData([...res.data]);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  }, [page, ascending]);
  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);
  const handleOrderChange = () => setAscending(!ascending);
  return (
    <div className="App">
      <div>
        <div id="loading-container">{loading ? "...Loading" : null} </div>
        <div> {error ? "Something went wrong!" : null}</div>
        <Button
          id="SORT_BUTTON"
          title={`Sort by ${!ascending ? "Ascending" : "Descending"} Salary`}
          onClick={handleOrderChange}
        />
        <Button
          title="PREV"
          id="PREV"
          disabled={page === 1}
          onClick={handlePrev}
        />
        <Button
          id="NEXT"
          title="NEXT"
          onClick={handleNext}
          disabled={data.length < limit}
        />
      </div>
      {data.map((item) => (
        <CandidateCard candidate={item} key={item.id} />
      ))}
    </div>
  );
}
