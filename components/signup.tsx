"use client"

import { z } from "zod";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useForm } from "react-hook-form";
import { signUpNewUser } from "@/lib/actions";
import { signupFormSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

export default function Signup() {
    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
        name: "",
        email: "",
        password: "",
        confirm: "",
        verfiy: false,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(formData: z.infer<typeof signupFormSchema>) {
        const promise = () => new Promise(async (resolve, reject) => {
            const res = await signUpNewUser(formData)
            return !res ? resolve("resolve") : reject(res)
        });

        toast.promise(promise, {
        loading: 'Submitting your request...',
        success: () => {
            form.reset()
            return "You have registerd successfully try to login"
        },
        error: (res) => res ,
        });
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
                         name="name"
                         render={({ field }) => (
                            <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                                <Input placeholder="enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                         )}
                        />
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
                        <FormField
                         control={form.control}
                         name="confirm"
                         render={({ field }) => (
                            <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="renter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                         )}
                        />
                        <FormField
                         control={form.control}
                         name="verfiy"
                         render={({ field }) => (
                            <FormItem className="flex items-center gap-1 rounded-lg border p-3 shadow-sm space-y-0">
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <Label htmlFor="verfiy">Verify Email ? we will send you an email</Label>
                            </FormItem>
                         )}
                        />
                        <Button type="submit">Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter/>
        </Card>
        </>
    )
}