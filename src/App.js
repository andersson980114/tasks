 
import './App.css';

import {Routes, route, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'

import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { PrivateRouter } from './components/PrivateRouter';
import { Project } from './components/projects/Project';
import { ListProjects } from './components/projects/ListProjects';
import { Task } from './components/projects/Task';



function App() {
  return (
    <AuthProvider>
        <Routes>

          <Route path='/' element={
            <PrivateRouter>
              <Home/>
            </PrivateRouter> 
          }/>
          <Route path='/lprojects' element={
            <PrivateRouter>
              <ListProjects/>
            </PrivateRouter>
          }/>

          <Route path='/task/:taskId' element={ 
            <PrivateRouter>
              <Task/> 
            </PrivateRouter>

          }/>
          <Route path='/project/:projectId' element={ 
            <PrivateRouter>
              <Project/> 
            </PrivateRouter>

          }/>
          
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          
        </Routes>
    </AuthProvider>
  );
}

export default App;
