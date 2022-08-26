import React, { useState } from "react";
import { toast } from "react-toastify";
import "./form-component.scss";
import { Form, Input, Button, Radio, Select, Checkbox } from "antd";
import { useGlobalContext } from "../../context/context";
import { useNavigate, useParams } from "react-router-dom";
import { getUniqueKeysFromLocalStorage } from "../../utils/localStorage";
const { TextArea } = Input;

const FormComponent = ({ editObject }) => {
  const { contacts, addContact, updateContact, addTableType } =
    useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const valueExists = contacts.some((contact) => contact.id === id);
  const [componentDisabled, setComponentDisabled] = useState(false);

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const onFinish = (values) => {
    if (
      values.name &&
      values.surname &&
      values.email &&
      values.father &&
      values.gender &&
      values.additionalInfo
    ) {
      if (
        valueExists &&
        values.name === editObject.name &&
        values.surname === editObject.surname &&
        values.email === editObject.email &&
        values.father === editObject.father &&
        values.gender === editObject.gender &&
        values.additionalInfo === editObject.additionalInfo
      ) {
        toast.error("Əlaqə yenilənmədi");
        setTimeout(() => {
          navigate("/contacts");
        }, 1500);
        return;
      } else if (
        values.name.startsWith(" ") ||
        values.surname.startsWith(" ") ||
        values.email.startsWith(" ") ||
        values.father.startsWith(" ") ||
        values.additionalInfo.startsWith(" ")
      ) {
        toast.error("Boşluqla başlayan dəyər");
        return;
      } else if (valueExists) {
        updateContact({ ...values, id: editObject.id });
        toast.success("Əlaqə yeniləndi");
        setTimeout(() => {
          addTableType("all");
          navigate("/contacts");
        }, 1000);
        return;
      } else {
        const uniqueKeys = getUniqueKeysFromLocalStorage();
        while (true) {
          var key = Math.floor(Math.random() * 1000).toString();
          const isUnique = uniqueKeys.every((item) => item !== id);
          if (isUnique) {
            break;
          }
        }
        const newContact = { ...values, id: key, star: false };
        addContact(newContact);
        toast.success("Yeni əlaqə yaradıldı");
        setTimeout(() => {
          addTableType("all");
          navigate("/contacts");
        }, 1000);
      }
    }
  };
  return (
    <>
      {/* <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox> */}
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          name: editObject?.name,
          surname: editObject?.surname,
          father: editObject?.father,
          email: editObject?.email,
          additionalInfo: editObject?.additionalInfo,
          gender: editObject?.gender,
          acceptNews: editObject?.acceptNews,
          news: editObject?.news,
          profession: editObject?.profession
            ? editObject?.profession
            : "Front End proqramçı",
        }}
        layout='horizontal'
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
        onFinish={onFinish}
      >
        {/* <Form.Item label='Chekbox' name='disabled' valuePropName='checked'>
          <Checkbox>Checkbox</Checkbox>
        </Form.Item> */}
        <Form.Item
          label='Ad'
          name='name'
          rules={[
            {
              required: true,
              message: "Adınızı daxil etməniz vacibdir",
            },
          ]}
        >
          <Input placeholder='Adınızı daxil edin' />
        </Form.Item>
        <Form.Item
          label='Soyad'
          name='surname'
          rules={[
            { required: true, message: "Soyadınızı daxil etməniz vacibdir" },
          ]}
        >
          <Input placeholder='Soyadınızı daxil edin' />
        </Form.Item>
        <Form.Item
          label='Ata adı'
          name='father'
          rules={[
            { required: true, message: "Ata adını daxil etməniz vacibdir" },
          ]}
        >
          <Input placeholder='Ata adınızı daxil edin' />
        </Form.Item>
        <Form.Item
          label='E-poçt'
          name='email'
          rules={[
            {
              required: true,
              message: "E-poçt ünvanı daxil etməniz vacibdir",
            },
          ]}
        >
          <Input placeholder='E-poçt ünvanınızı daxil edin' type='email' />
        </Form.Item>
        <Form.Item
          label='Info'
          name='additionalInfo'
          rules={[
            {
              required: true,
              message: "Əlavə məlumat bölməsin doldurmanız vacibdir",
            },
          ]}
        >
          <TextArea rows={4} placeholder='Əlavə məlumatları daxil edin' />
        </Form.Item>
        <Form.Item label='Vəzifə' name='profession'>
          <Select>
            <Select.Option value='Front End proqramçı'>
              Front End programçı
            </Select.Option>
            <Select.Option value='Back End proqramçı'>
              Back End proqramçı
            </Select.Option>
            <Select.Option value='Şəbəkə Administratoru'>
              ŞƏBƏKƏ ADMİNİSTRATORU
            </Select.Option>
            <Select.Option value='Data Science'>Data Science</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Cins'
          name='gender'
          rules={[
            {
              required: true,
              message: "Cinsinizi seçin",
            },
          ]}
        >
          <Radio.Group>
            <Radio value='Kişi'> Kişi </Radio>
            <Radio value='Qadin'> Qadın </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='news' label='Bildiriş' valuePropName='checked'>
          <Checkbox value='checked' defaultChecked={false}>
            Yeniliklərə yazıl
          </Checkbox>
        </Form.Item>
        <Form.Item className='button-container'>
          <Button type='primary' htmlType='submit' className='submit-button'>
            {id ? "Düzəliş et" : "Təsdiqlə"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormComponent;
