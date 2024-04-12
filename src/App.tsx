import { FC, useEffect, useState } from 'react';
import './App.css'
import SignUp from './Pages/SignUp';
import { Routes, Route } from "react-router-dom";
import SignIn from './Pages/SignIn';
import AnswerQuestions from './Pages/AnswerQuestions';

const App: FC = () => {

  const [token, setToken] = useState<any>();

  if(token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    const sessionStorageToken = sessionStorage.getItem("token");
    if(sessionStorageToken) {
      const data = JSON.parse(sessionStorageToken);
      setToken(data);
    }
  }, [])

  return (
    <>
      <div>
        <Routes>
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/"} element={<SignIn setToken={setToken} />} />
          {token ? 
            <Route path={"/answerquestions"} element={<AnswerQuestions />} /> :
            ""
          }

          
        </Routes>
      </div>
    </>
  )
}

export default App


