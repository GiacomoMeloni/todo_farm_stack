import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Login } from './components/auth/login';
import { Register } from './components/auth/register'
import { AuthProvider, AuthConsumer } from './context/jwtAuthContext';
import { Flex, Spinner } from '@chakra-ui/react';
import { PublicRoute } from './components/auth/PublicRoute';
import { Authenticated } from './components/auth/authenticated';
import { ToDoList } from './components/ToDo/ToDoList';
import { NavBar } from './components/navbar/navbar';
import { ToDoDetail } from './components/ToDo/ToDoDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthConsumer>
          {(auth) => 
            !auth.isInitialized ? (
            <Flex
              height="100vh"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="green.200"
                color="green.500"
                size="xl"
              />
            </Flex>
          ) : (
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login/>
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register/>
              </PublicRoute>
            } 
          />
          <Route path='/' element= {<NavBar />}>
            <Route 
              path="/" 
              element={
                <Authenticated>
                  <ToDoList />
                </Authenticated>
              }
            />
            <Route 
              path="/:todoId" 
              element={
                <Authenticated>
                  <ToDoDetail />
                </Authenticated>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
          )
        }
        </AuthConsumer>
      </Router>
    </AuthProvider>
  );
}

export default App;
