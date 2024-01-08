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

export const sortBudgetTitle = (result, values) => {
  return result?.filter((item) => {
    if (values === "1") {
      return item.type === "salary";
    } else if (values === "2") {
      return item.type === "business income";
    } else if (values === "3") {
      return item.type === "rental income";
    } else if (values === "4") {
      return item.type === "additional incoms";
    } else if (values === "5") {
      return item.type === "housing";
    } else if (values === "6") {
      return item.type === "food";
    } else if (values === "7") {
      return item.type === "groceries";
    } else if (values === "8") {
      return item.type === "childcare";
    } else if (values === "9") {
      return item.type === "car fuel";
    } else if (values === "10") {
      return item.type === "clothing";
    } else if (values === "11") {
      return item.type === "electricity";
    } else if (values === "12") {
      return item.type === "transport";
    } else if (values === "13") {
      return item.type === "utilities";
    } else if (values === "14") {
      return item.type === "netflix";
    } else if (values === "15") {
      return item.type === "phone bill";
    } else if (values === "16") {
      return item.type === "dinning out";
    } else if (values === "17") {
      return item.type === "family";
    } else if (values === "18") {
      return item.type === "school fees";
    } else if (values === "19") {
      return item.type === "domestic staff";
    } else if (values === "20") {
      return item.type === "health insurance";
    } else if (values === "21") {
      return item.type === "life insurance";
    } else if (values === "22") {
      return item.type === "gym membership";
    } else if (values === "23") {
      return item.type === "personal care";
    } else if (values === "24") {
      return item.type === "vacation";
    } else if (values === "25") {
      return item.type === "parents care";
    } else if (values === "26") {
      return item.type === "car insurance";
    } else if (values === "27") {
      return item.type === "repairs";
    } else if (values === "28") {
      return item.type === "driver";
    } else {
      return item;
    }
  });
};
