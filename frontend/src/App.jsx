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

axios.defaults.baseURL = "http://localhost:3000/api/v1";

function App() {

  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path='/creator/signup' element={<CompleteSetUp />} />
      <Route path='/creator/signin' element={<CreatorSignIn />} />
      <Route path='/business/signup' element={<BusinessSignUp />} />
      <Route path='/business/signin' element={<BusinessSignIn />} />
      <Route path='/business/success' element={<Sucess />} />
      <Route path='/business/dashboard' element={<BusDashborad />} />
      <Route path='/business/templates' element={<BusTemplates />} />
      <Route path='/business/ratings' element={<Ratings />} />
      <Route path='/business/rewards' element={<Rewards/>} />
      <Route path='/business/notification' element={<Notification/>} />
      <Route path='/business/inbox' element={<Inbox/>} />
      <Route path='/business/logout' element={<Logout/>} />
      <Route path='/test' element={<Submission />} />
    </Routes>
  )
}

export default App;
