import { z } from 'zod';
import express from "express";

const app = express();
app.use(express.json()); // Important for req.body

// Schema
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.put("/user", (req, res) => {
  const result = userProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "User update error, provide valid data",
      errors: result.error.issues
    });
  }

  const updateBody: FinalUserSchema = result.data;

  res.json({
    message: "User updated successfully",
    data: updateBody
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
