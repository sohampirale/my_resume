"use client"
import axios from "axios"
import { useEffect, useState } from "react";

export function Portfolio({slug}:{slug:string}){
    const [portfolio,setPortfolio]=useState(null);

    async function fetchPortfolio(){
    try {
          const {data:response}= await axios.get(`https://glorious-system-pj7pqv74vrqq294vw-3001.app.github.dev/api/data/${slug}`)

          console.log("response receievd : ",response)
          setPortfolio(response.data)

      } catch (error) {
        console.log('Error : ',error);
        
      }
    }

  useEffect(()=>{
    console.log('Inside useEffect');
    fetchPortfolio()
  },[])

  return (
    <>
      portfolio receievd is : 
      {
        JSON.stringify(portfolio)
      }
    </>)
}