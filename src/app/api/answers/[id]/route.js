import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import AnswerModal from "@/models/AnswerModal";

export async function GET(req, ctx){
    await db.connect()

    // post id !!
    const id = ctx.params.id

    try {
        const answers = await AnswerModal.find({answerId: id}).populate('authorId')

        return new Response(JSON.stringify(answers), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}

export async function DELETE(req, ctx){
    await db.connect()

    const id = ctx.params.id
    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const answers = await AnswerModal.findById(id).populate("authorId")
        if(answers.authorId._id.toString() !== decodedToken._id.toString()){
            return new Response(JSON.stringify({msg: "Only author can delete his post"}), {status: 401})
        }

        await AnswerModal.findByIdAndDelete(id)

        return new Response(JSON.stringify({msg: 'Successfully deleted comment'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}