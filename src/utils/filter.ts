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

export const sortBudgetCategory = (result, values) => {
  return result?.filter((item) => {
    if (values === "1") {
      return item.category === "money in";
    } else if (values === "2") {
      return item.category === "money out";
    } else {
      return item;
    }
  });
};

export const sortBudgetTitle = (result, values) => {
  return result?.filter((item) => {
    if (values === "1") {
      return item.title === "salary";
    } else if (values === "2") {
      return item.title === "business income";
    } else if (values === "3") {
      return item.title === "rental income";
    } else if (values === "4") {
      return item.title === "additional incoms";
    } else if (values === "5") {
      return item.title === "housing";
    } else if (values === "6") {
      return item.title === "food";
    } else if (values === "7") {
      return item.title === "groceries";
    } else if (values === "8") {
      return item.title === "childcare";
    } else if (values === "9") {
      return item.title === "car fuel";
    } else if (values === "10") {
      return item.title === "clothing";
    } else if (values === "11") {
      return item.title === "electricity";
    } else if (values === "12") {
      return item.title === "transport";
    } else if (values === "13") {
      return item.title === "utilities";
    } else if (values === "14") {
      return item.title === "netflix";
    } else if (values === "15") {
      return item.title === "phone bill";
    } else if (values === "16") {
      return item.title === "dinning out";
    } else if (values === "17") {
      return item.title === "family";
    } else if (values === "18") {
      return item.title === "school fees";
    } else if (values === "19") {
      return item.title === "domestic staff";
    } else if (values === "20") {
      return item.title === "health insurance";
    } else if (values === "21") {
      return item.title === "life insurance";
    } else if (values === "22") {
      return item.title === "gym membership";
    } else if (values === "23") {
      return item.title === "personal care";
    } else if (values === "24") {
      return item.title === "vacation";
    } else if (values === "25") {
      return item.title === "parents care";
    } else if (values === "26") {
      return item.title === "car insurance";
    } else if (values === "27") {
      return item.title === "repairs";
    } else if (values === "28") {
      return item.title === "driver";
    } else {
      return item;
    }
  });
};
