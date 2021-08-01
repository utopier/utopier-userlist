import React from 'react';

import Header from '../components/Header';
import Search from '../components/Search';

interface AppLayoutProps {
    children: React.ReactNode
}

// [TODO] : Responsive Navigation (Multidevice, UX, AppShell).
const AppLayout = ({children}:AppLayoutProps) => {
    // DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화하기 위해 Fragment 사용.
    return (
        <>  
            <Header/>
            <Search/>
            {children}
        </>
    )
};

export default AppLayout;