import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { FcInspection } from 'react-icons/fc';
import { FirestoreHelper } from '../../../utils/firebase';
import { FormBuilder } from '../../../components/formBuilder';

const TournamentDetail = () => {
  const location = useLocation();
  const tournamentValue = location.state;
  const dbTournaments = new FirestoreHelper.Tournaments();

  const submitHandler = async (values) => {
    if (values.id == null || values.id === '') {
      await dbTournaments.add({
        title: values.title,
        dueDate: values.dueDate,
        eventDate: values.eventDate,
        location: values.location,
        // minWeight: values.minWeight,
        // maxWeight: values.maxWeight,
        // diffWeight: values.diffWeight,
        // weight: values.weight,
        rings: values.rings,
      });
    } else {
      await dbTournaments.update(
        values.id, 
        {
          title: values.title,
          dueDate: values.dueDate,
          eventDate: values.eventDate,
          location: values.location,
          // minWeight: values.minWeight,
          // maxWeight: values.maxWeight,
          // diffWeight: values.diffWeight,
          // weight: values.weight,
          rings: values.rings,
        });
    }

    //navigate('/admin/tournament');
  }

  const validataionSchema = yup.object().shape({
    title: yup.string().required('대회명을 입력해주새요.'),
    dueDate: yup.date('날짜형식으로 입력해주세요.').required('신청 마감일을 선택해주세요.'),
    eventDate: yup.date('날짜형식으로 입력해주세요.').required('개최일을 선택해주세요.'),
    location: yup.string().required('장소를 입력해주세요.'),
    // minWeight: yup.number('정수를 입력해주세요.').required('체급(최소)을 입력해주세요.'),
    // maxWeight: yup.number('정수를 입력해주세요.').required('체급(최대)를 입력해주세요.'),
    // diffWeight: yup.number('정수를 입력해주세요.').required('체급 증감 단위를 입력해주세요.'),
    rings: yup.number('정수를 입력해주세요.'),
  });

  // const changeHandler = (values) => {
  //   if (
  //     values.minWeight != null && 
  //     values.maxWeight != null &&
  //     values.diffWeight != null &&
  //     parseInt(values.diffWeight) > 0 && 
  //     parseInt(values.minWeight) < parseInt(values.maxWeight) &&
  //     parseInt(values.diffWeight) < parseInt(values.maxWeight) - parseInt(values.minWeight) ) {
  //     const weight = [];
  //     for (let i = parseInt(values.minWeight); i <= parseInt(values.maxWeight); i = i + parseInt(values.diffWeight)) {
  //       weight.push(i);
  //     }
  //     values.weight = weight.join(', ');
  //   } else {
  //     values.weight = '';
  //   }
  //   return values;
  // }

  const config = {
    id: 'member',
    title: '대회 정보 수정',
    formFields: [
      { id: 'id', type: 'hidden', dataProperty: ['id'] },
      { id: 'title', type: 'text', label: '대회명', dataProperty: ['title'] },
      { id: 'dueDate', type: 'date', label: '신청마감일', dataProperty: ['dueDate'] },
      { id: 'eventDate', type: 'date', label: '개최일', dataProperty: ['eventDate'] },
      { id: 'location', type: 'text', label: '장소', dataProperty: ['location'] },
      // { id: 'minWeight', type: 'number', label: '체급(최소)', dataProperty: ['minWeight'], changeHandler: changeHandler },
      // { id: 'maxWeight', type: 'number', label: '체급(최대)', dataProperty: ['maxWeight'], changeHandler: changeHandler },
      // { id: 'diffWeight', type: 'number', label: '체급 증감 단위', dataProperty: ['diffWeight'], changeHandler: changeHandler },
      // { id: 'weight', type: 'readonly', label: '지원 가능 체급', dataProperty: ['weight'] },
      { id: 'rings', type: 'number', label: '경기장 수', dataProperty: ['rings'] },
    ],
    formData: tournamentValue,
    validationSchema: validataionSchema,
    submitHandler: submitHandler,
    //changeHandler: changeHandler,
  }
  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          대회 관리
        </div>
      </div>
      <FormBuilder
        config={config}
      />
    </main>
  )
}

export default TournamentDetail;