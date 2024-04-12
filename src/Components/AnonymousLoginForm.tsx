import { FC } from "react";
import IAnonymousLoginFormProps from "../Interface/IAnonymousLoginFormProps";

const AnonymousLoginForm: FC<IAnonymousLoginFormProps> = ({onHandleAnonymousLogin}): JSX.Element => {

  return (
    <>
        <div className="flex flex-col">
            <p className="text-center mb-6 italic text-slate-500">Anonymous Logins are enabled, sign in without a user or password!</p>
            <div className="flex justify-center">
              <button 
                className="btn btn-accent mx-1"
                onClick={onHandleAnonymousLogin}>Login</button>
            </div>
          </div>
    </>
  )
}

export default AnonymousLoginForm;
