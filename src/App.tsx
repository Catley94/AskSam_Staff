import { Dispatch, FC, useEffect, useState } from 'react'
import './App.css'
import Question from './Components/Question';
import QuestionObj from './Interface/QuestionObj';
import AnsweredQuestion from './Components/AnsweredQuestion';
// import QuestionObj from './Interface/QuestionObj';

const App: FC = () => {

  /*
    App Flow:
    Staff Loads the page
      React Sends GET request to server to receive all qusetions
      React populates two collapsable lists
        Answered Questions (Collapsed)
        Unanswered Questions (Uncollapsed)
    
    User clicks on question in Unanswered question
      React displays a modal with the question on the top half and empty answer field and "Save" button on the bottom
      When user populates answer and clicks save
        React sends PUT request with question and answer to DB

  */


  const header: string = "Ask Sam";
  
  const [answeredQuestions, setAnweredQuestions]: [QuestionObj[] | undefined, Dispatch<QuestionObj[] | undefined>] = useState<QuestionObj[]>();
  const [unansweredQuestions, setUnansweredQuestions]: [QuestionObj[] | undefined, Dispatch<QuestionObj[] | undefined>] = useState<QuestionObj[]>();


  useEffect(() => {
    populateQuestionsFromAPI();
  }, []); // The empty array ensures this effect runs only on initial render


  const populateQuestionsFromAPI = async (): Promise<void> => {

    await fetchAllQuestions()
      .then((questions) => {
        const answeredQuestions: QuestionObj[] = [];
        const unansweredQuestions: QuestionObj[] = [];
        questions?.forEach(question => {
          if(question.answered) answeredQuestions.push(question);
          if(!question.answered) unansweredQuestions.push(question);
        })
        setUnansweredQuestions(unansweredQuestions);
        setAnweredQuestions(answeredQuestions.reverse());
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const fetchAllQuestions = async (): Promise<QuestionObj[] | null> => {

    let _questionList: QuestionObj[] = [];

    const response = await fetch(`http://localhost:5125/questions/allquestions`, {
      method: "GET"
    })
    await response.json()
    .then((_questions) => {
      _questionList = _questions;
    })
    .catch((error) => {
      console.error("Error fetching question list: ", error);
    })
    return _questionList;
  }

  function handleSave(updatedQuestion: QuestionObj) {
    const data = {
      // clientGuid: Cookies.get(cookieClientId),
      answered: updatedQuestion.answered,
      question: updatedQuestion.question,
      answer: updatedQuestion.answer,
      type: "General"
    }

    putDataToAPI(`http://localhost:5125/questions/${updatedQuestion.id}`, data)
      .then(() => {
        populateQuestionsFromAPI(); //Populates the question list
      })

    console.log("onSave: Question");
    console.log(updatedQuestion);
  }

  const putDataToAPI = async (url = "", data = {}): Promise<object> => {
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  return (
    <>
      <div id="askSamContainer" className="text-center py-12 bg-slate-200 text-slate-600">
          <h1 className="text-4xl font-semibold ">{header}</h1>
          <div className="flex bg-white rounded-xl mx-auto m-6 shadow-md max-w-3xl">  
          </div>
          <div className="flex justify-center">
            <div className="px-3">
              <div className="collapse collapse-open collapse-arrow bg-white text-center">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-xl font-medium">
                    Unanswered Questions
                    </div>
                    <div className="collapse-content"> 
                    <ul className="shadow-md rounded-xl mx-auto max-w-lg flex flex-col">
                      {unansweredQuestions !== undefined && unansweredQuestions?.map((question, i) => <Question {...question} key={i} onSave={handleSave} />)}
                    </ul>
                    </div>
                  </div>
                
            </div>
            <div className="px-3">
                <div className="collapse collapse-arrow bg-slate-300 text-center">
                  <input type="checkbox" /> 
                  <div className="collapse-title text-xl font-medium">
                  Answered Questions
                  </div>
                  <div className="collapse-content"> 
                    <ul className="shadow-md rounded-xl mx-auto max-w-lg flex flex-col">
                      {answeredQuestions !== undefined && answeredQuestions?.map((question, i) => <AnsweredQuestion {...question}  key={i} />)}
                    </ul>
                  </div>
                </div>
            </div>
          </div>
          
          
      </div>
    </>
  )
}

export default App


