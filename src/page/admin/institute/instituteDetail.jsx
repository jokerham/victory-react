import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FirestoreHelper } from '../../../utils/firebase';
import { FormBuilder } from '../../../components/formBuilder';
import { FcInspection } from 'react-icons/fc';

const InstituteDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const instituteValue = location.state;
  const DbInstitutes = new FirestoreHelper.Institutes();

  const submitHandler = async (values) => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    if (values.id == null) {
      await DbInstitutes.add({
        title: values.title,
        date: dateTime,
        userId: values.representativeId,
        location: values.location
      });
    } else {
      await DbInstitutes.update(
        values.id, 
        {
          title: values.title,
          date: dateTime,
          userId: values.representativeId,
          location: values.location
        });
    }

    navigate('/admin/institute');
  }

  const validataionSchema = yup.object().shape({
    title: yup.string().required('단체명을 입력해주새요.'),
    representative: yup.string().required('대표자를 선택해주세요.'),
    location: yup.string().required('주소를 입력해주세요.'),
  });

  const config = {
    id: 'institute',
    title: '신규 단체 추가',
    formFields: [
      { id: 'id', type: 'hidden', value: (instituteValue == null || !instituteValue.hasOwnProperty('id')) ? '' : instituteValue['id'] },
      { id: 'title', type: 'text', label: '단체명', value: (instituteValue == null || !instituteValue.hasOwnProperty('title')) ? '' : instituteValue['title'] },
      { id: 'representative', type: 'member', label: '대표자', value: (instituteValue == null || !instituteValue.hasOwnProperty('name')) ? '' : instituteValue['name'] },
      { id: 'representativeId', type: 'hidden', value: (instituteValue == null  || !instituteValue.hasOwnProperty('userId')) ? '' : instituteValue['userId'] },
      { id: 'location', type: 'text', label: '주소', value: (instituteValue == null  || !instituteValue.hasOwnProperty('location')) ? '' : instituteValue['location'] },
    ],
    validationSchema: validataionSchema,
    submitHandler: submitHandler,
  }
  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          단체 관리
        </div>
      </div>
      <FormBuilder
        config={config}
      />
    </main>
  )
}

export default InstituteDetail;