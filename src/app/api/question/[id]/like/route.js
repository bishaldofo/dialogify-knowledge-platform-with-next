import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Question from "@/models/Question";


export async function PUT(req, ctx) {
   await db.connect()

   const id = ctx.params.id
   const accessToken = req.headers.get("authorization")
   const token = accessToken.split(" ")[1]
   
   const decodedToken = verifyJwtToken(token)

   if (!accessToken || !decodedToken) {
      return new Response(JSON.stringify({error:"unauthorized (Wrong or expired token)"}), {status: 403})
   }

   try {
      const quest = await Question.findById(id)

      if (quest.likes.includes(decodedToken._id)) {
         quest.likes = quest.likes.filter((id) => id.toString() !== decodedToken._id.toString())
      } else {
         quest.likes.push(decodedToken._id)
      }

      await quest.save()

      return new Response(JSON.stringify({message: "Successfully interacted with the post"}), {status: 200})
   } catch (error) {
      return new Response(JSON.stringify(null), {status: 500})
   }
}