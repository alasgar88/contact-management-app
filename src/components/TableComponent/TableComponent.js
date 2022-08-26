import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import BasicModal from "../BasicModal/BasicModal";

import {
  InfoCircleFilled,
  DeleteTwoTone,
  InfoCircleTwoTone,
  EditTwoTone,
  StarFilled,
  DeleteFilled,
  MinusSquareFilled,
} from "@ant-design/icons";
import "./table.scss";
import { useGlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const TableComponent = ({ contactData, type }) => {
  const { alreadySelectedRows, setKeys } = useGlobalContext();
  const [alreadySelected, setAlreadySelected] = useState([]);
  console.log(alreadySelectedRows, "alreadySelectedRowKeys");
  const {
    removeContact,
    addStar,
    contacts,
    recycle,
    removeContactFromRecycle,
    restoreContactFromRecycle,
    showModal,
  } = useGlobalContext();
  const navigate = useNavigate();
  // map tp filter
  const star = contacts.map((contact) => {
    if (contact.star === true) {
      return contact.id;
    }
    return null;
  });
  //
  const starDeleted = recycle.map((contact) => {
    if (contact.star === true) {
      return contact.id;
    }
    return null;
  });

  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      render: (key) => {
        return (
          <>
            <Button
              type='text'
              icon={<StarFilled className='iconStar' />}
              className={`icon-button ${
                star.some(
                  (starId) =>
                    (key === starId && type === "all") ||
                    (key === starId && type === "selected")
                )
                  ? "yellow-icon"
                  : starDeleted.some(
                      (starId) => key === starId && type === "recycle"
                    ) && "black-icon"
              }`}
              onClick={(e) => {
                addStar(key);
              }}
              //
            />
          </>
        );
      },
      width: "20px",
    },
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Soyad",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Ata adı",
      dataIndex: "father",
      key: "father's name",
    },
    {
      title: "İxtisas",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Əməliyyat",
      dataIndex: "action",
      key: "action",
      render: (_, { icons }) => (
        <>
          {icons.map((icon) => {
            // return icon;
            return <Button type='text' icon={icon} className='icon-button' />;
          })}
        </>
      ),
    },
  ];

  // handleClick
  const handleInfoClick = (contact) => {
    showModal({ data: contact, toastText: null, modalFunction: null });
  };
  // handleDelete
  const handleDeleteClick = (contact, text, modalFunction, actionText) => {
    showModal({
      data: contact,
      toastText: text,
      modalFunction: modalFunction,
      actionText: actionText,
    });
  };

  const handleEdit = (id) => {
    navigate(`/contacts/edit/${id}`);
  }; // create table
  const data = contactData.map((contact) => {
    return {
      key: contact.id,
      name: contact.name,
      surname: contact.surname,
      father: contact.father,
      profession: contact.profession,
      star: contact.star,
      icons:
        type === "all"
          ? [
              <InfoCircleTwoTone
                onClick={() => handleInfoClick(contact)}
                className='icon info-icon'
                data-id={contact.id}
                data-type='info'
              />,
              <EditTwoTone
                onClick={() => handleEdit(contact.id)}
                className='icon edit-icon'
                data-id={contact.id}
                data-type='edit'
              />,
              <DeleteTwoTone
                onClick={() =>
                  handleDeleteClick(
                    contact,
                    "Əlaqə silindi",
                    removeContact,
                    "Əlaqəni silmək üçün təsdiq et"
                  )
                }
                className='icon delete-icon'
                data-id={contact.id}
                data-type='remove'
              />,
            ]
          : type === "selected"
          ? [
              <InfoCircleTwoTone
                onClick={() => handleInfoClick(contact)}
                className='icon info-icon'
                data-id={contact.id}
                data-type='info'
              />,
              <EditTwoTone
                onClick={() => handleEdit(contact.id)}
                className='icon edit-icon'
                data-id={contact.id}
                data-type='edit'
              />,
              <DeleteTwoTone
                onClick={() =>
                  handleDeleteClick(
                    contact,
                    "Əlaqə silindi",
                    removeContact,
                    "Əlaqəni silmək üçün təsdiq et"
                  )
                }
                className='icon delete-icon'
                data-id={contact.id}
                data-type='remove'
              />,
            ]
          : type === "recycle"
          ? [
              <InfoCircleFilled
                onClick={() => handleInfoClick(contact)}
                className='icon info-icon'
                data-id={contact.id}
                data-type='info'
              />,
              <MinusSquareFilled
                onClick={() =>
                  handleDeleteClick(
                    contact,
                    "Əlaqə bərpa edildi",
                    restoreContactFromRecycle,
                    "Əlaqəni bərpa etmək üçün təsdiq et"
                  )
                }
                clas
                className='icon restore-icon'
                data-id={contact.id}
                data-type='restore'
              />,
              <DeleteFilled
                onClick={() =>
                  handleDeleteClick(
                    contact,
                    "Əlaqə zibil qutusundan silindi",
                    removeContactFromRecycle,
                    "Əlaqəni birdəfəlik silmək üçün təsdiq et"
                  )
                }
                className='icon delete-icon'
                data-id={contact.id}
                data-type='remove'
              />,
            ]
          : null,
    };
  });

  useEffect(() => {
    setAlreadySelected([]);
  }, [contacts]);

  return (
    <>
      <BasicModal />
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          onChange: (keys) => {
            console.log(keys);
            setAlreadySelected(keys);
            setKeys(keys);
          },
          selectedRowKeys: alreadySelected,
          hideSelectAll: true,
        }}
      />
    </>
  );
};

export default TableComponent;
