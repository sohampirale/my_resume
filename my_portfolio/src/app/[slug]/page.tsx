
import { Portfolio } from "@/components/Portfolio";

export default async function PortfolioPage({params}){
  console.log('inside PortfolioPage');
  
  const {slug} = await params;

  
  return (<Portfolio slug={slug}/>)
}