import { FC } from "react";
import QuestionObj from "../Interface/QuestionObj";

const AnsweredQuestion: FC<QuestionObj> = ({ id, question, answer }): JSX.Element => {

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
              <h3 className="font-bold text-teal-500 text-lg pb-6">{answer}</h3>
              <div className="modal-action flex justify-center">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn border-2 border-teal-300 bg-slate-100 hover:bg-white hover:border-teal-300">Close</button>
                </form>
              </div>
            </div>
          </dialog>
    </>
  )
}

export default AnsweredQuestion;
