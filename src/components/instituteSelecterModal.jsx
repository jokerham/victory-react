import { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { FirestoreHelper } from '../utils/firebase';

const InstituteSelecterModal = ({onClose, onSelect}) => {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [institutes, setInstitutes] = useState([]);
  const DbInstitutes = new FirestoreHelper.Institutes();

  const searchHandler = async() => {
    const institutes = await DbInstitutes.selectByTitle(searchCriteria);
    console.log(institutes);
    setInstitutes(institutes);
  }

  const selectHandler = (institute) => {
    onSelect(institute);
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <span className="modal__header__title">단체 선택</span>
          <IoClose className="modal__header__button" onClick={onClose}/>
        </div>
        <div className="modal__body">
          <div>
            <input type="text" value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
            <IoSearch onClick={searchHandler} />
          </div>
          <ul>
            {institutes.map(institute => (
              <li key={institute.id} onClick={() => selectHandler(institute)}>
                {institute.title}
              </li>              
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InstituteSelecterModal;