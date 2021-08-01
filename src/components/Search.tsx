import React, {useState,useRef} from 'react';
import styled from '@emotion/styled';

import {useUserSetStateContext, useAllUserStateContext} from '../store'

const SearchContainer = styled.div`
    height: 75px;
    padding: 35px 0 15px 50px;
    background-color: #212121;
    input {
        height: 25px;
        width: 200px;
        background-image: url(search.svg);
        background-repeat: no-repeat;
        background-position: 5px center;
        padding-left: 25px;
    }
    input:focus {
        outline: none;
        box-shadow: 0px 0px 1px 1px ${props => props.theme.color.green};
    }
`

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [notFoundUser, setNotFoundUser] = useState(false);
    let {current: renewURL} = useRef('')
    const allUsers = useAllUserStateContext();
    const setUsers = useUserSetStateContext(); 
    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }
    const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            const searchUserResult = allUsers.filter((user) => {
                return user.last_name.toLowerCase().includes(searchText.toLowerCase()) || user.first_name.toLowerCase().includes(searchText.toLowerCase())
            })
            if(searchUserResult.length !== 0) {
                setUsers([...searchUserResult]);
                // URL에 paramter 추가. Search시 InfiniteScroll 멈추기 위해서.
                renewURL = location.href;
                renewURL = renewURL.replace(/\&search=([a-zA-Z0-9]+)/ig,'');
                renewURL += '&search='+searchText;
                console.log('searchText : ', searchText);
                console.log('renewURL : ', renewURL);
                history.pushState(null,null,renewURL);
            } else {
                // 찾는 유저 없을시 Error 처리
                setNotFoundUser(true);
            }
        }
        if(notFoundUser){
            setNotFoundUser(false);
        }
    }
    return (
        <SearchContainer>
                <label htmlFor="searchInput"/>
                <input
                    id="searchInput"
                    type="text"
                    onChange={onChangeInput}
                    onKeyDown={onKeyDownInput}
                    required 
                    tabIndex={2}
                />
                {notFoundUser && (<p>Not Found User.</p>)}
        </SearchContainer>
    );
};

export default Search;