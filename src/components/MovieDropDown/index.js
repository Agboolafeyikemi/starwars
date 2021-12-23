import React from "react";
import Loading from "../Loading";
import "./moviedropdown.css";

const MovieDropDown = ({ isLoading, data, onChange, value }) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="custom-select">
      <select onChange={onChange} value={value}>
        <option value="Select" disabled>
          Select a Movie ...
        </option>
        {data.map((movie) => (
          <option key={movie.release_date} value={movie.title}>
            {movie.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieDropDown;
