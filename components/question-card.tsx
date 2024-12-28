"use client"
import { Question } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useState } from "react";
import { endQuiz, handleNextQuiz, logAnswer } from "@/lib/actions";
import { toast } from "sonner";
import Timer from "./timer";

export default function QuestionCard({
    data,
    quizId,
    timer,
    practice
}:{
    data: Question[];
    quizId: string;
    timer: boolean;
    practice: boolean;
}) {
    const [index, setIndex] = useState(1);
    const [isAnswered, setIsAnswered] = useState(false);
    const [question, setQuestion] = useState<Question>(data[0]);

    function handleAnswerClick (choice: string) {
        setIsAnswered(true)

        const isCorrect = choice === question.correctanswer
        
        logAnswer(question.questionid, isCorrect, quizId);

        if (!practice) return;

        if (isCorrect) {
            toast.success('Good Job, your answer is correct!')
        } else {
            toast.error('sorry, your answer is wrong!')
        }
    }

    function handleNext () {
        handleNextQuiz(quizId, question.questionid, isAnswered)

        if(data.length > index) {
            setQuestion(data[index])
            setIndex(prev => prev + 1)
            setIsAnswered(false)
        } else {
            // exam end reached goto result
            endQuiz(quizId)
        }
    }

    return (
        <>
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                { timer && <Timer whenEnd={handleNext} keyID={index} /> }
                <p className="leading-7">Question</p>
                <p className="leading-7">{index} / {data.length}</p>
                </div>
            </CardHeader>    
            <CardContent>
                <h1 className="mb-4 scroll-m-20 text-xl font-extrabold tracking-tight lg:text-5xl">
                    {question.question}
                </h1>
                <ToggleGroup disabled={isAnswered} onValueChange={handleAnswerClick} className="flex-col gap-y-3" variant="outline" type="single">
                    {
                        question.answers.map((item, i) => (
                            <ToggleGroupItem 
                            key={`ans-${i}`} 
                            value={item}
                            className="w-[300px]"
                            >
                                {item}
                            </ToggleGroupItem>
                        ))
                    }
                </ToggleGroup>
            </CardContent>
            <CardFooter>
                <Button
                 onClick={handleNext}
                 className="ms-auto"
                 type="button" 
                >Next Question</Button>
            </CardFooter>
        </Card>
        </>
    )
}