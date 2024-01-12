"use client";

import Nav from '@components/nav/Nav';
import { ReduxProvider } from '@redux/features/provider';
import "../styles/globals.scss"
import ProtectedRoute from '@components/services/protectedRoutes';
import { Sidebar } from '@components/sidebar/sidebar';
import MainPage from './mainPage';

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <ReduxProvider>
          <main className='app'>
            <Nav />
            <ProtectedRoute>
              <MainPage>
                {children}
              </MainPage>
              {/* <div className='sidebar'>
                <Sidebar />
              </div>
              <div className='app-content'>
                {children}
              </div> */}
            </ProtectedRoute>
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}

export default RootLayout