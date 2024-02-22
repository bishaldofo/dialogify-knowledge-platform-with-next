import db from "@/lib/db";
import { verifyJwtToken, verifyToken } from '@/lib/jwt'
import Question from "@/models/Question";


export async function GET(req) {
   await db.connect()

   try {
      const quest = await Question.find({}).populate("authorId")
      return new Response(JSON.stringify(quest), {status: 200})
   } catch (error) {
      return new Response(JSON.stringify(null), {status: 500})
   }
}

export async function POST(req) {
   await db.connect()

   const accessToken = req.headers.get("authorization")
   const token = accessToken.split(" ")[1]

   const decodedToken = verifyJwtToken(token)
   
   if (!accessToken || !decodedToken) {
      return new Response(JSON.stringify({error:"unauthorized (Wrong or expired token)"}), {status: 403}) 
   }
   try {
      const body = await req.json()
      const newQuest = await Question.create(body)

      return new Response(JSON.stringify(newQuest), {status: 201})
   } catch (error) {
      return new Response(JSON.stringify(null), {status: 500})
   }
}