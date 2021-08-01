import React, {useState} from 'react';
import styled from '@emotion/styled';

import UserModal from './UserModal';
import Loading from './Loading';

const UserCardContainer = styled.div`
    height: 40vh;
    .userCard-wrapper {
        cursor: pointer;
        border-radius: 5px;
        &:hover {
            box-shadow: 0px 0px 2px 2px ${props => props.theme.color.green};
        }
        &:focus-visible {
            outline: none;
            box-shadow: 0px 0px 2px 2px ${props => props.theme.color.green};
        }
    }
    .userCard-avatar {
        height: 20vh;
        width: 100%;
        border-bottom: none;
        img{
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
    }
    .userCard-info{
        height: 10vh;
        padding: 17px;
        background-color: ${props => props.theme.color.white};
        border: 1px solid ${props => props.theme.color.green};
        border-top: none;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        .userCard-info__name {
            color: black;
            font-weight: 600;
            padding-bottom: 3px;
        }
        .userCard-info__email {
            color: #c0c0c0;
        }
    }
`

export interface UserCardType {
    userData: {
        avatar: string
        email: string
        id: number
        first_name: string
        last_name: string
    }
    focusNum: number
}

const UserCard : React.FC<UserCardType> = ({userData, focusNum}) => {
    const [openedUserModal, setOpenedUserModal] = useState(false);

    const {id, avatar, first_name, last_name, email} = userData;

    const onClickUserCard = () => {
        setOpenedUserModal(true);
    };

    const closeUserModal = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>,
      ) => {
        setOpenedUserModal(false);
    };

    return (
        <>
            <UserCardContainer>
                <div className="userCard-wrapper" onClick={onClickUserCard} tabIndex={focusNum+2}>
                    <div className="userCard-avatar">
                        {/* img loading handling */}
                        {(avatar) ? (
                            <img 
                            src={avatar}
                            alt="user avatar"
                            width="100%"
                            height="100%"
                        />
                        ) : <Loading/>}
                    </div>
                    <div className="userCard-info">
                        <p className="userCard-info__name">
                            <span>{first_name} {last_name}</span>
                        </p>
                        <p className="userCard-info__email">
                            <span>{email}</span>
                        </p>
                    </div>
                </div>
            </UserCardContainer>
            {openedUserModal &&  (
                <UserModal visible={openedUserModal} closable={true} maskClosable={true} onClose={closeUserModal} userId={id}></UserModal>
            )}
        </>
    );
};

export default UserCard;