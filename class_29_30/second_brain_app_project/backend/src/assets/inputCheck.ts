import z from "zod";

const usernameSchema = z.string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" });

const passwordSchema = z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

export const signupSigninSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
});

export const usernameOnlySchema = z.object({
    username: usernameSchema,
});


export const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: passwordSchema
});


export const contentSchema = z.object({
    link: z.string().refine(
        (value) => {
            try {
                new URL(value);        // If invalid → throws error
                return true;           // Valid → pass refine
            } catch {
                return false;          // Invalid → fail refine
            }
        },
        {
            message: "Invalid MongoDB URL",
        }
    ),
    type: z.enum(["image", "video", "article", "audio"], { message: "Invalid content type" }),
    title: z.string().min(1, { message: "Title cannot be empty" }),
    tags: z.array(z.string()).optional(), // array of tag titles (strings)
});