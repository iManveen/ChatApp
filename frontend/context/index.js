import {createContext, useState} from 'react';
export const GlobalContext = createContext(null);

function GlobalState({children}) {
  const [showLoginView, setShowLoginView] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUsers, setCurrentUsers] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [allChatRooms, setAllChatRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGroupName,setCurrentGroupName]=useState('');
  const [messages,setMessages]=useState({})

  return (
    <GlobalContext.Provider
      value={{
        showLoginView,
        setShowLoginView,
        currentUserName,
        setCurrentUserName,
        currentUsers,
        setCurrentUsers,
        allUsers,
        setAllUsers,
        allChatRooms,
        setAllChatRooms,
        modalVisible,
        setModalVisible,
        currentGroupName,setCurrentGroupName,messages,setMessages,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
export default GlobalState;
