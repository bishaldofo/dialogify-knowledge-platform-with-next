import db from "@/lib/db";
import bcrypt from 'bcrypt'
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
   await db.connect();
   try {
     const users = await User.find();
     return new NextResponse(JSON.stringify(users), { status: 200 });
   } catch (error) {
     return new NextResponse("Error in fetching users" + error, { status: 500 });
   }
};

export async function POST(req) {
   try {
      await db.connect()

      const { username, email, password: pass } = await req.json()
      
      const isExisting = await User.findOne({ email })
      
      if (isExisting) {
         throw new Error("User already exist")
      }

      const hashedPassword = await bcrypt.hash(pass, 8)

      const newUser = await User.create({ username, email, password: hashedPassword })
      
      const { password, ...user } = newUser._doc
      
      return new Response(JSON.stringify(user), {status: 201})
   } catch (error) {
      return new Response(JSON.stringify(error.message), {status: 500})
   }
}