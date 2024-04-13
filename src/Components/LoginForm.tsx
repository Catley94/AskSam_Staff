import { FC } from "react";
import { Link } from "react-router-dom";
import ILoginFormProps from "../Interface/ILoginFormProps";

const LoginForm: FC<ILoginFormProps> = ({onHandleSubmit, onHandleChange}): JSX.Element => {

  return (
    <>
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
            <div><p className="text-center m-3 italic text-slate-500 hover:text-teal-500">Don't have an account? <Link to={"/signup"}><span className="font-semibold">Sign Up</span></Link></p></div>
          </div>
    </>
  )
}

export default LoginForm;
