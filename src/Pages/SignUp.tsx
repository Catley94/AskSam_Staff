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

        if(data) {
            console.log("Check your email for verification link");
            console.log(data);
        }

        if(error) {
            console.error(error);
        }
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="mb-10">
                    <Header />
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
