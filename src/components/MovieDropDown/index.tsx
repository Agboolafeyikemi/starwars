import React, { memo } from "react";
import Loading from "../Loading";
import "./moviedropdown.css";

interface Character {
  gender: string;
  name: string;
  character?: Object[];
  height: Number;
  release_date?: string;
  title?: string;
}

const MovieDropDown = ({
  isLoading,
  data,
  onChange,
  value,
}: {
  isLoading: Boolean;
  data: Character[];
  onChange: (e: { target: { value: string } }) => void;
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
