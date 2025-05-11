import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3, "username must be atleast 3 character"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "password must be atleast 6 character"),
});

export { signUpSchema }