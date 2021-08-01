import React,{useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import _ from 'lodash';

import UserCard from '../components/UserCard';
import Loading from '../components/Loading';
import {useUserSetStateContext, useUserStateContext, useAllUserStateContext, useAllUserSetStateContext } from '../store';

// Layout : Grid
const UserListContainer = styled.div`
    background-color: #212121;
    height: 100%;
    #contents {
        padding: 25px;
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(6, 1fr);
        gap: 5vh;
        min-height: 80vh;
    }
    @media (max-width: 1700px) {
       #contents {
            grid-template-columns: repeat(5, 1fr);       
       } 
    }
    @media (max-width: 1470px) {
        #contents {
             grid-template-columns: repeat(4, 1fr);       
        } 
     }
     @media (max-width: 1200px) {
        #contents {
             grid-template-columns: repeat(3, 1fr);       
        } 
     }
     @media (max-width: 950px) {
        #contents {
             grid-template-columns: repeat(2, 1fr);       
        } 
     }
     @media (max-width: 580px) {
        #contents {
             margin: 0 50px;
             grid-template-columns: repeat(1, 1fr);       
        } 
     }
     @media (max-width: 480px) {
        #contents {
             margin: 0 10px;
             grid-template-columns: repeat(1, 1fr);       
        } 
     }
     @media (max-width: 400px) {
        #contents {
             margin: 0;
             grid-template-columns: repeat(1, 1fr);       
        } 
     }
`

const UserList = () => {
    const getUserListLoading = useRef(false); 
    const getUserListErrorMessage = useRef('');
    const allUsers = useAllUserStateContext();
    const setAllUsers = useAllUserSetStateContext();
    const users = useUserStateContext();
    const setUsers = useUserSetStateContext(); 
    // [Issue1] : 추가 유저를 가져오기위해 https://reqres.in/api/users?per_page=12&page=2로 요청시 빈배열 반환 서버에 데이터 없는 것으로 판단함.
    // let {current: pageNum} = useRef(1);

    // init userlist
    useEffect(() => {
        getUserList();
    }, []);

    // infinite scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    });

    const getUserList = async() => {
            try{
                // [Issue1]`
                // const {data:{data: result}} = await axios.get(`https://reqres.in/api/users?per_page=12&page=${pageNum}`)
                if(location.pathname.includes('search')){
                    // 검색시 Infinite scroll stop
                    return;
                } else {
                    // Loading 
                    getUserListLoading.current = true;
                    const {data:{data: newGetUsers}} = await axios.get(`https://reqres.in/api/users?per_page=12&page=1`);
                    // Search API All Users
                    if(allUsers.length === 0){
                        setAllUsers(newGetUsers)
                    }
                    getUserListLoading.current = false;
                    setUsers((prevUsers) => [...prevUsers, ...newGetUsers]);
                }   
            } catch(e) {
                // Error Handling & Loading
                getUserListLoading.current = false;
                getUserListErrorMessage.current = e.message;
                console.error(e);
            }  
    }
    // Throttle : 이벤트를 일정한 주기마다 발생
    const handleScroll = _.throttle(() => {
        if(document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight) <= 150){
            // [Issue1]
            // pageNum = pageNum+1;
            // console.log('pageNum : ', pageNum);
            getUserList();
        }
    },1000);
    
    return (
        <UserListContainer>
            <div id="contents">
                {users && users.map((user, index) => <UserCard key={index} userData={user} focusNum={index}/>)} 
                {getUserListLoading.current ? <Loading/> : null}
                {getUserListErrorMessage.current ? <div><p>{getUserListErrorMessage.current}</p></div> :  null }
            </div> 
        </UserListContainer>
    );
};

export default UserList;