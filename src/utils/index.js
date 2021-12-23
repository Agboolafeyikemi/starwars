
export const sortMovieByDate = (data) => {
    return data.sort((movie1, movie2) => {
        const stringToDate1 = new Date(movie1.release_date).getTime();
        const stringToDate2 = new Date(movie2.release_date).getTime();
        return stringToDate1 - stringToDate2;
    })
}

export const convertHeight = (cm) => {
    const valueInInches = cm / 2.54;
    const valueInFeet = cm / 30.48;
    return { cm , valueInInches, valueInFeet}
}


export const calculateHeight = (data) => {
    const heights = data.map(c => parseInt(c.height, 10));
    const filteredHeights = heights.filter(height => Number.isInteger(height));
    const totalHeight = filteredHeights.reduce((acc, value) => acc + value, 0)
    
    const { valueInInches, valueInFeet } = convertHeight(totalHeight);
    return  `${totalHeight}cm (${valueInFeet.toFixed(2)}ft/${valueInInches.toFixed(2)}in)`;
}

export const sortedBy = (sortType, name) => {
    if (sortType.field === name && sortType.type === "asc") {
        return "asc"
    } else if (sortType.field === name && sortType.type === "desc") {
        return "desc"
    } else {
        return "none"
    }
}

export const sort = (data, field, type) => {
    let sortedData;
    
    if (field === "height") {
        sortedData = data.sort((a, b) => parseInt(a.height, 10) - parseInt(b.height, 10));
    } else {
        sortedData = data.sort((a, b) => a[field].localeCompare(b[field]));
    }

    if (type === "desc") {
        sortedData = sortedData.reverse();
    }

    return sortedData;
};