//Create data

import ApiResponse from "@/lib/ApiResponse";
import connectDB from "@/lib/connectDB";
import { Data } from "@/models";
import { createDataSchema, stringSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if(!session || !session.user || !session.user._id){
      return NextResponse.json(
        new ApiResponse(false, 'User not logged in'), {
          status: 401
        }
      )
    }

    const body = await req.json();
    body.owner = session.user._id;

    const parsed = createDataSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        new ApiResponse(false, 'Invalid data format', null, parsed.error), {
          status: 400
        }
      )
    }

    await connectDB()

    const data = parsed.data;


    //:TODO  add check whether data of that user already exists or not after adding nextAuth -- considering it does not right now
    const existingData = await Data.findOne({
      owner:session.user._id
    })

    if(existingData){
      return NextResponse.json(
        new ApiResponse(false, 'You already have created resume'), {
          status: 409
        }
      )
    }

    const createdData = await Data.create(data)
    console.log('created data : ', createdData);

    if (createdData) {
      return NextResponse.json(
        new ApiResponse(false, 'Failed to upload your data', createdData), {
        status: 400
      }
      )
    }

    return NextResponse.json(
      new ApiResponse(true, 'Your data added successfully', createdData), {
      status: 201
    }
    )

  } catch (error) {
    return NextResponse.json(
      new ApiResponse(false, error?.message??"Server Error"), {
      status: 500
    }
    )
  }
}

