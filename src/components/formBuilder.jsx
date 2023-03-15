import React, { useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import { Button } from '@mui/material';
import { RiSave3Fill } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import MemberSelecterModal from '../components/memberSelecterModal';
import { useAddEventListeners } from '../utils/helpers/hookHelpers';

const FormButtons = (props) => {
  const { config } = props;
  let icon = <></>;
  let text = "";

  if (config.submitHandler != null) {
    icon = <RiSave3Fill />;
    text = "저장";
  } else if (config.searchHandler != null) {
    icon = <IoSearch />
    text = "검색";
  }
  return (
    <Button variant="contained" id="form_button_save" startIcon={icon}>{text}</Button>
  )
}

const FormBody = (props) => {
  const { config } = props;
  const formik = useFormikContext();
  const [fieldName, setFieldName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeHandler = () => {
    setIsModalOpen(false);
  }

  const memberPopupHandler = (e) => {
    setFieldName(e.target.getAttribute('id'));
    setIsModalOpen(true);
  }

  const selectHandler = (user) => {
    formik.setFieldValue(fieldName, user.name);
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

    if (formField.type === 'member') {
      fieldType = 'text';
      classNames.push('memberSelecter');
      readOnly = true;
    }

    return fieldType !== 'hidden' ? (
      <div key={formField.id}>
        <label htmlFor={formField.id}>{formField.label}</label>
        <input
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
      <input
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
      <FormButtons config={config} />
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

  const onSubmit = (config.submitHandler != null) ?
    config.searchHandler : config.submitHandler;

  return (
    <div className="page-body">
      <div className="page-body__card">
        <div className="page-body__card_datatable">
          <div className="form_header">
            <div className="form_header__title">
              {config.title}
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            <FormBody config={config} />
          </Formik>
        </div>
      </div>
    </div>
  )
}

export { FormBuilder }