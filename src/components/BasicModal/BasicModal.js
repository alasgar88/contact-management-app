import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/context";
import { toast } from "react-toastify";
import "./basic-modal.scss";
import { WarningFilled } from "../../assets/icons/icons";

const BasicModal = ({ data }) => {
  const { showModalComponent, closeModal, alreadySelectedRows } =
    useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toastText = showModalComponent.toastText;
  const actionText = showModalComponent.actionText;

  const modalData = showModalComponent?.data;
  const modalFunction = showModalComponent.modalFunction;
  const idArray = alreadySelectedRows;

  const handleOk = () => {
    setIsModalVisible(false);
    modalFunction(modalData ? modalData.id : idArray);
    closeModal();
    if (toastText !== "no-toast") {
      toast.success(toastText);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    closeModal();
  };

  useEffect(() => {
    setIsModalVisible(showModalComponent.state);
  }, [showModalComponent]);

  return (
    <>
      <Modal
        title={`${!toastText ? "Əlaqə məlumatları" : ""}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!toastText ? (
          <div className='container'>
            <div className='container-item'>
              <div className='title'>ad :</div>
              <div className='info'>{modalData?.name}</div>
            </div>
            <div className='container-item'>
              <div className='title'>soyad :</div>
              <div className='info'>{modalData?.surname}</div>
            </div>
            <div className='container-item'>
              <div className='title'>ata ad :</div>
              <div className='info'>{modalData?.father}</div>
            </div>
            <div className='container-item'>
              <div className='title'>elektron poçt :</div>
              <div className='info'>{modalData?.email}</div>
            </div>
            <div className='container-item'>
              <div className='title'>əlavə məlumat :</div>
              <div className='info'>{modalData?.additionalInfo}</div>
            </div>
            <div className='container-item'>
              <div className='title'>vəzifə :</div>
              <div className='info'>{modalData?.profession}</div>
            </div>
            <div className='container-item'>
              <div className='title'>cins :</div>
              <div className='info'>{modalData?.gender}</div>
            </div>
          </div>
        ) : (
          <div className='confirmTask'>
            <span className='confirm'>
              <WarningFilled />
            </span>
            <span className='confirm-text'>{actionText}</span>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BasicModal;
