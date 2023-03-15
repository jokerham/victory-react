import { useState } from 'react';
import { useFormikContext, Formik } from 'formik';
import { Button } from '@mui/material';
import { RiSave3Fill } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import MemberSelecterModal from '../components/memberSelecterModal';
import { useAddEventListeners } from '../utils/helpers/hookHelpers';

export const FormFields = (props) => {
  const { config } = props;
  const { values, setFieldValue } = useFormikContext();
  const [fieldName, setFieldName] = useState("");
  
  const selectHandler = (user) => {
    setFieldName(fieldName, user.name);
    setIsModalOpen(false);
  }

  const closeHandler = () => {
    setIsModalOpen(false);
  }

  useAddEventListeners([
    {class: '.memberSelector', event: 'click', handler: selectHandler},
  ]);


  let fields = [];

  config.formFields.forEach((formField) => {
    let classNames = [];
    switch (formField.type) {
      case 'member':
        classNames.push('memberSelecter');
      case 'text':
        fields.push(
          <div key={formField.id}>
            <label for={formField.id}>{formField.label}</label>
            <input 
              id={formField.id}
              name={formField.id}
              type={formField.type}
              readOnly={formField.type == 'member'}
              className={classNames.join(' ')}
            />
          </div>
        )
        break;
      default:
        break;
    }
  });

  return (
    <div className="form_body__fields">{fields}</div>
  )
}

const FormInputs = (props) => {
  const { config } = props;
  const initialValues = config.formFields.reduce((obj, field) => {
    obj[field.id] = field.value;
    return obj;
  }, {});

  const validationHandler = {};

  const submitHandler = () => {
    if (config.submitHandler != null) {
      return config.submitHandler;
    }
  }

  console.log(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validate={validationHandler}
      onSubmit={submitHandler}
    >
      {(formik) => {
        const { values, setFieldValue, handleSubmit, handleChange} = formik;

        return (
          <form id={config.id} onSubmit={handleSubmit}>
            <FormFields config={config} />
          </form>
        );
      }}
    </Formik>
  )
}

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

export const FormBuilder = (props) => {
  const { config } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="page-body">
      <div className="page-body__card">
        <div className="page-body__card_datatable">
          <div className="form_header">
            <div className="form_header__title">
              {config.title}
            </div>
          </div>
          <div className="form_body">
            <FormInputs config={config}/>
            <FormButtons config={config}/>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <MemberSelecterModal onClose={closeHandler} onSelect={selectHandler} />
      )}
    </div>
  );
}

// Reference : 
// - https://react-data-table-component.netlify.app/
