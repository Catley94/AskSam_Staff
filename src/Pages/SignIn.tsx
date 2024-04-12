import { FC, useEffect, useState } from "react";
import { supabase } from "../API/SupabaseAPI";
import ISignIn from "../Interface/ISignIn";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";

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
            <div>
            <form 
              className="flex"
              onSubmit={onHandleSubmit}>

                    <input 
                        className="input mx-1 bg-slate-50 rounded-xl shadow-md shadow-teal-200 p-3 w-1/2 text-center focus:border-2 focus:border-teal-300 focus:outline-none"
                        placeholder="Email"
                        name="email"
                        onChange={onHandleChange}
                    />

                    <input 
                        className="input mx-1  bg-slate-50 rounded-xl shadow-md shadow-teal-200 p-3 w-1/2 text-center focus:border-2 focus:border-teal-300 focus:outline-none"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={onHandleChange}
                    />
                    <button
                        className="btn btn-accent mx-1" 
                        type="submit"
                        >Submit</button>
            </form>
            <div><p className="text-center m-3 italic text-slate-500">Don't have an account? <Link to={"/signup"}><span className="font-semibold">Sign Up</span></Link></p></div>
          </div> :
          <div className="flex flex-col">
            <p className="text-center mb-6 italic text-slate-500">Anonymous Logins are enabled, sign in without a user or password!</p>
            <div className="flex justify-center">
              <button 
                className="btn btn-accent mx-1"
                onClick={onHandleAnonymousLogin}>Login</button>
            </div>
          </div>


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

