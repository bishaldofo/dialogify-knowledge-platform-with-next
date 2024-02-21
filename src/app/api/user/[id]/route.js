import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import User from "@/models/User";


export async function GET(req, ctx) {
   await db.connect();

   const userId = ctx.params.id;

   try {
      const user = await User.findById(userId).select('-password');

      return new Response(JSON.stringify(user), { status: 200 });
   } catch (error) {
      return new Response(JSON.stringify(null), { status: 500 });
   }
}

export async function PUT(req, ctx) {
   await db.connect();

   const userId = ctx.params.id;
   const accessToken = req.headers.get('authorization');
   const token = accessToken.split(" ")[1];

   const decodedToken = verifyJwtToken(token);

   if (!accessToken || !decodedToken) {
      return new Response(JSON.stringify({ error: "Unauthorized (Wrong or expired token)" }), { status: 403 });
   }

   try {
      const body = await req.json();
      const user = await User.findById(userId);

      if (!user) {
         return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
      }

      if (user._id.toString() !== decodedToken._id.toString()) {
         return new Response(JSON.stringify({ message: 'You can only update your own profile' }), { status: 403 });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, { $set: { ...body } }, { new: true });

      return new Response(JSON.stringify(updatedUser), { status: 200 });

   } catch (error) {
      return new Response(JSON.stringify(null), { status: 500 });
   }
}

export async function DELETE(req, ctx) {
   await db.connect();

   const userId = ctx.params.id;
   const accessToken = req.headers.get('authorization');
   const token = accessToken.split(" ")[1];

   const decodedToken = verifyJwtToken(token);

   if (!accessToken || !decodedToken) {
      return new Response(JSON.stringify({ error: "Unauthorized (Wrong or expired token)" }), { status: 403 });
   }

   try {
      const user = await User.findById(userId);

      if (!user) {
         return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
      }

      if (user._id.toString() !== decodedToken._id.toString()) {
         return new Response(JSON.stringify({ message: 'You can only delete your own profile' }), { status: 403 });
      }

      await User.findByIdAndDelete(userId);

      return new Response(JSON.stringify({ message: 'User successfully deleted' }), { status: 200 });

   } catch (error) {
      return new Response(JSON.stringify(null), { status: 500 });
   }
}
