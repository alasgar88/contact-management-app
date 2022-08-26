import React, { useEffect, useState } from "react";
import { TableComponent } from "../../components";
import { useGlobalContext } from "../../context/context";
import { Badge, Button } from "antd";
import "./contacts.scss";
import {
  DeleteFilled,
  ContactsFilled,
  StarFilled,
} from "../../assets/icons/icons";

const Contacts = () => {
  const {
    contacts,
    tableType,
    recycle,
    showModal,
    deleteAll,
    alreadySelectedRows,
  } = useGlobalContext();
  const [table, setTable] = useState("all");

  const selectedContacts = contacts.filter((contact) => contact.star === true);
  const recycleContacts = recycle;
  console.log(tableType, "tableType");

  useEffect(() => {
    setTable(tableType);
  }, [tableType, table]);

  return (
    <>
      <div className='info-container'>
        <div className='badge-container'>
          <Badge
            count={contacts.length}
            className='badge'
            style={{
              backgroundColor: "white",
              color: "blue",
              border: "1px solid #1a90fd",
            }}
          >
            <ContactsFilled className='badgeIcon' />
          </Badge>
          <Badge
            count={selectedContacts.length}
            className='badge'
            style={{
              backgroundColor: "white",
              color: "blue",
              border: "1px solid #1a90fd",
            }}
          >
            <StarFilled className='badgeIcon' />
          </Badge>
          <Badge
            count={recycle.length}
            className='badge'
            style={{
              backgroundColor: "white",
              color: "blue",
              border: "1px solid #1a90fd",
            }}
          >
            <DeleteFilled className='badgeIcon' />
          </Badge>
        </div>
        <Button
          onClick={() => {
            showModal({
              data: null,
              toastText:
                alreadySelectedRows?.length > 0
                  ? "Əlaqələr uğurla silindi"
                  : "no-toast",
              modalFunction: deleteAll,
              actionText:
                alreadySelectedRows?.length > 0
                  ? "Əlaqələri silmək üçün təsdiqləyin"
                  : "Əlaqə seçilməyib",

              tableType: tableType,
            });
          }}
        >
          Əlaqələri Sil
        </Button>
      </div>

      <TableComponent
        contactData={
          table === "all"
            ? contacts
            : table === "selected"
            ? selectedContacts
            : table === "recycle"
            ? recycleContacts
            : []
        }
        type={table}
      />
    </>
  );
};

export default Contacts;
