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
import { OrderSetup } from './pages/AdminPages/OrderSetup';
import AcceptAss from './components/Creator-Components/Assignment/AcceptAss';
import { ActiveAssigmnets } from './pages/BusinessPages/ActiveAssignments';
import { PendingAssigmnets } from './pages/BusinessPages/PendingAssignments';
import { BusReviewPage } from './pages/BusinessPages/BusReviewPage';
import { CompletedAssigmnets } from './pages/BusinessPages/CompletedAssignments';
import { UnderConstruction } from './components/IndexPage-Components/UnderConstruction';
import OTPVerification from './pages/BusinessPages/OtpVerficationPage';
import { BusForgotPassword } from './pages/BusinessPages/BusinessForgetPass';
import CreOTPVerification from './pages/Creator-Pages/CreOtpVerification';
import { CreForgotPassword } from './pages/Creator-Pages/CreForgotPassPage';
import { ChatWindow } from './components/Business-Components/Inbox/ChatWindow';
import { MessagingPage } from './pages/Creator-Pages/Messaging';
import { MessageWindow } from './components/Creator-Components/Message/MessageWindow';
import { BusPayments } from './pages/BusinessPages/BusPayments';
import { BusinessPayments } from './pages/AdminPages/BusinessPayments';
import { CrePaymentsPage } from './pages/Creator-Pages/CrePayments';
import { CreatorPayments } from './pages/AdminPages/CreatorPayments';
import { CreNotification } from './pages/Creator-Pages/CreNotification';

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
      <Route path='/underconstruction' element={<UnderConstruction />} />
      <Route path='/creator/signup' element={<CompleteSetUp />} />
      <Route path='/creator/signin' element={<CreatorSignIn />} />
      <Route path='/creator/verify-otp' element={<CreOTPVerification />} />
      <Route path='/creator/forgot-password' element={<CreForgotPassword />} />
      <Route path='/creator/submit' element={<Submission />} />
      <Route path='/creator/dashboard' element={<CreDashborad />} />
      <Route path='/creator/assignment' element={<CreAssigment />} />
      <Route path='/creator/assignment/accept' element={<AcceptAss />} />
      <Route path='/creator/assignment/timelines' element={<CreAssTimelines />} />
      <Route path='/creator/inbox' element={<MessagingPage />} />
      <Route path='/creator/inbox/:businessId' element={<MessageWindow />} />
      <Route path='/creator/payment' element={<CrePaymentsPage />} />
      <Route path='/creator/notification' element={<CreNotification />} />
      <Route path='/creator/logout' element={<CreLogout />} />
      <Route path='/business/signup' element={<BusinessSignUp />} />
      <Route path='/business/signin' element={<BusinessSignIn />} />
      <Route path='/business/forgot-password' element={<BusForgotPassword />} />
      <Route path='/business/verify-otp' element={<OTPVerification />} />
      <Route path='/business/success' element={<Sucess />} />
      <Route path='/business/dashboard' element={<BusDashborad />} />
      <Route path='/business/dashboard/active' element={<ActiveAssigmnets />} />
      <Route path='/business/dashboard/pending' element={<PendingAssigmnets />} />
      <Route path='/business/dashboard/review' element={<BusReviewPage />} />
      <Route path='/business/dashboard/completed' element={<CompletedAssigmnets />} />
      <Route path='/business/payment' element={<BusPayments />} />
      <Route path='/business/createproject' element={<BusProject />} />
      <Route path='/business/rewards' element={<Rewards />} />
      <Route path='/business/notification' element={<Notification />} />
      <Route path='/business/inbox' element={<Inbox />} />
      <Route path='/business/inbox/:creatorId' element={<ChatWindow />} />
      <Route path='/business/logout' element={<Logout />} />
      <Route path='/admin' element={<AdminSignIn />} />
      <Route path='/admin/dashboard' element={<AdminDashborad />} />
      <Route path='/admin/ordersetup' element={<OrderSetup />} />
      <Route path='/admin/dashboard/ongoing' element={<OngoingProject />} />
      <Route path='/admin/dashboard/completed' element={<CompletedProject />} />
      <Route path='/admin/dashboard/pending' element={<PendingProject />} />
      <Route path='/admin/dashboard/review' element={<ReviewProjects />} />
      <Route path='/admin/creator/pending' element={<PendingRequest />} />
      <Route path='/admin/creator/pending/:id' element={<AdCreCV />} />
      <Route path='/admin/creator/assign' element={<AssignCreator />} />
      <Route path='/admin/payment/business' element={<BusinessPayments />} />
      <Route path='/admin/payment/creator' element={<CreatorPayments />} />
      <Route path='/admin/messaging' element={<Messaging />} />
      <Route path='/admin/notification' element={<AdNotifications />} />
      <Route path='/admin/logout' element={<AdminLogout />} />
    </Routes>
  )
}

export default App;
