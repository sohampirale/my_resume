import ApiResponse from "@/lib/ApiResponse";
import connectDB from "@/lib/connectDB";
import { createDataSchema, stringSchema } from "@/schemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { Data, User } from "@/models";

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

    const existingData = await Data.findOne({
      owner:session.user._id
    })

    if(existingData){
      console.log('existing data : ',existingData);
      
      return NextResponse.json(
        new ApiResponse(false, 'You already have created resume'), {
          status: 409
        }
      )
    }

    const createdData = await Data.create(data)
    console.log('created data : ', createdData);

    if (!createdData) {
      return NextResponse.json(
        new ApiResponse(false, 'Failed to upload your data', createdData), {
        status: 400
      }
      )
    }

    const user = await User.findOne({
      _id:session.user._id
    })

    user.hasPortfolio=true;
    await user.save()

    return NextResponse.json(
      new ApiResponse(true, 'Your data added successfully', createdData), {
      status: 201
    }
    )

  } catch (error) {
    console.log('error : ',error);
    
    return NextResponse.json(
      new ApiResponse(false, error?.message??"Server Error",null,error), {
      status: 500
    }
    )
  }
}

