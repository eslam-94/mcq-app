"use client"

import { z } from "zod"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { authenticate } from "@/lib/actions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast } from "sonner";

export default function Login() {

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof loginFormSchema>) {

        const res = await authenticate(values)

        if (typeof res === 'string') return toast.error(res);
    }

    return (
        <>
        <Card>
            <CardHeader/>    
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                         control={form.control}
                         name="email"
                         render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                         )}
                        />
                        <FormField
                         control={form.control}
                         name="password"
                         render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                         )}
                        />

                        <Button disabled={form.formState.isSubmitting} type="submit">Log In</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div className="grid auto-rows-auto grid-cols-2 items-center">
                    <p>Admin Email</p>
                    <div className="text-lg font-semibold">admin@mcq.com</div>
                    <p>Admin Password</p>
                    <div className="text-lg font-semibold">admin1</div>
                </div>
            </CardFooter>
        </Card>
        </>
    )
}