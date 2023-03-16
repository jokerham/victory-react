import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormBuilder } from '../../../components/formBuilder';
import { FcInspection } from 'react-icons/fc';
import { addInstitute } from '../../../utils/firebase';

const InstituteDetail = () => {
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    await addInstitute({
      title: values.title,
      date: dateTime,
      uid: values.representativeUid,
      location: values.location
    });
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
      {
        id: 'title',
        type: 'text',
        label: '단체명',
        value: '',
      },
      {
        id: 'representative',
        type: 'member',
        label: '대표자',
        value: '',
      },
      {
        id: 'representativeUid',
        type: 'hidden',
        value: '',
      },
      {
        id: 'location',
        type: 'text',
        label: '주소',
        value: '',
      },
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