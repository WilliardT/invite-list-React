import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('https://reqres.in/api/users').then(res => res.json()).then(json => {
      setUsers(json.data)
    }).catch((error)=>{
      console.warn(error);
      alert('Ошибка при получении списка пользователей')
    }).finally(() => 
      setIsLoading(false)
    );
  },[])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true)
  }


  return (
    <div className="App">
      {
        success ? (
        <Success count={invites.length}/> 
        ):(
        <Users 
        isLoading={isLoading} 
        users={users} 
        searchValue={searchValue} 
        onChangeSearchValue={onChangeSearchValue}
        invites={invites}
        onClickInvite={onClickInvite}
        onClickSendInvites={onClickSendInvites}
        />
        )
      }
    </div>
  );
}

export default App;
