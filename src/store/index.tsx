import React, { useState, createContext, useContext } from 'react'; 

// user 타입 정의 
export interface User { 
    avatar: string
    email: string
    id: number
    first_name: string
    last_name: string
} 

// 전역 컨텍스트 
const UserStateContext = createContext<User[] | undefined>(undefined); 
const UserSetStateContext = createContext< React.Dispatch<React.SetStateAction<User[]>> | undefined >(undefined); 
// SearchAPI를 위해 만든 컨텍스트
const AllUserStateContext = createContext<User[] | undefined>(undefined); 
const AllUserSetStateContext = createContext< React.Dispatch<React.SetStateAction<User[]>> | undefined >(undefined); 


// 컨텍스트 적용 & 사용할 컴포넌트 지정 
const UserProvider: React.FC = ({ children }) => { 
    const [allUsers, setAllusers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]); 
    return ( 
        <AllUserStateContext.Provider value={allUsers}>
            <AllUserSetStateContext.Provider value={setAllusers}>
                <UserStateContext.Provider value={users}> 
                    <UserSetStateContext.Provider value={setUsers}> {children} </UserSetStateContext.Provider> 
                </UserStateContext.Provider>
            </AllUserSetStateContext.Provider>
        </AllUserStateContext.Provider> 
        ); 
    }; 

export default UserProvider; 

// 컨텍스트 커스텀 훅 
export const useAllUserStateContext = () => { 
    const context = useContext(AllUserStateContext); 
    if (!context) { 
        throw new Error('context is not found'); 
    } return context; 
} 

export const useAllUserSetStateContext = () => { 
    const context = useContext(AllUserSetStateContext); 
    if (!context) { 
        throw new Error('context is not found'); 
    } 
    return context; 
}

export const useUserStateContext = () => { 
    const context = useContext(UserStateContext); 
    if (!context) { 
        throw new Error('context is not found'); 
    } return context; 
} 

export const useUserSetStateContext = () => { 
    const context = useContext(UserSetStateContext); 
    if (!context) { 
        throw new Error('context is not found'); 
    } 
    return context; 
}
