import { Route, Routes } from 'react-router-dom';
import './App.css'
import { IndexPage } from './pages/IndexPage';
import { CreatorSignIn } from './pages/Creator-Pages/CreatorSignIn';
import Submission from './components/Creator-Components/Submission';
import CompleteSetUp from './pages/Creator-Pages/CompleteSetUp';
import BusinessSignUp from './pages/BusinessPages/BusinessSignUp';
import { BusinessSignIn } from './pages/BusinessPages/BusinessSignIn';
import axios from 'axios';
import Sucess from './components/Business-Components/Sucess';
import { BusDashborad } from './pages/BusinessPages/Dashborad';
import { BusTemplates } from './pages/BusinessPages/Templates';
import { Ratings } from './pages/BusinessPages/Ratings';
import { Rewards } from './pages/BusinessPages/Rewards';
import { Notification } from './pages/BusinessPages/Notification';
import { Inbox } from './pages/BusinessPages/Inbox';
import { Logout } from './pages/BusinessPages/Logout';
import { AdminSignIn } from './pages/AdminPages/AdminSignin';
import { AdminDashborad } from './pages/AdminPages/DashBoard';
import { Messaging } from './pages/AdminPages/Messaging';
import { AdNotifications } from './pages/AdminPages/AdNotifications';
import { AdminLogout } from './pages/AdminPages/AdminLogout';
import { CreDashborad } from './pages/Creator-Pages/Dashboard';
import { CreAssigment } from './pages/Creator-Pages/Assignment';
import CreAssTimelines from './components/Creator-Components/Assignment/Timelines';
import { OngoingProject } from './pages/AdminPages/OngoingProject';
import { CompletedProject } from './pages/AdminPages/CompletedProject';
import { PendingProject } from './pages/AdminPages/PendingProject';
import { PendingRequest } from './pages/AdminPages/PendingRequest';

axios.defaults.baseURL = "http://localhost:3000/api/v1";

function App() {

  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path='/creator/signup' element={<CompleteSetUp />} />
      <Route path='/creator/signin' element={<CreatorSignIn />} />
      <Route path='/creator/dashboard' element={<CreDashborad/>} />
      <Route path='/creator/assignment' element={<CreAssigment/>} />
      <Route path='/creator/assignment/timelines' element={<CreAssTimelines/>} />
      <Route path='/creator/submit' element={<Submission />} />
      <Route path='/business/signup' element={<BusinessSignUp />} />
      <Route path='/business/signin' element={<BusinessSignIn />} />
      <Route path='/business/success' element={<Sucess />} />
      <Route path='/business/dashboard' element={<BusDashborad />} />
      <Route path='/business/templates' element={<BusTemplates />} />
      <Route path='/business/ratings' element={<Ratings />} />
      <Route path='/business/rewards' element={<Rewards />} />
      <Route path='/business/notification' element={<Notification />} />
      <Route path='/business/inbox' element={<Inbox />} />
      <Route path='/business/logout' element={<Logout />} />
      <Route path='/admin' element={<AdminSignIn />} />
      <Route path='/admin/dashboard' element={<AdminDashborad />} />
      <Route path='/admin/dashboard/ongoing' element={<OngoingProject />} />
      <Route path='/admin/dashboard/completed' element={<CompletedProject />} />
      <Route path='/admin/dashboard/pending' element={<PendingProject />} />
      <Route path='/admin/creator/pending' element={<PendingRequest />} />
      <Route path='/admin/messaging' element={<Messaging />} />
      <Route path='/admin/notification' element={<AdNotifications />} />
      <Route path='/admin/logout' element={<AdminLogout />} />
      
    </Routes>
  )
}

export default App;
