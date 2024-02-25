import db from "@/lib/db";
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