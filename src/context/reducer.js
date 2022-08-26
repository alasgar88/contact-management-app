import {
  addContactToLocalStorage,
  addContactToRecycle,
} from "../utils/localStorage";

const reducer = (state, action) => {
  if (action.type === "ADD_CONTACT") {
    const contacts = [...state.contacts, action.payload];
    addContactToLocalStorage(contacts);

    return { ...state, contacts };
  }

  if (action.type === "REMOVE_CONTACT") {
    const deletedContact = state.contacts.find(
      (contact) => contact.id === action.payload
    );

    const contacts = state.contacts.filter(
      (contact) => contact.id !== action.payload
    );

    const recycle = [...state.recycle, deletedContact];
    addContactToLocalStorage(contacts);
    addContactToRecycle(recycle);

    return { ...state, contacts, recycle };
  }
  if (action.type === "UPDATE_CONTACT") {
    const contacts = state.contacts.map((contact) => {
      if (contact.id === action.payload.id) {
        return action.payload;
      }
      return contact;
    });
    addContactToLocalStorage(contacts);
    return { ...state, contacts };
  }

  if (action.type === "ADD_STAR") {
    console.log(state.contacts, "contacts");
    console.log(action.payload);

    const contacts = state.contacts.map((contact) => {
      if (contact.id === action.payload) {
        return { ...contact, star: !contact.star };
      }
      return contact;
    });
    addContactToLocalStorage(contacts);
    return { ...state, contacts };
  }

  if (action.type === "ADD_TABLE_TYPE") {
    return { ...state, tableType: action.payload };
  }

  if (action.type === "REMOVE_CONTACT_FROM_RECYCLE") {
    const recycle = state.recycle.filter((item) => item.id !== action.payload);
    addContactToRecycle(recycle);
    return { ...state, recycle };
  }

  if (action.type === "RESTORE_CONTACT_FROM_RECYCLE") {
    console.log("burdayam");
    const recycle = state.recycle.filter((item) => item.id !== action.payload);
    const restoreItem = state.recycle.find(
      (item) => item.id === action.payload
    );
    const contacts = [...state.contacts, restoreItem];
    addContactToLocalStorage(contacts);
    addContactToRecycle(recycle);
    return { ...state, contacts, recycle };
  }

  if (action.type === "SHOW_MODAL") {
    console.log(action.payload);
    console.log(action.payload.actionText, "actionText");
    var showModalComponent = {
      ...state.showModalComponent,
      state: true,
      recycle: action.payload.recycle,
      data: action.payload.data,
      toastText: action.payload.toastText,
      modalFunction: action.payload.modalFunction,
      actionText: action.payload.actionText,
      tableType: action.payload.tableType,
    };

    return { ...state, showModalComponent };
  }

  if (action.type === "CLOSE_MODAL") {
    const showModalComponent = { ...state.showModalComponent, state: false };
    return { ...state, showModalComponent };
  }

  if (action.type === "SET_KEYS") {
    return { ...state, alreadySelectedRows: action.payload };
  }

  if (action.type === "DELETE_ALL") {
    const tableType = state.showModalComponent.tableType;
    if (tableType === "recycle") {
      const recycle = state.recycle.filter(
        (item) => !action.payload.includes(item.id)
      );
      addContactToRecycle(recycle);

      return {
        ...state,
        recycle,
        showModalComponent: { ...showModalComponent, alreadySelectedRows: [] },
      };
    } else {
      // add to recycle bin
      const deletedContacts = state.contacts.filter((contact) =>
        action.payload.includes(contact.id)
      );
      // remove from state
      const contacts = state.contacts.filter(
        (contact) => !action.payload.includes(contact.id)
      );

      const recycle = [...state.recycle, ...deletedContacts];

      addContactToLocalStorage(contacts);
      addContactToRecycle(recycle);

      return {
        ...state,
        contacts,
        recycle,
        showModalComponent: { ...showModalComponent, alreadySelectedRows: [] },
      };
    }
  }

  throw new Error("no matching action type");
};

export default reducer;
