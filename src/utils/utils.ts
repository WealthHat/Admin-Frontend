import moment from "moment";
// get Todays date
export const getDate = () => {
  let dateobj = new Date();
  function pad(n: any) {
    return n < 10 ? "0" + n : n;
  }

  let result =
    dateobj.getFullYear() +
    "/" +
    pad(dateobj.getMonth() + 1) +
    "/" +
    pad(dateobj.getDate());
  return result;
};

export const trackDate = (date) => {
  var dateobj = new Date(date);
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  var result =
    pad(dateobj.getDate()) +
    "-" +
    pad(dateobj.getMonth() + 1) +
    "-" +
    dateobj.getFullYear();
  return result;
};

export const trackDates = (date) => {
  var dateobj = new Date(date);
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  var result =
    dateobj.getFullYear() +
    "-" +
    pad(dateobj.getMonth() + 1) +
    "-" +
    pad(dateobj.getDate());

  return result;
};

// export function formatDate(inputDate) {
//   // Use Moment.js to parse the input date string
//   const parsedDate = moment(inputDate, "DD-MM-YYYY hh:mm a");

//   // Use Moment.js to format the date in the desired output format
//   const formattedDate = parsedDate.format("MMM D, YYYY h:mm A");

//   // Return the formatted date string
//   return formattedDate;
// }

export function formatDate(dateString) {
  return moment(dateString, "DD-MM-YYYY HH:mm").format("MMM D, YYYY h:mm A");
}

export const todaysDate = () => {
  var currentdate = new Date();
  var datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
};

// ------------------------------------------------
// Money/Amount auto format method

// add comma
export const addComma = (num: any) => {
  if (typeof num === "string") {
    return num?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

// remove non Numeric
export const removeNum = (num: any) => {
  if (typeof num === "string") {
    return num?.replace(/[^0-9]/g, "");
  } else {
    return num?.toString().replace(/[^0-9]/g, "");
  }
};

// Format money
export const formatMoney = (data: number | string) => {
  return addComma(removeNum(data));
};

// A method to decode jwt
export const parseJwt = (token: string) => {
  if (!token) return;
  const baseUrl = token.split(".")[1];
  const base64 = baseUrl.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

//
export const removeKobo = (number: any) => {
  const res = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "NGN",
  })
    .format(number)
    .replace(/(\.|,)00$/g, "");
  return res;
};

// calculate time remaining
export const calculateTimeRemaining = (pickupDate, deliveryDate) => {
  const currentTime: any = new Date(pickupDate);
  const targetTime: any = new Date(deliveryDate);

  // Calculate the time difference in milliseconds
  const timeDifference = targetTime - currentTime;

  // Calculate the time difference in minutes and hours
  const hrs = Math.floor(timeDifference / (1000 * 60 * 60));
  const mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { mins: mins, hrs: hrs };
};

export const splitDate = (date) => {
  // Parse the input date string
  const parts = date.split(/[- :]/);
  const year = parseInt(parts[2]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[0]);
  const hour = parseInt(parts[3]);
  const minute = parseInt(parts[4]);

  const parsedDate = new Date(year, month, day, hour, minute);

  // Format the parsed date as "yyyy-MM-dd HH:mm"
  const formattedDate = `${parsedDate.getFullYear()}-${(
    parsedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${parsedDate
    .getDate()
    .toString()
    .padStart(2, "0")} ${parsedDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${parsedDate.getMinutes().toString().padStart(2, "0")}`;

  return formattedDate;
};
