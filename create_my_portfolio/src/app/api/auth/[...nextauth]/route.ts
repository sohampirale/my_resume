import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "@/lib/connectDB"
import { User } from "@/models"
import { authOptions } from "@/lib/authOptions";




const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}