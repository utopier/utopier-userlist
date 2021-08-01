import React,{useEffect, useState, useRef} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import Loading from './Loading';

interface ModalOverlayStyledProps {
  visible: boolean;
}

const ModalOverlay = styled.div<ModalOverlayStyledProps>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  color: black;
`;

const ModalWrapper = styled.div<ModalOverlayStyledProps>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 10px;
  width: 320px;
  background-color: white;
  border-radius: 5px;
  .userModal-close-btn {
    border-radius: 5px;
  }
  .modal-close {
    background-color: black;
    color: white;
    text-decoration: none;
    width: 100%;
    height: 35px;
    align-self: flex-end;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0,0,0,0.9);
    }
    &:active{
      background-color: rgba(0,0,0,0.7);
    }
  }
  .userModal-avatar{
    img {
      width: 100%;
      height: 100%;
    }
  }
  .userModal-info {
    margin: 5px 0px 10px 0px;
    p {
      margin-bottom: 5px;
    }
  }
`;

interface ModalProps {
  className?: string;
  visible?: boolean;
  children?: React.ReactNode;
  maskClosable: boolean;
  closable: boolean;
  onClose: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  userId: number;
}

export interface UserCardType { 
  avatar: string
  email: string
  id: number
  first_name: string
  last_name: string
}

const UserModal: React.FC<ModalProps> = ({ className, visible, maskClosable, closable, onClose, userId }) => {
  const [user, setUser] = useState<UserCardType>();
  const closeBtn = useRef<HTMLButtonElement>();
  useEffect(() => {
    // Enter 시 Modal Close
    closeBtn.current.focus();
    getUser();
  },[])

  const getUser = async() => {
    try{
      const {data:{data:result}} = await axios.get(`https://reqres.in/api/users/${userId}`);
      setUser(result);
    } catch(e) {
      console.error(e);
    }
  }
  const onMaskClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  const close = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClose) {
      onClose(e);
    }
  };
  return (
    <>
      <ModalOverlay visible={visible}>
        <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex={-1} visible={visible}>
          <ModalInner tabIndex={0} className="modal-inner">
            <div className="userModal-avatar">
              {/* img loading handling */}
              {(user && user.avatar) ? (
                 <img 
                 src={user && user.avatar}
                 alt="user avatar"
                 width="100"
                 height="100"
               />
              ) : <Loading/>}
            </div>
            <div className="userModal-info">
              <p>
                <span>ID : </span><span>{user && user.id}</span>
              </p>
              <p>
                <span>First Name : </span><span>{user && user.first_name}</span>
              </p>
              <p>
                <span>Last Name : </span><span>{user && user.last_name}</span>
              </p>
              <p>
                <span>Email : </span><span>{user && user.email}</span>
              </p>
            </div>
            <div className="userModal-close-btn">
              {closable && (
                <button ref={closeBtn} className="modal-close" onClick={close}>
                  Close
                </button>
              )}
            </div>
          </ModalInner>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
};

export default UserModal;