interface QuestionObj {
    id: number,
    answered: boolean,
    question: string,
    answer: string,
    dateCreated: string,
    dateUpdated: string,
    onSave?: (updatedQuestion: QuestionObj) => void;
}

export default QuestionObj;