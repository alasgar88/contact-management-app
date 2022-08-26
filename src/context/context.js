import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import {
  getContactFromLocalStorage,
  getContactFromRecycle,
} from "../utils/localStorage";

const AppContext = React.createContext();

const initialState = {
  contacts: getContactFromLocalStorage(),
  recycle: getContactFromRecycle(),
  tableType: "all",
  showModalComponent: {
    state: false,
    data: null,
    recycle: false,
    toastText: "",
    modalFunction: null,
    actionText: "",
    alreadySelectedRows: [],
    tableType: null,
  },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTableType = (type) => {
    dispatch({ type: "ADD_TABLE_TYPE", payload: type });
  };
  const clearContacts = () => {
    dispatch({ type: "CLEAR_CONTACTS" });
  };

  const updateContact = (id) => {
    dispatch({ type: "UPDATE_CONTACT", payload: id });
  };
  const removeContact = (id) => {
    dispatch({ type: "REMOVE_CONTACT", payload: id });
  };

  const addContact = (id) => {
    dispatch({ type: "ADD_CONTACT", payload: id });
  };
  const addStar = (id) => {
    dispatch({ type: "ADD_STAR", payload: id });
  };

  const removeContactFromRecycle = (id) => {
    dispatch({ type: "REMOVE_CONTACT_FROM_RECYCLE", payload: id });
  };
  const restoreContactFromRecycle = (id) => {
    dispatch({ type: "RESTORE_CONTACT_FROM_RECYCLE", payload: id });
  };

  const showModal = (id) => {
    dispatch({ type: "SHOW_MODAL", payload: id });
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const clearTrash = (id) => {
    dispatch({ type: "CLEAR_TRASH", payload: id });
  };

  const setKeys = (arrayId) => {
    dispatch({ type: "SET_KEYS", payload: arrayId });
  };
  const deleteAll = (arrayId) => {
    dispatch({ type: "DELETE_ALL", payload: arrayId });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearContacts,
        removeContact,
        addContact,
        addStar,
        clearTrash,
        updateContact,
        addTableType,
        removeContactFromRecycle,
        restoreContactFromRecycle,
        showModal,
        closeModal,
        setKeys,
        deleteAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};
