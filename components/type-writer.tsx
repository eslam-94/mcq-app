"use client"

import { TypeAnimation } from "react-type-animation";

export default function TypeWriter() {
    return (
        <>
        <h1 className="mb-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
            Boost Your Learning with Interactive MCQs
        </h1 >

        <TypeAnimation
            className="mb-5 min-h-20 text-center text-3xl text-muted-foreground"
            sequence={[
                ' Our platform offers a dynamic and engaging way to test your knowledge and improve your understanding.', // initially rendered starting point
                1000,
            ]}
            wrapper="p"
            speed={25}
        />
        </>
    )
}