import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const signupFormSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters"
    }),
    email: z.string().email(),
    password: z.string().min(6, {
        message: "password must be at least 6 characters"
    }).regex(/.*\d.*/, {
        message: "password must contains a number"
    }).max(10, {
        message: "password must be at most 10 characters"
    }),
    confirm: z.string(),
    verfiy: z.boolean(),
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
});