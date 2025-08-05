import { Data } from "@/models";

export async function getDataOfUserWithUserId(userId:string){
  const data=await Data.findOne({
    owner:userId
  })
  return data;
}