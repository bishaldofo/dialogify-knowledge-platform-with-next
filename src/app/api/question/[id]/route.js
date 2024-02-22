import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Question from "@/models/Question";
import User from "@/models/User";

export async function GET(req, ctx) {
   await db.connect()

   const id = ctx.params.id

   try {
      const quest = await Question.findById(id).populate('authorId').select('-password')

      return new Response(JSON.stringify(quest), {status: 200})
   } catch (error) {
      return new Response(JSON.stringify(null), {status: 500})
   }
}

export async function PUT(req, ctx) {
   await db.connect()

   const id = ctx.params.id
   const accessToken = req.headers.get('authorization')
   const token = accessToken.split(" ")[1]

   const decodedToken = verifyJwtToken(token)

   if (!accessToken || !decodedToken) {
      return new Response(JSON.stringify({error:"unauthorized (Wrong or expired token)"}), {status: 403})
   }

   try {
      const body = await req.json()
      const quest = await Question.findById(id).populate('authorId')

      if (quest?.authorId?._id.toString() !== decodedToken._id.toString) {
         return new Response(JSON.stringify({message: 'Only author can update his post'}), {status:403})
      }

      const updatedQuest = await Question.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })
      
      return new Response(JSON.stringify(updatedQuest), {status: 200})
      
   } catch (error) {
      return new Response(JSON.stringify(null), {status: 500})
   }
}

export async function DELETE(req, ctx) {
   await db.connect()

   const id = ctx.params.id
   const accessToken = req.headers.get('authorization')
   const token = accessToken.split(" ")[1]

   const decodedToken = verifyJwtToken(token)

   if (!accessToken || !decodedToken) {
      return new Response(JSON.stringify({error:"unauthorized (Wrong or expired token)"}), {status: 403})
   }

   try {
      const quest = await Question.findById(id).populate('authorId')
      if (quest?.authorId?._id.toString() !== decodedToken._id.toString()) {
         return new Response(JSON.stringify({message: 'Only author can delete his post'}), {status:403})
      }

      await Question.findByIdAndDelete(id)

      return new Response(JSON.stringify({message: 'Successfully deleted Post'}), {status: 200})
   } catch (error) {
      return new Response(JSON.stringify(null), {status: 500})
   }
}