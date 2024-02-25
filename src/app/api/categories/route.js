import { NextResponse } from "next/server";
import Category from "@/models/Category";
import db from "@/lib/db";

export const GET = async (request) => {
   try {
      await db.connect()
      const categories = await Category.find()
      return new NextResponse(JSON.stringify(categories), {status: 200})
   } catch(error) {
      return new NextResponse("Error is fetching Categories" + error, {status: 500})
   }
}