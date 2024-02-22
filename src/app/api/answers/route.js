import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import AnswerModal from "@/models/AnswerModal";

export async function POST(req){
   await db.connect()

   const accessToken = req.headers.get('authorization')
   const token = accessToken.split(" ")[1]

   const decodedToken = verifyJwtToken(token)

   if (!accessToken || !decodedToken) {
       return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
   }

   try {
      const body = await req.json()
      
      let newAnswer = await AnswerModal.create(body)
      newAnswer = await newComment.populate('authorId')

      return new Response(JSON.stringify(newAnswer), {status: 201})
   } catch (error) {
       return new Response(JSON.stringify(null), {status: 500})
   }
} 