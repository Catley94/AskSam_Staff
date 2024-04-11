import { FC, useEffect, useState } from "react";
import { supabase } from "../API/SupabaseAPI";
import { Link, useNavigate } from "react-router-dom";
import ISignUp from "../Interface/ISignUp";

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
            <form onSubmit={onHandleSubmit}>
                <input 
                    className="border-2 border-teal-300 bg-slate-300 text-slate-700 p-2 text-center"
                    placeholder="Full name"
                    name="fullName"
                    onChange={onHandleChange}
                />

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

            </form>
            <p>Already have an account? <Link to="/">Login</Link></p>
        </>
    )
}

export default SignUp;
