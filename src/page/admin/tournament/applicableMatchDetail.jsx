import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { FcInspection } from 'react-icons/fc';
import { FirestoreHelper } from '../../../utils/firebase';
import { FormBuilder } from '../../../components/formBuilder';

const ApplicableMatchDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tournamentTitle, setTournamentTitle] = useState("");
  const [dbApplicableMatches] = useState(new FirestoreHelper.ApplicableMatches());
  const params = useParams();
  const tournamentId = params.id;
  const applicableMatchValue = Object.keys(location.state).length === 0 ? {
    matchType: '',
    weight: '0',
    tournamentType: '',
    duration: '',
    rounds: '0'} : location.state

  console.log(location)

  useEffect(() => {
    async function getTournamentInfo() {
      const dbTournaments = new FirestoreHelper.Tournaments();
      try {
        const tournament = await dbTournaments.selectById(tournamentId);
        setTournamentTitle(tournament.title);
      } catch (error) {
        console.log(error);
      }
    }

    getTournamentInfo();
  }, [tournamentId])

  const submitHandler = async (values) => {
    if (typeof values.id !== 'string' || values.id === '') {
      await dbApplicableMatches.add({
        tournamentId: tournamentId,
        matchType: values.matchType,
        weight: values.weight,
        tournamentType: values.tournamentType,
        duration: values.duration,
        rounds: values.rounds,
      });
    } else {
      await dbApplicableMatches.update(
        values.id, 
        {
          tournamentId: tournamentId,
          matchType: values.matchType,
          weight: values.weight,
          tournamentType: values.tournamentType,
          duration: values.duration,
          rounds: values.rounds,
        });
    }

    navigate(`/admin/tournament/${tournamentId}/applicableMatches`);
  }

  const validataionSchema = yup.object().shape({
    matchType: yup.string().typeError('구분을 입력해주세요.').required('구분을 입력해주세요.'),
    weight: yup.number().typeError('체급은 정수로 입력해주세요.').required('체급을 선택해주세요.'),
    tournamentType: yup.string('대전종류를 입력해주세요.').required('대전종류를 입력해주세요.'),
    duration: yup.string().typeError('경기시간을 입력해주세요.').required('경기시간을 입력해주세요.'),
    rounds: yup.number().typeError('라운드 수는 정수로 입력해주세요.').required('라운드 수를 입력해주세요.'),
  });

  const config = {
    id: 'member',
    title: '대전 관리',
    formFields: [
      { id: 'id', type: 'hidden', dataProperty: ['id'] },
      { id: 'matchType', type: 'text', label: '구분', dataProperty: ['matchType'] },
      { id: 'weight', type: 'number', label: '체급', dataProperty: ['weight'] },
      { id: 'tournamentType', type: 'select', option: ['2인 토너먼트','4인 토너먼트'], label: '대전종류', dataProperty: ['tournamentType'] },
      { id: 'duration', type: 'text', label: '경기시간', dataProperty: ['duration'] },
      { id: 'rounds', type: 'number', label: '라운드 수', dataProperty: ['rounds'] },
    ],
    formData: applicableMatchValue,
    validationSchema: validataionSchema,
    submitHandler: submitHandler,
    cancelEnabled: true,
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