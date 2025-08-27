import dbConnect from '@/lib/db';
import { SignupFormSchema, FormState } from '@/lib/definitions'
import bcrypt from 'bcryptjs';
import User from '@/models/userModel'
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // Call the provider or db to create a user...
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);
 
  // 3. Insert the user into the database or call an Auth Library's API
  await dbConnect();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { message: "User already exists with this email." };
  }
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return { message: "Error creating user." };
  }
 
  // TODO:
  // 4. Create user session
  // 5. Redirect user
}