import { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { getUserListByName } from '../utils/firebase';

const MemberSelecterModal = ({onClose, onSelect}) => {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [users, setUsers] = useState([]);

  const searchHandler = async() => {
    const users = await getUserListByName(searchCriteria);
    setUsers(users);
  }

  const selectHandler = (user) => {
    onSelect(user);
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <span className="modal__header__title">사용자 선택</span>
          <IoClose className="modal__header__button" onClick={onClose}/>
        </div>
        <div className="modal__body">
          <input type="text" value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
          <IoSearch onClick={searchHandler} />
          <ul>
            {users.map(user => (
              <li key={user.uid} onClick={() => selectHandler(user)}>
                {user.name}
              </li>              
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MemberSelecterModal;