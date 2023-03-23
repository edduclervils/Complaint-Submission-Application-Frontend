import React, {createContext, CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComplaintSubmissions } from './components/pages/complaint-submissions-page';
import { CreateMeeting } from './components/pages/create-meeting-page';
import { HomePage } from './components/pages/home-page';
import { LogInPage } from './components/pages/Log-In-Page';
import { LogOut } from './components/pages/log-out-page';
import { MeetingsDetails } from './components/pages/meetings-details-page';
import { RegistrationPage } from './components/pages/resgistration-page';
import { ReviewComplaintSpecific } from './components/pages/review-complaint-specific';
import { ReviewComplaintsPage } from './components/pages/review-complaints-page';
import { MeetingsListPage } from './components/pages/meetings-page';
import { NavBar } from './navigation/nav-bar';
import { AboutCouncil } from './components/pages/about-council-page';
import radar from './DBRadar.png'
import './styles.css'
import './fonts/Saiyan-Sans.ttf'
import './fonts/Saiyan-Sans-Left-Oblique.ttf'
import './fonts/Saiyan-Sans-Right-Oblique.ttf'

const style: React.CSSProperties = {margin:"8px"};

export type GlobalStyling = {
  style:React.CSSProperties
  setGlobalStyle: Dispatch<SetStateAction<CSSProperties>>
}

const stylingDefault: GlobalStyling ={
  style:{color:"red"},
  setGlobalStyle: () =>{

  }
}

export const styleContext = createContext(stylingDefault);

const queryClient = new QueryClient();

function App() {
  const [globalStyle,setGlobalStyle] = useState(style);
  return <>

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <styleContext.Provider value={{style:globalStyle,setGlobalStyle:setGlobalStyle}}>
          <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/meetings' element={<MeetingsListPage/>}/>
            <Route path='/meetings/:meetingId' element={<MeetingsDetails/>}/>
            <Route path='/login' element={<LogInPage/>}/>
            <Route path='/register' element={<RegistrationPage/>}/>
            <Route path='/complaints/submit' element={<ComplaintSubmissions/>}/>
            <Route path='/complaints/all' element={<ReviewComplaintsPage/>}/>
            <Route path='/complaints/:complaintId' element={<ReviewComplaintSpecific/>}/>
            <Route path='/logout' element={<LogOut/>}/>
            <Route path='/meetings/create' element={<CreateMeeting/>}/>
            <Route path='/about' element={<AboutCouncil/>}/>
          </Routes>
        </styleContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </>
}

export default App;