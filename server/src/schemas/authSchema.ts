import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be  at least 6 characters"),
    role: z.enum(["user", "admin"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be 'admin', or 'user'",
    })
    .optional()
    .default("admin"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password required"),
});