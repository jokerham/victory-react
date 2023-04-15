import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { FcInspection } from 'react-icons/fc';
import { FirestoreHelper } from '../../../utils/firebase';
import { FormBuilder } from '../../../components/formBuilder';

const ApplicableMatchDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const tournamentId = params.id;
  const applicableMatchValue = location.state;
  const dbTournaments = new FirestoreHelper.Tournaments();
  const dbApplicableMatches = new FirestoreHelper.ApplicableMatches();
  const tournamentTitle = dbTournaments.selectById(tournamentId).title;

  const submitHandler = async (values) => {
    if (typeof values.id !== 'string') {
      await dbApplicableMatches.add({
        tournamentId: tournamentId,
        weight: values.weight,
        matchType: values.matchType,
      });
    } else {
      await dbApplicableMatches.update(
        values.id, 
        {
          tournamentId: tournamentId,
          weight: values.weight,
          matchType: values.matchType,
        });
    }

    navigate(`/admin/tournament/${tournamentId}/applicableMatches`);
  }

  const validataionSchema = yup.object().shape({
    weight: yup.number('체급은 정수로 입력해주세요.').required('체급을 선택해주세요.'),
    matchType: yup.string('').required('대전종류를 입력해주세요.')
  });

  const config = {
    id: 'member',
    title: '대전 관리',
    formFields: [
      { id: 'id', type: 'hidden', dataProperty: ['id'] },
      { id: 'weight', type: 'number', label: '체급', dataProperty: ['weight'] },
      { id: 'matchType', type: 'select', option: ['2인 토너먼트','4인 토너먼트'], label: '대전종류', dataProperty: ['matchType'] },
    ],
    formData: applicableMatchValue,
    validationSchema: validataionSchema,
    submitHandler: submitHandler,
  }
  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          대회 관리 : {tournamentTitle}
        </div>
      </div>
      <FormBuilder
        config={config}
      />
    </main>
  )
}

export default ApplicableMatchDetail;