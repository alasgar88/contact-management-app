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
