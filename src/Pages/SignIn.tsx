import { FC, useEffect, useState } from "react";
import { supabase } from "../API/SupabaseAPI";
import ISignIn from "../Interface/ISignIn";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import LoginForm from "../Components/LoginForm";
import AnonymousLoginForm from "../Components/AnonymousLoginForm";

const SignIn: FC<any> = ({setToken}): JSX.Element => {

  
  const [formData, setFormData] = useState<ISignIn>({
    email: "",
    password: "",
  });

  const anonymousSignInEnabled = true;

  const navigateToURL = useNavigate();
  
  useEffect(() => {
    if(sessionStorage.getItem("token")) {
      navigateToURL("/answerquestions");
    }
  },[])

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData((prevFormData) => {
          return {
              ...prevFormData,
              [event.target.name]: event.target.value
          }
      })
  }

  const onHandleSubmit = async(event: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const { data, error }: any = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      checkIfLoginWasSuccessful(error, data, setToken, navigateToURL); 
      
  }

  const onHandleAnonymousLogin = async (): Promise<void> => {
      const { data, error } = await supabase.auth.signInAnonymously();
      checkIfLoginWasSuccessful(error, data, setToken, navigateToURL);  
  }

    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="mb-10">
            <Header />
          </div>
          {!anonymousSignInEnabled ?
            <LoginForm onHandleSubmit={onHandleSubmit} onHandleChange={onHandleChange} /> :
            <AnonymousLoginForm onHandleAnonymousLogin={onHandleAnonymousLogin} />
          }
          
        </div>
      </>
    )
}

function checkIfLoginWasSuccessful(error: any, data: any, setToken: any, navigateToURL: any) {
  if (error) {
    alert(error);
  } else if (data) {
    console.log("Logged in!");
    console.log(data);
    setToken(data);
    navigateToURL("/answerquestions");
  }
}

export default SignIn;

