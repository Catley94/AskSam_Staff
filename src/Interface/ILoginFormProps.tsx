import { ChangeEvent } from "react";

interface ILoginFormProps {
    onHandleSubmit: (event: ChangeEvent<HTMLFormElement>) => Promise<void>; onHandleChange: (event: ChangeEvent<HTMLInputElement>) => void; 
}

export default ILoginFormProps;