
import ApiResponse from "@/lib/ApiResponse";
import connectDB from "@/lib/connectDB";
import { Data } from "@/models";
import { stringSchema } from "@/schemas";

import { NextRequest, NextResponse } from "next/server";
//Get a portfolio data
export async function GET(req: NextRequest,{params}:{params:Promise<{slug:string}>}) {
  try {
    const { slug: receivedSlug } = await params;
    const parsed = stringSchema.safeParse(receivedSlug)
    if (!parsed.success) {
      return NextResponse.json(
        new ApiResponse(false, "Invalud slug format", null, parsed.error), {
        status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*", // or your exact frontend URL
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      }
      )
    }

    const slug = parsed.data;

    await connectDB();

    const portfolio = await Data.aggregate([{
      $match: {
          slug
        }
      }, {
        $lookup: {
          from:"users",
          localField: "owner",
          foreignField: "_id",
          as:"owner"
        }
      },{
        $unwind:"$owner"
      }
    ])

    if (!portfolio) {
      return NextResponse.json(
        new ApiResponse(false, "Data not found for that slug"), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*", // or your exact frontend URL
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
      )
    }

    console.log('portfolio : ',portfolio);
    
    return NextResponse.json(
      new ApiResponse(true, "portfolio data fetched successfully",portfolio[0]), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // or your exact frontend URL
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
    )

  } catch (error) {
    return NextResponse.json(
         new ApiResponse(false, error?.message??"Server Error"), {
         status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // or your exact frontend URL
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
       }
       )
  }
}