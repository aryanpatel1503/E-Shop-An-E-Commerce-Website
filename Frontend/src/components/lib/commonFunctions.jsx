export const borderForField = (error) => {
  if (error) {
    return `!border-t-red-600 focus:!border-[#5479F7] `;
  } else {
    return `!border-t-blue-gray-200 focus:!border-[#5479F7]`;
  }
};

export const getBase64 = async (e) => {
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const file = e.target.files[0];
  let base64 = await convertBase64(file);
  return base64;
};

export const showLocalString = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const getFormattedDateTime = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const formattedHours = String(hours).padStart(2, "0");

  return `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

export const getFormattedDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}/${month.toLowerCase()}/${year}`;
};

export const generateOrderId = () => {
  // const timestamp = Date.now();
  const timestamp = new Date().getMilliseconds();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `OD${timestamp}${randomNumber}`;
};

export const amountFormat = (amount, decimal = 2) => {
  return parseFloat(amount).toFixed(decimal);
};

export const isblank = (value) => {
  if (value === null || value === undefined || value === "") {
    return true;
  }
  return false;
};
