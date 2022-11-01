import React, { memo } from "react";
import Loading from "../Loading";
import "./moviedropdown.css";

interface Movie {
  release_date: React.Key;
  title: string;
}
const MovieDropDown = ({
  isLoading,
  data,
  onChange,
  value,
}: {
  isLoading: Boolean;
  data: Movie[];
  onChange: (e: { target: { value: any } }) => void;
  value: string[];
}) => {
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="custom-select">
      <select onChange={onChange} value={value} aria-label="select">
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

export default memo(MovieDropDown);
