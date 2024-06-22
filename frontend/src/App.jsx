import { Route, Routes } from 'react-router-dom';
import './App.css'
import { IndexPage } from './pages/IndexPage';
import { CreatorSignIn } from './pages/Creator-Pages/CreatorSignIn';
import Submission from './components/Creator-Components/Submission';
import CompleteSetUp from './pages/Creator-Pages/CompleteSetUp';

function App() {

  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path='/creator/signup' element={<CompleteSetUp />} />
      <Route path='/creator/signin' element={<CreatorSignIn />} />
      <Route path='/test' element={<Submission/>}/>
    </Routes>
  )
}

export default App;
