import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { CreLogout } from './pages/Creator-Pages/CreLogout';
import { AdCreCV } from './pages/AdminPages/AdCreCV';
import { AssignCreator } from './pages/AdminPages/AssignCreator';
import { BusProject } from './pages/BusinessPages/BusProject';
import { useEffect } from 'react';
import { ReviewProjects } from './pages/AdminPages/ReviewProjects';
import { OrderPage } from './pages/BusinessPages/OrderPage';

axios.defaults.baseURL = "http://localhost:3000/api/v1";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const busToken = localStorage.getItem('BusToken');
    const creToken = localStorage.getItem('CreToken');
    const adminToken = localStorage.getItem('AdminToken');
    
    if (busToken) {
      navigate('/business/dashboard');
    } else if (creToken) {
      navigate('/creator/dashboard');
    } else if (adminToken) {
      navigate('/admin/dashboard');
    }
  }, []);
  

  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path='/creator/signup' element={<CompleteSetUp />} />
      <Route path='/creator/signin' element={<CreatorSignIn />} />
      <Route path='/creator/dashboard' element={<CreDashborad/>} />
      <Route path='/creator/assignment' element={<CreAssigment/>} />
      <Route path='/creator/assignment/timelines' element={<CreAssTimelines/>} />
      <Route path='/creator/submit' element={<Submission />} />
      <Route path='/creator/logout' element={<CreLogout />} />
      <Route path='/business/signup' element={<BusinessSignUp />} />
      <Route path='/business/signin' element={<BusinessSignIn />} />
      <Route path='/business/success' element={<Sucess />} />
      <Route path='/business/dashboard' element={<BusDashborad />} />
      <Route path='/business/order' element={<OrderPage />} />
      <Route path='/business/createproject' element={<BusProject />} />
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
      <Route path='/admin/dashboard/review' element={<ReviewProjects />} />
      <Route path='/admin/creator/pending' element={<PendingRequest />} />
      <Route path='/admin/creator/pending/:id' element={<AdCreCV />} />
      <Route path='/admin/creator/assign' element={<AssignCreator />} />
      <Route path='/admin/messaging' element={<Messaging />} />
      <Route path='/admin/notification' element={<AdNotifications />} />
      <Route path='/admin/logout' element={<AdminLogout />} />
      
    </Routes>
  )
}

export default App;
