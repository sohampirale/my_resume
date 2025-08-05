import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getDataOfUserWithUserId } from "@/services/data.services";
import connectDB from "@/lib/connectDB"

export default async function MainPage() {
  const session = await getServerSession(authOptions);
  console.log("session : ",session)
  
  if(!session || !session.user || !session.user._id){
    return (
    <>
      Login please
    </>)
  } else if(session.user.hasPortfolio){
    await connectDB()
    const data = await getDataOfUserWithUserId(session.user._id);
    if(!data){
      console.log("data not found !");
      return (
        <>
          Data about your portfolio not found
        </>
      )
    }
    // console.log('data : ',data)
    return (
      <>
      Your portfolio is active on slug : {data.slug}
      </>
    )
  }

  return (
    <div >
      Create your portfolio website
    </div>
  );
}
