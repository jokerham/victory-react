import React, { useState } from 'react';
import { Formik, Form, useFormikContext, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import { FaUndoAlt } from 'react-icons/fa';
import { RiSave3Fill } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import MemberSelecterModal from '../components/memberSelecterModal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeHandler = () => {
    setIsModalOpen(false);
  }

  const memberPopupHandler = (e) => {
    setFieldName(e.target.getAttribute('id'));
    setPopupType('member');
    setIsModalOpen(true);
  }

  const selectHandler = (user) => {
    formik.setFieldValue(fieldName, user.name);
    if (popupType === 'member')
      formik.setFieldValue(fieldName + 'Uid', user.uid);
    setIsModalOpen(false);
  }

  useAddEventListeners([
    {class: '.memberSelecter', event: 'click', handler: memberPopupHandler},
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

    return fieldType !== 'hidden' ? (
      <div key={formField.id}>
        <label htmlFor={formField.id}>{formField.label}</label>
        <Field
          id={formField.id}
          name={formField.id}
          type={fieldType}
          readOnly={readOnly}
          className={classNames.join(' ')}
          value={fieldValue}
          onChange={handleChange}
        />
      </div>
    ) : (
      <Field
        key={formField.id}
        id={formField.id}
        name={formField.id}
        type={fieldType}
        readOnly={readOnly}
        className={classNames.join(' ')}
        value={fieldValue}
        onChange={handleChange}
      />
    );
  });

  return (
    <div className="form_body">
      <div className="form_body__fields">
        {fields}
      </div>
      {isModalOpen && (
        <MemberSelecterModal onClose={closeHandler} onSelect={selectHandler} />
      )}
    </div>
  );
};

const FormBuilder = (props) => {
  const { config } = props;

  const initialValues = config.formFields.reduce((obj, field) => {
    obj[field.id] = field.value;
    return obj;
  }, {});

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
  })

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