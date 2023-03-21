import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FcInspection } from 'react-icons/fc';
import { FirestoreHelper } from '../../../utils/firebase';
import { FormBuilder } from '../../../components/formBuilder';

const InstituteDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const memberValue = location.state;
  const DbUsers = new FirestoreHelper.Users();

  const submitHandler = async (values) => {
    await DbUsers.update(values.id, {
      name: values.name,
      instituteId: values.instituteId,
      type: values.type,
      email: values.email,
      contact: values.contact,
    });

    if (values.type === '단체장' && values.instituteId !== null && values.instituteId !== '') {
      const DBInstitute = new FirestoreHelper.Institutes();
      let institute = await DBInstitute.selectById(values.instituteId);
      institute.userId = values.id;
      delete institute.id;
      await DBInstitute.update(values.instituteId, institute);
    }

    navigate('/admin/member/approved');
  }

  const validataionSchema = yup.object().shape({
    name: yup.string().required('이름을 입력해주새요.'),
    type: yup.string().required('사용자 구분을 선택해주세요.'),
    email: yup.string().email('이메일 주소를 다시 확인해주세요.'),
  });

  const config = {
    id: 'member',
    title: '회원 정보 수정',
    formFields: [
      { id: 'id', type: 'hidden', value: (memberValue == null || !memberValue.hasOwnProperty('id')) ? '' : memberValue.id },
      { id: 'name', type: 'text', label: '이름', value: (memberValue == null || !memberValue.hasOwnProperty('name')) ? '' : memberValue.name },
      { id: 'institute', type: 'institute', label: '단체명', value: (memberValue == null || !memberValue.hasOwnProperty('institute')) ? '' : memberValue.institute.title },
      { id: 'instituteId', type: 'hidden', value: (memberValue == null || !memberValue.hasOwnProperty('instituteId')) ? '' : memberValue.institute.id },
      { id: 'type', type: 'select', option: ['admin','단체장','선수','심판'], label: '사용자구분', value: (memberValue == null || !memberValue.hasOwnProperty('type')) ? '' : memberValue.type },
      { id: 'email', type: 'email', label: '이메일', value: (memberValue == null  || !memberValue.hasOwnProperty('email')) ? '' : memberValue.email },
      { id: 'contact', type: 'text', label: '연락처', value: (memberValue == null  || !memberValue.hasOwnProperty('contact')) ? '' : memberValue.contact },
    ],
    validationSchema: validataionSchema,
    submitHandler: submitHandler,
  }
  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          회원 관리
        </div>
      </div>
      <FormBuilder
        config={config}
      />
    </main>
  )
}

export default InstituteDetail;