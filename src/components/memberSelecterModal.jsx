import { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { FirestoreHelper } from '../utils/firebase';

const MemberSelecterModal = ({onClose, onSelect}) => {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [users, setUsers] = useState([]);
  const DbUsers = new FirestoreHelper.Users();

  const searchHandler = async() => {
    const users = await DbUsers.selectByName(searchCriteria);
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
          <div>
            <input type="text" value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
            <IoSearch onClick={searchHandler} />
          </div>
          <ul>
            {users.map(user => (
              <li key={user.id} onClick={() => selectHandler(user)}>
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