import { FC, useState } from "react";
import QuestionObj from "../Interface/QuestionObj";

const Question: FC<QuestionObj> = ({ id, question, answer, onSave, ...props }): JSX.Element => {


  const [updatedAnswer, setUpdatedAnswer] = useState(answer);


  // Function to handle the save action
  const handleSaveClick = () => {
    // Create an updated question object
    const updatedQuestion = {
      ...props, // Spread other properties
      id,
      question,
      answer: updatedAnswer, // Use the updated answer
      answered: true
    };

    // Call the onSave prop with the updated question object
    onSave && onSave(updatedQuestion);
    clearFields();
  };

  const clearFields = () => {
      // document.getElementById
      setUpdatedAnswer("");
      // props.answer = answer;
  }

  return (
    <>
        {/* <li className="p-2 shadow-md rounded-xl">
            <div>{props.question}</div>
            <div v-if="question.answer.length > 0" className="text-teal-500 font-semibold">{props.answer}</div>
        </li> */}
        <button className="btn text-slate-500 bg-slate-200 hover:shadow-teal-300 hover:border-teal-300 hover:shadow-sm hover:bg-white" onClick={()=>{
          //@ts-expect-error showModal isn't expected on HTML Element, however it's imported through DaisyUI
        return document.getElementById(`${"modal_" + id}`)?.showModal();
      }}>{question}</button>
          <dialog id={"modal_" + id} className="modal modal-middle">
            <div className="modal-box bg-slate-200">
              <h3 className="font-bold text-lg pb-6">{question}</h3>
              {/* <p className="py-4">{props.question}</p> */}
              <textarea 
                id={"textarea_" + id.toString()} 
                className="text-center py-6 px-3 rounded bg-white focus:border-teal-300 border-2 outline-none w-11/12" 
                placeholder="Input answer here"
                value={updatedAnswer}
                onChange={(event) => {
                  setUpdatedAnswer(event.target.value);
                }}
                
                ></textarea>
              <div className="modal-action flex justify-center">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn mx-3 border-2 border-teal-300 bg-slate-100 hover:bg-white hover:border-teal-300" onClick={handleSaveClick}>Save and Close</button>
                  <button className="btn border-2 border-teal-300 bg-slate-100 hover:bg-white hover:border-teal-300" onClick={clearFields}>Close</button>
                </form>
              </div>
            </div>
          </dialog>
    </>
  )
}

export default Question;
