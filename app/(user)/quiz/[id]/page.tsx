import { startQuiz } from "@/lib/actions"
import QuestionCard from "@/components/question-card"

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {

    const id = (await params).id
    
    const {isExpired, options, data} = await startQuiz(id)

    if (isExpired || !data) return <p className="my-2 text-center text-lg bg-white">test has already started or database error</p>

    return (
        <>
        <main className="mx-auto p-4 container max-h-screen">
            <p className="my-2 text-center text-lg bg-white">test starts please do not leave the page</p>
            <QuestionCard data={data} quizId={id} timer={options.timer} practice={options.practice}/>
        </main>
       </>
    )
}