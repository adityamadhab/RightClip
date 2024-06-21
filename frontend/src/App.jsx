import { Route, Routes } from 'react-router-dom';
import './App.css'
import { IndexPage } from './pages/IndexPage';
import { CreatorSignUp } from './pages/Creator-Pages/CreatorSignUp';
import { CreatorSignIn } from './pages/Creator-Pages/CreatorSignIn';
import SetUpStep2 from './components/Creator-Components/SetUpStep2';
import SetUpStep3 from './components/Creator-Components/SetUpStep3';
import SetUpStep4 from './components/Creator-Components/SetUpStep4';
import Submission from './components/Creator-Components/Submission';

function App() {

  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path='/creator/signup' element={<CreatorSignUp />} />
      <Route path='/creator/signin' element={<CreatorSignIn />} />
      <Route path='/test' element={<Submission/>}/>
    </Routes>
  )
}

export default App;
