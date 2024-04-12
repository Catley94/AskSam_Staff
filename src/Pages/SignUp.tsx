import { FC, useEffect, useState } from "react";
import { supabase } from "../API/SupabaseAPI";
import { Link, useNavigate } from "react-router-dom";
import ISignUp from "../Interface/ISignUp";
import Header from "../Components/Header";

const SignUp: FC = (): JSX.Element => {

    const [formData, setFormData] = useState<ISignUp>({
        fullName: "",
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
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                   full_name: formData.fullName 
                }
            }
          });

        if(error) {
            alert(error);
        } else if(data) {
            document.getElementById("verificationNotification")?.classList.remove("hidden");
        }

    }


    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="mb-10">
                    <Header />
                </div>
                <div id="verificationNotification" role="alert" className="flex alert alert-info m-6 w-1/2 justify-center hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>A verification link has just been sent to your email.</span>
                </div>
                <form
                    className="flex"
                    onSubmit={onHandleSubmit}>
                    <input 
                        className="input mx-1 bg-slate-50 rounded-xl shadow-md shadow-teal-200 p-3 w-1/2 text-center focus:border-2 focus:border-teal-300 focus:outline-none"
                        placeholder="Full name"
                        name="fullName"
                        onChange={onHandleChange}
                    />

                    <input 
                        className="input mx-1 bg-slate-50 rounded-xl shadow-md shadow-teal-200 p-3 w-1/2 text-center focus:border-2 focus:border-teal-300 focus:outline-none"
                        placeholder="Email"
                        name="email"
                        onChange={onHandleChange}
                    />

                    <input 
                        className="input mx-1 bg-slate-50 rounded-xl shadow-md shadow-teal-200 p-3 w-1/2 text-center focus:border-2 focus:border-teal-300 focus:outline-none"
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
                <div><p className="text-center m-3 italic text-slate-500">Don't have an account? <Link to={"/"}><span className="font-semibold">Sign In</span></Link></p></div>
            </div>
        </>
    )
}

export default SignUp;
