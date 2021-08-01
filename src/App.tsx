import React from 'react';
import styled from '@emotion/styled';
import {ThemeProvider} from '@emotion/react';

import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import UserList from './routes/UserList';
import UserProvider from './store';
import AppLayout from './components/AppLayout';

const AppContainer = styled.div`
    color: ${props => props.theme.color.white}
`;

// SPA (+ axios)
    // 장점
        // 1. 자연스러운 사용자 경험 : 페이지 리로딩 없이 첫 로딩후 서버에서 데이터만 받아서 페이지 수정
        // 2. 필요한 리소스만 부분적으로 로딩 : 정적리소스를 한번만 요청한 후 받은 데이터는 모두 Cache화
        // 3. 서버의 템플릿 연산을 클라이언트로 분산
        // 4. 컴포넌트별 개발 용이 (생산성)
        // 5. 모바일 앱 개발을 염두에 둔다면 동일한 API를 사용하도록 설계 가능 (생산성)
    // 단점
        // 1. 첫 렌더링 느림 : Code Splitting 고려, PWA AppShell 고려
        // 2. SEO 문제 : SSR 고려(Nextjs)
        // 3. 보안 이슈 (프론트엔드에 비즈니스 로직 최소화) : SSR은 서버에 세션으로 사용자 정보 관리, CSR은 쿠키말고는 저장공간이 마땅치 않음.

// State Management : Context API
// [TODO] : Error Boundary 고려(잡지 못하는 에러 존재 : https://ko.reactjs.org/docs/error-boundaries.html)
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <AppContainer>
                <UserProvider>
                    <AppLayout>
                        <UserList/>
                    </AppLayout>
                </UserProvider>
            </AppContainer>
        </ThemeProvider>
    );
};

export default App;