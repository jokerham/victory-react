import { useEffect, useState } from 'react';
import { FormBuilder } from '../../../components/formBuilder';
import { FirestoreHelper } from '../../../utils/firebase';
import PageComponent from '../../../components/pageComponent';
import PageBodyCard from '../../../components/pageBodyCard';
import { FcInspection } from 'react-icons/fc';
import { FaRunning } from 'react-icons/fa';

export default function ScheduleMatching() {
  const [selectedTournament, setSelectedTournament] = useState('');
  const [dbTournaments] = useState(new FirestoreHelper.Tournaments());

  const executionHandler = (values) => {
    console.log(values)
  }

  const defaultConfig = {
    id: 'scheduleMatching',
    title: '대전 매칭',
    formFields: [
      { id: 'tournament', type: 'select', option: [], label: '대회', dataProperty: ['tournament'] },
    ],
    formData: { tournament: "" },
    customButtons: [
      { key: 'processButton', icon: <FaRunning />, text: '실행', handler: executionHandler },
    ]
  }

  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    async function retrieveData() {
      try {
        dbTournaments.selectByUnscheduled().then((unScheduledTournamentList) => {
          const tournamentList = []
          unScheduledTournamentList.forEach((tournament) => {
            tournamentList.push({ id: tournament.id, value: tournament.title });
          });
          let newConfig = Object.assign({}, defaultConfig);
          newConfig.formFields[0].option = tournamentList;
          setConfig(newConfig);
        });
      } catch (error) {
        console.log(error);
      }
    }
    retrieveData();
  }, [dbTournaments]);

  const handleTournamentChange = (event) => {
    setSelectedTournament(event.target.value);
  }

  return (
    <PageComponent icon={<FcInspection />} title="대회 관리">
      <FormBuilder config={config} />
      <PageBodyCard className="hidden">
      
      </PageBodyCard>
    </PageComponent>
  );
}