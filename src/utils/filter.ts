export const sortCategory = (result, values) => {
  return result?.filter((item) => {
    if (values === "1") {
      return item.category === "real assets";
    } else if (values === "2") {
      return item.category === "liquid assets";
    } else if (values === "3") {
      return item.category === "alternative assets";
    } else {
      return item;
    }
  });
};

// fleet sorted
export const sortTypes = (result, values) => {
  return result?.filter((item) => {
    if (values === "1") {
      return item.type === "fixed income";
    } else if (values === "2") {
      return item.type === "real estate";
    } else if (values === "3") {
      return item.type === "equities";
    } else if (values === "4") {
      return item.type === "cash";
    } else if (values === "5") {
      return item.type === "business interest";
    } else if (values === "6") {
      return item.type === "crypto";
    } else {
      return item;
    }
  });
};
