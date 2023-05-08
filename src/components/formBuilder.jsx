import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useFormikContext, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import { FaUndoAlt } from 'react-icons/fa';
import { RiSave3Fill } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import MemberSelecterModal from '../components/memberSelecterModal';
import PageBodyCard from '../components/pageBodyCard';
import InstituteSelecterModal from '../components/instituteSelecterModal';
import { useAddEventListeners } from '../utils/helpers/hookHelpers';
import 'react-toastify/dist/ReactToastify.css';

const FormButton = (props) => {
  const { key, icon, text, handler } = props
  return (
    <Button 
      variant="contained" 
      id={key} 
      startIcon={icon}
      onClick={handler}
    >
      {text}
    </Button>
  )
}

const FormButtons = (props) => {
  const { config } = props;
  const formik = useFormikContext();
  const navigate = useNavigate();
  let buttonComponents = []

  if (config.submitHandler != null) {
    buttonComponents.push(
      <FormButton key="submitButton" icon={<RiSave3Fill />} text="저장" handler={formik.submitForm}/>);
  } 
  if (config.searchHandler != null) {
    buttonComponents.push(
      <FormButton key="searchButton" icon={<IoSearch />} text="검색" handler={formik.submitForm}/>);
  }

  const handleCancelClick = () => {
    navigate(-1)
  }

  if (config.cancelEnabled) {
    buttonComponents.push(
      <FormButton key="cancelButton" icon={<FaUndoAlt />} text="취소" handler={handleCancelClick}/>);
  }

  if (config.customButtons != null) {
    for (const button of config.customButtons) {
      buttonComponents.push(
        <FormButton key={button.key} icon={button.icon} text={button.text} handler={button.handler(formik.values)}/>);
    }
  }

  return (
    <div className='form_buttons'>
      {buttonComponents}
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
    let fieldValue = (values !== undefined && formField.id in values && values[formField.id].length > 0) ? values[formField.id] : fieldType === 'number' ? '0' : ''; //  

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
      handleChange(e)
      setFieldForOnChangeHandler(e);
    }

    const setFieldForOnChangeHandler = (e) => {
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

    let content = ''
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
        const options = [<option key='' value=''></option>]
        formField.option.forEach((option) => {
          if (typeof option === "string") {
            options.push(<option key={option} value={option}>{option}</option>);
          } else {
            options.push(<option key={option.id} value={option.id}>{option.value}</option>);
          }
        });
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
      case "number":
        content = 
          <div>
            <label htmlFor={formField.id}>{formField.label}</label>
            <Field
              id={formField.id}
              name={formField.id}
              type='text'
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

  const toastHandler = (message, toastType = 'error') => {
    const option = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }

    switch(toastType) {
      case 'error':
        toast.error(message, option);
        break;
      case 'success':
        toast.success(message, option);
        break;
      case 'info':
        toast.info(message, option);
        break;
      case 'warning':
        toast.warning(message, option);
        break;
      default:
        break;
    }
  }

  const onSubmit = (async (values) => {
    const handler = 
      (config.submitHandler != null) ? config.submitHandler :
      (config.searchHandler != null) ? config.searchHandler : null;

    try {
      await config.validationSchema.validateSync(values, {abortEarly: false});
      toastHandler('정상적으로 저장되었습니다.', 'success');
      handler(values);
    } catch (error) {
      error.errors.forEach((e) => {
        toastHandler(e);
      })
    }
  });

  return (
    <PageBodyCard>
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
    </PageBodyCard>
  )
}

export { FormBuilder }
