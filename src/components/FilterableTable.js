import React, { useState, useEffect, useRef } from "react";
import { calculateHeight, sortedBy, sort } from "../utils";
import toogleIcon from "../assets/toogle-icon.svg";

const FilterableTable = ({ data }) => {
  const [sortType, setSortType] = useState({ field: "", type: "" });
  const [newData, setNewData] = useState(data);
  const genderSet = useRef(new Set());
  const gendersToArray = useRef([]);

  data.map((item) => {
    return genderSet.current.add(item.gender);
  });

  gendersToArray.current = Array.from(genderSet.current);

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const handleSort = (e) => {
    const field = e.target.id;

    if (sortType.field !== field) {
      setNewData(sort(data, field, "asc"));
      setSortType({ field, type: "asc" });
    } else if (sortType.field === field && sortType.type === "asc") {
      setNewData(sort(data, field, "desc"));
      setSortType({ field, type: "desc" });
    } else if (sortType.field === field && sortType.type === "desc") {
      setNewData(sort(data, field, "asc"));
      setSortType({ field, type: "asc" });
    }
  };

  const handleGenderFilter = (e) => {
    const selectedGender = e.target.value;
    let result;

    if (selectedGender !== "all") {
      result = data.filter((c) => c.gender === selectedGender);
    } else {
      result = data;
    }
    setNewData(result);
    calculateHeight(newData);
  };

  return (
    <>
      <div className="custom-select">
        <select onChange={handleGenderFilter} defaultValue="Select">
          <option value="all">Filter Gender (All)</option>
          {gendersToArray.current.map((item) => (
            <option key={item} value={item}>{`${item
              .charAt(0)
              .toUpperCase()}${item.slice(1)}`}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <button id="name" onClick={handleSort}>
                Name
                <img
                  src={toogleIcon}
                  height={10}
                  width={10}
                  alt="toggle arrow"
                  data-toggle={sortedBy(sortType, "name")}
                />
              </button>
            </th>
            <th>
              <button id="gender" onClick={handleSort}>
                Gender
                <img
                  src={toogleIcon}
                  height={10}
                  width={10}
                  alt="toogle arrow"
                  data-toggle={sortedBy(sortType, "gender")}
                />
              </button>
            </th>
            <th>
              <button id="height" onClick={handleSort}>
                Height(cm)
                <img
                  src={toogleIcon}
                  height={10}
                  width={10}
                  alt="toogle arrow"
                  data-toggle={sortedBy(sortType, "height")}
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {newData.map((character) => (
            <tr key={character.name}>
              <td>{character.name}</td>
              <td>{character.gender}</td>
              <td>{character.height}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div>
                <p>Total Character</p>
                {newData.length}
              </div>
            </td>
            <td colSpan="2">
              <div>
                <p>Total Height</p>
                {calculateHeight(newData)}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default FilterableTable;
