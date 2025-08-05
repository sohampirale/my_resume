import ApiResponse from "@/lib/ApiResponse";
import connectDB from "@/lib/connectDB";
import { User } from "@/models";
import { loginSchema, signupSchema } from "@/schemas";
import { flushAllTraces } from "next/dist/trace";
import { NextRequest, NextResponse } from "next/server";

/**
 * Signup user POST
 * 1.retrive username and password and email from body
 * 2.validate
 * 3.check if user with that email or password exists or not
 * 4.create the user as well a shash the password with pre hook from mongodb
 */

export async function POST(req:NextRequest){
  console.log('inside /api/user POST');
  
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if(!parsed.success){
      return NextResponse.json(
        new ApiResponse(false,"Invalid format provided",null,parsed.error),{
          status:400
        }
      )
    }

    const {username,email,password}=parsed.data;

    await connectDB();

    const existingUser = await User.findOne({
        $or:[
          {email},
          {username}
        ]
    })

    if(existingUser){
      return NextResponse.json(
        new ApiResponse(false,'User with that email or username already exists'),{
          status:409
        }
      )
    }

    const user = await User.create({
      username,
      email,
      password,
    })


    return NextResponse.json(
      new ApiResponse(true,"User signed up successfully")
    )

  } catch (error:any) {
    return NextResponse.json(
      new ApiResponse(false,error?.message?? "Server error"),{
        status:500
      }
    )
  }
}

/**
 * Login user
 * 1.retirve data from body
 * 2.validate
 * 3.check if user exists if not reject
 * 4.check password if does not macth reject
 * 5.return 
 */

export async function PUT(req:NextRequest){
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body)

    if(!parsed.data){
      return NextResponse.json(
        new ApiResponse(false,"Invalid data provided",null,parsed.error),{
          status:400
        }
      )
    }

    const {identifier,password} = parsed.data;
    
    const user = await User.findOne({
      $or:[
        {email:identifier},
        {username:identifier}
      ]
    })

    if(!user){
      return NextResponse.json(
        new ApiResponse(false,"User with given username or email does not exists"),{
          status:404
        }
      )
    }else if(!await user.comparePassword(password)){
       return NextResponse.json(
        new ApiResponse(false,"Incorrect password"),{
          status:401
        }
      )
    }

    return NextResponse.json(
      new ApiResponse(true,"User logged in successfully"),{
        status:200
      }
    )

  } catch (error) {
    return NextResponse.json(
      new ApiResponse(false,error?.message?? "Login failed"),{
        status:500
      }
    )
  }
}
