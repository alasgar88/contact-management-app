export const addContactToLocalStorage = (contact) => {
  localStorage.setItem("contact", JSON.stringify(contact));
};

export const getContactFromLocalStorage = () => {
  const result = localStorage.getItem("contact");
  const contact = result ? JSON.parse(result) : [];
  return contact;
};

// export const addStarToLocalStorage = (star) => {
//   localStorage.setItem("star", JSON.stringify(star));
// };

// export const getStarFromLocalStorage = () => {
//   const result = localStorage.getItem("star");
//   const star = result ? JSON.parse(result) : [];
//   return star;
// };

export const addContactToRecycle = (recycle) => {
  localStorage.setItem("recycle", JSON.stringify(recycle));
};

export const getContactFromRecycle = () => {
  const result = localStorage.getItem("recycle");
  const recycle = result ? JSON.parse(result) : [];
  return recycle;
};

export const getUniqueKeysFromLocalStorage = () => {
  const data1 = getContactFromLocalStorage();
  const data2 = getContactFromRecycle();
  const keys1 = data1.map((item) => item.id);
  const keys2 = data2.map((item) => item.id);
  const dataKeys = [...keys1, ...keys2];
  let uniqueKeys = [...new Set(dataKeys)];
  return uniqueKeys;
};
