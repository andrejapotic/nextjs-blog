import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(30, "Name must be at most 30 characters long"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(30, "Password must be at most 300 characters long"),
})

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6).max(30),
})