export const sortMovieByDate = (data: any[]) => {
  return data.sort(
    (
      movie1: { release_date: string | number | Date },
      movie2: { release_date: string | number | Date }
    ) => {
  ;
      const stringToDate1 = new Date(movie1.release_date).getTime();
      const stringToDate2 = new Date(movie2.release_date).getTime();
  
      return stringToDate1 - stringToDate2;
    }
  );
};

export const convertHeight = (cm: number) => {
  const valueInInches = cm / 2.54;
  const valueInFeet = cm / 30.48;
  return { cm, valueInInches, valueInFeet };
};

export const calculateHeight = (data: any[]) => {
  const heights = data.map((c: { height: string }) => parseInt(c.height, 10));
  const filteredHeights = heights.filter((height: unknown) =>
    Number.isInteger(height)
  );
  const totalHeight = filteredHeights.reduce(
    (acc: any, value: any) => acc + value,
    0
  );

  const { valueInInches, valueInFeet } = convertHeight(totalHeight);
  return `${totalHeight}cm (${valueInFeet.toFixed(2)}ft/${valueInInches.toFixed(
    2
  )}in)`;
};

export const sortedBy = (sortType: { field: any; type: any }, name: string) => {
  if (sortType.field === name && sortType.type === "asc") {
    return "asc";
  } else if (sortType.field === name && sortType.type === "desc") {
    return "desc";
  } else {
    return "none";
  }
};

export const sort = (data: any[], field: string, type: string) => {
  let sortedData: any[];

  if (field === "height") {
    sortedData = data.sort(
      (a: { height: string }, b: { height: string }) =>
        parseInt(a.height, 10) - parseInt(b.height, 10)
    );
  } else {
    sortedData = data.sort(
      (a: { [x: string]: string }, b: { [x: string]: any }) =>
        a[field].localeCompare(b[field])
    );
  }

  if (type === "desc") {
    sortedData = sortedData.reverse();
  }

  return sortedData;
};
