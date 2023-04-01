import React, { useState } from 'react';
import { Formik, Form, useFormikContext, Field } from 'formik';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import { FaUndoAlt } from 'react-icons/fa';
import { RiSave3Fill } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import MemberSelecterModal from '../components/memberSelecterModal';
import InstituteSelecterModal from '../components/instituteSelecterModal';
import { useAddEventListeners } from '../utils/helpers/hookHelpers';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const FormButtons = (props) => {
  const { config } = props;
  const formik = useFormikContext();
  const navigate = useNavigate();
  let icon = <></>;
  let text = "";

  if (config.submitHandler != null) {
    icon = <RiSave3Fill />;
    text = "저장";
  } else if (config.searchHandler != null) {
    icon = <IoSearch />
    text = "검색";
  }
  
  const handleCancelClick = () => {
    navigate(-1)
  }

  return (
    <div className='form_buttons'>
      <Button 
        variant="contained" 
        id="form_button_submit" 
        startIcon={icon}
        onClick={formik.submitForm}
      >
        {text}
      </Button>
      <Button 
        variant="contained" 
        id="form_button_submit" 
        startIcon={<FaUndoAlt />}
        onClick={handleCancelClick}
      >
        취소
      </Button>
    </div>
  )
}

const FormBody = (props) => {
  const { config } = props;
  const formik = useFormikContext();
  const [fieldName, setFieldName] = useState("");
  const [popupType, setPopupType] = useState("");
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isInstituteModalOpen, setIsInstituteModalOpen] = useState(false);

  const closeHandler = () => {
    switch (popupType) {
      case 'member':
        setIsMemberModalOpen(false);
        break;
      case 'institute':
        setIsInstituteModalOpen(false);
        break;
      default:
        break;
    }
  }

  const memberPopupHandler = (e) => {
    setFieldName(e.target.getAttribute('id'));
    setPopupType('member');
    setIsMemberModalOpen(true);
  }

  const institutePopupHandler = (e) => {
    setFieldName(e.target.getAttribute('id'));
    setPopupType('institute');
    setIsInstituteModalOpen(true);
  }

  const selectHandler = (obj) => {
    switch (popupType) {
      case 'member':
        formik.setFieldValue(fieldName, obj.name);
        formik.setFieldValue(fieldName + 'Uid', obj.id);
        setIsMemberModalOpen(false);
        break;
      case 'institute':
        formik.setFieldValue(fieldName, obj.title);
        formik.setFieldValue(fieldName + 'Id', obj.id);
        setIsInstituteModalOpen(false);
        break;
      default:
        break;
    }
  }

  useAddEventListeners([
    {class: '.memberSelecter', event: 'click', handler: memberPopupHandler},
    {class: '.instituteSelecter', event: 'click', handler: institutePopupHandler},
  ]);

  const { values, handleChange } = formik;

  const fields = config.formFields.map((formField) => {
    let classNames = [];
    let fieldType = formField.type;
    let readOnly = false;
    let fieldValue = (values !== undefined && formField.id in values) ? values[formField.id] : '';

    if (formField.type === 'contact') {
      fieldType = 'text';
    }
    if (formField.type === 'member') {
      fieldType = 'text';
      classNames.push('memberSelecter');
      readOnly = true;
    }
    if (formField.type === 'institute') {
      fieldType = 'text';
      classNames.push('instituteSelecter');
      readOnly = true;
    }
    if (formField.type === 'readonly') {
      fieldType = 'text';
      readOnly = true;
    }

    const onChange = (e) => {
      handleChange(e);
      if (formField.changeHandler != null) {
        let values = formik.values;
        values[e.target.id] = e.target.value;
        values = formField.changeHandler(values);
        for (const key in values) {
          const value = values[key];
          if (value.value !== formik.values[value.id]) {
            formik.setFieldValue(value.id, value.value);
          }
        }
      }
    }

    let content;
    switch (fieldType) {
      case 'hidden': 
        content = 
          <Field
            id={formField.id}
            name={formField.id}
            type={fieldType}
            readOnly={readOnly}
            className={classNames.join(' ')}
            value={fieldValue}
            onChange={onChange}
          />
          break;
      case 'select':
        const options = formField.option.map((option) => (
          <option key={option} value={option}>{option}</option>
        ));
        options.unshift(
          <option key='empty' value=''></option>
        )
        content = 
          <div>
            <label htmlFor={formField.id}>{formField.label}</label>
            <select
              id={formField.id}
              name={formField.id}
              type={fieldType}
              readOnly={readOnly}
              className={classNames.join(' ')}
              value={fieldValue}
              onChange={onChange}
            >
              {options}
            </select>
          </div>
        break;
      case 'date':
        content = 
          <div>
            <label htmlFor={formField.id}>{formField.label}</label>
            <Field
              id={formField.id}
              name={formField.id}
              type={fieldType}
              readOnly={readOnly}
              className={classNames.join(' ')}
              value={fieldValue}
              onChange={onChange}
            />
          </div>
        break;
      default:
        content = 
          <div>
            <label htmlFor={formField.id}>{formField.label}</label>
            <Field
              id={formField.id}
              name={formField.id}
              type={fieldType}
              readOnly={readOnly}
              className={classNames.join(' ')}
              value={fieldValue}
              onChange={onChange}
            />
          </div>
        break;
    }

    return <div key={formField.id}>{content}</div>;
  });

  return (
    <div className="form_body">
      <div className="form_body__fields">
        {fields}
      </div>
      {isMemberModalOpen && (
        <MemberSelecterModal onClose={closeHandler} onSelect={selectHandler} />
      )}
      {isInstituteModalOpen && (
        <InstituteSelecterModal onClose={closeHandler} onSelect={selectHandler} />
      )}
    </div>
  );
};

const FormBuilder = (props) => {
  const { config } = props;

  const getFieldValue = (data, formField) => {
    let value = '';
    if (formField.value != null) {
      value = formField.value;
    } else if (formField.dataProperty != null) {
      value = data;
      for (let i = 0; i < formField.dataProperty.length; i++) {
        if (data === null || typeof data === 'undefined') {
          value = '';
        } else {
          if(data.hasOwnProperty(formField.dataProperty[i])) {
            value = data[formField.dataProperty[i]];
          }
        }
      }
    }

    if (value === '' && formField.type === 'date') {
      value = new Date();
    }

    if (value === '' && formField.type === 'number') {
      value = 0;
    }
    return value;
  }

  const initialValues = config.formFields.reduce((obj, field) => {
    obj[field.id] = getFieldValue(config.formData, field);
    return obj;
  }, {});

  console.log(initialValues)

  const toastHandler = (message) => {
    const option = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
    toast.error(message, option);
  }

  const onSubmit = (async (values) => {
    const handler = 
      (config.submitHandler != null) ? config.submitHandler :
      (config.searchHandler != null) ? config.searchHandler : null;

    try {
      await config.validationSchema.validateSync(values, {abortEarly: false});
      handler(values);
    } catch (error) {
      error.errors.forEach((e) => {
        toastHandler(e);
      })
    }
  });

  return (
    <div className="page-body">
      <div className="page-body__card">
        <div className="form_header">
          <div className="form_header__title">
            {config.title}
          </div>
        </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            <Form id={config.id}>
              <FormBody config={config} />
              <FormButtons config={config} />
            </Form>
          </Formik>
          <ToastContainer />
      </div>
    </div>
  )
}

export { FormBuilder }