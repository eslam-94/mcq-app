export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isverified: boolean;
}

export type Record = {
    recordid: string;
    userid: string;
    categoryid: string;
    questionsno: number;
    index: number;
    right: number; 
    wrong: number;
    questionsright: string[];
    questionswrong: string[];
    questionsskipped: string[];
    createdat: number;
    startedat: number | undefined;
    completedat: number | undefined;
    timer: boolean;
    practice: boolean;
}

export type Result = {
    questionsNo: number;
    right: number;
    wrong: number;
    skipped: number;
}

export type RecordOptions = {
    category: string;
    difficulty: string;
    questionsNo: number;
    timer: boolean;
    practice: boolean;
}

export type Category = {
    categoryid: string;
    categoryname: string;
}
export type Quiz = {
    recordid: string;
    categoryid : string;
    questionsno: number;
    index: number;
}

export type Question = {
    questionid: string;
    categoryid?: string;
    question: string;
    answers: string[];
    correctanswer: string;
}