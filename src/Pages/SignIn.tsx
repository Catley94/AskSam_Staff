import { FC, useEffect, useState } from "react";
import { supabase } from "../API/SupabaseAPI";
import ISignIn from "../Interface/ISignIn";
import { Link, useNavigate } from "react-router-dom";

const SignIn: FC<any> = ({setToken}): JSX.Element => {

  
  const [formData, setFormData] = useState<ISignIn>({
    email: "",
    password: "",
  });

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
      })

      if(data) {
          console.log("Logged in!");
          console.log(data);
          setToken(data);
          navigateToURL("/answerquestions");
      }

      if(error) {
          console.error(error);
      }
  }

    return (
      <>
        <form onSubmit={onHandleSubmit}>

                <input 
                    className="border-2 border-teal-300 bg-slate-300 text-slate-700 p-2 text-center"
                    placeholder="Email"
                    name="email"
                    onChange={onHandleChange}
                />

                <input 
                    className="border-2 border-teal-300 bg-slate-300 text-slate-700 p-2 text-center"
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={onHandleChange}
                />
                <button
                    className="btn btn-accent" 
                    type="submit"
                    >Submit</button>
                <p>Don't have an account? <Link to={"/signup"}>SignUp</Link></p>
            </form>
      </>
    )
}

export default SignIn;
