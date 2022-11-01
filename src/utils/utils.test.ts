import { sortMovieByDate, sortedBy, convertHeight } from "./index";
describe("Tests for the Utilities functions", () => {
  const mockArrayData = [
    {
      release_date: "1977-05-25",
    },
    {
      release_date: "1980-05-17",
    },
    {
      release_date: "1983-05-25",
    },
    {
      release_date: "1999-05-19",
    },
    {
      release_date: "2002-05-16",
    },
  ];

  const expectedDate = [
    { release_date: "1977-05-25" },
    { release_date: "1980-05-17" },
    { release_date: "1983-05-25" },
    { release_date: "1999-05-19" },
    { release_date: "2002-05-16" },
  ];

  test("Should sort Movie names by release date from earliest to newest", () => {
    const sortResult = sortMovieByDate(mockArrayData);
    expect(sortResult).toEqual(expectedDate);
  });
  test(`Character heights sum should be shown both in cm and in feet/inches`, () => {
    const res = convertHeight(2708);
    expect(res.cm).toBe(2708);
    expect(res.valueInInches).toBe(1066.1417322834645);
    expect(res.valueInFeet).toBe(88.84514435695537);
  });
  test(`Sort by name, gender and heigth initial state`, () => {
    const sortAsc = { field: "", type: "" };
    const emptyState = sortedBy(sortAsc, "");
    expect(emptyState).toBe("none");
  });
  test(`Sort by ascending order`, () => {
    const sortAscResultName = sortedBy({ field: "name", type: "asc" }, "name");
    const sortDscRes = sortedBy({ field: "name", type: "desc" }, "name");
    expect(sortAscResultName).toBe("asc");
    expect(sortDscRes).toBe("desc");
  });
});
