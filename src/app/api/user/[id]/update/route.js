import db from "@/lib/db";
import User from "@/models/User";

export const POST = async (req, {params}) => {
   try {
      await db.connect();

      const { id } = params
      
      const body = await req.json()
      const { name, profileImage } = body
      
      const updateUser = await User.findByIdAndUpdate(id, {
         name,
         profileImage,
      },
         {
            new: true
         });
      return new Response(JSON.stringify(updateUser), {status: 200})
   } catch (error) {
      console.log(error);
      return new Response("Failed to update user", {status: 500})
   }
}