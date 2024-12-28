"use server"

import jwt, { JwtPayload } from 'jsonwebtoken';
import nodemailer from "nodemailer";
import { createRecordDb, registerUserInDb } from "./db"
import { sql } from "@vercel/postgres"
import { redirect } from "next/navigation"
import { Question, RecordOptions, Record } from "./types"
import { signupFormSchema } from "./zod/schema"
import { auth, signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

export async function sendVerifyEmail(email: string) {
    try {
        const payload = { email }; // Add user ID or other relevant data

        const secret = process.env.AUTH_SECRET ?? ""

        const token = jwt.sign(payload, secret, { expiresIn: '24h' });

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
            user: process.env.EMAIL_PROVIDER,
            pass: process.env.EMAIL_PROVIDER_PASS
            }
        });
        
        const mailContent = {    
            from: process.env.EMAIL_PROVIDER,
            to: email,
            subject: "Verfiy Your Email",
            text: `
                You have requested to verfiy your email.
                If you requested this reset, click the link below to verfiy your email:
                https://course-app-one.vercel.app/verfication?token=${token}
                If you didn't request to vervify email, please ignore this email.
            `,
            //html: "<p>HTML version of the message</p>",
        };

        await transporter.sendMail(mailContent)

    } catch {
        throw new Error("failed to send email");
    }
}



export async function verifyJwt(token: string) {
    try {
        const decoded  = jwt.verify(token, process.env.AUTH_SECRET ?? "") as JwtPayload

        await sql`
            UPDATE users SET isVerified=${true} WHERE email=${decoded.email}
        `

        return `you have verified your email successfully \n ${decoded.email}`

    } catch {
        return "check your link or Link is expired"
    }
}

export async function signUpNewUser(formData: unknown) {
    try {
        const result = signupFormSchema.safeParse(formData);

        if (!result.success) throw new Error("data validation failed");

        const {name, email, password, verfiy} = result.data
        
        //save account unverifed
        await registerUserInDb(name, email, password, !verfiy)

        if (verfiy) await sendVerifyEmail(email);

    } catch (error) {
        if (error instanceof Error) return error.message;
    }
}

export async function authenticate(values: {email: string; password: string}) {
    try {
        await signIn('credentials', values);
    } catch (error) {
        if (error instanceof AuthError) return error.cause;
        throw error; //to redirect
    }
}

export async function logOut() {
    await signOut()
    redirect('/')
}

export async function createQuizAction(formData: FormData) {
    //todo should check for auth
    //todo zod validation
    const options: RecordOptions = {
        category: formData.get("category") as string,
        difficulty: formData.get("difficulty") as string,
        questionsNo: parseInt(formData.get("questionsNo") as string),
        timer: !!formData.get("timer"),
        practice: !!formData.get("practice"),
    }

    const record = await createRecordDb(options)

    redirect(`/quiz/${record?.recordid}`)
}

export async function startQuiz(id: string) {
    try {
        
        const session = await auth()
        
        const isAuthenticated = !!session?.user;

        if (!isAuthenticated) throw new Error("authentication failed");

        const record = await sql<Record>`
          SELECT * FROM records WHERE recordId=${id};
        `;

        if (record.rows[0].startedat) return {isExpired: true};

                
        const isAuthorized = session.user?.id === record.rows[0].userid || session.user?.role === "admin";
        
        if (!isAuthorized) throw new Error("authorization failed");
        
        await sql`
          UPDATE records SET startedAt=NOW(), index=1, "right"=0, wrong=0 WHERE recordId=${id}
        `
        const result = await sql<Question>`
            SELECT questionId, question, answers, correctAnswer FROM questions 
            WHERE categoryId=${record.rows[0].categoryid} ORDER BY RANDOM() LIMIT ${record.rows[0].questionsno};
        `
        console.log("Database: quiz started Successfully.");
        
        return {isExpired: false, options: {timer: record.rows[0].timer, practice: record.rows[0].practice}, data: result.rows}
    } catch (error) {
        console.log("Database Error: Failed to start quiz.",error);
        return {isExpired: true}
    }
}

export async function logAnswer(questionId: string, isCorrect: boolean, recordId: string) {
    try {
        if (isCorrect) {
            await sql`
            UPDATE records SET "right"="right"+1, index=index+1, questionsright=array_append(questionsright, ${questionId}) WHERE recordId=${recordId}
            `;   
        } else {
            await sql`
            UPDATE records SET wrong=wrong+1, index=index+1, questionswrong=array_append(questionswrong, ${questionId}) WHERE recordId=${recordId}
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function handleNextQuiz(recordId: string, questionId: string, isAnswered: boolean) {
    try {
        if (!isAnswered) {
            await sql`
            UPDATE records SET questionsSkipped=array_append(questionsSkipped, ${questionId}) WHERE recordId=${recordId}
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function endQuiz(recordId: string) {
    try {        
        await sql`
        UPDATE records SET completedAt=NOW() WHERE recordId=${recordId}
        `;
    } catch (error) {
        console.log(error);
    }
    redirect(`/result/${recordId}`)
}
