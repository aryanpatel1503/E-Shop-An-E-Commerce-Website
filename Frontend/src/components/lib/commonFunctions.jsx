export const borderForField = (error) => {
  if (error) {
    return `border-t-red-600 focus:!border-[#5479F7] `;
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
