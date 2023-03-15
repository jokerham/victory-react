import { FormBuilder } from '../../../components/formBuilder';
import { FcInspection } from 'react-icons/fc';

const InstituteDetail = () => {
  const submitHandler = () => {

  }
  
  const config = {
    id: 'institute',
    title: '신규 조직 추가',
    formFields: [
      {
        id: 'title',
        type: 'text',
        label: '조직명',
        value: '',
      },
      {
        id: 'representative',
        type: 'member',
        label: '대표자',
        value: '',
      },
      {
        id: 'uid',
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
    submitHandler: submitHandler,

  }
  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          조직관리
        </div>
      </div>
      <FormBuilder
        config={config}
      />
    </main>
  )
}

export default InstituteDetail;