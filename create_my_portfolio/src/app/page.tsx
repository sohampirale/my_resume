import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 
import { getDataOfUserWithUserId } from "@/services/data.services";
import connectDB from "@/lib/connectDB";
import Link from "next/link";
import { User, ExternalLink, Plus, Sparkles } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export default async function MainPage() {
  const session = await getServerSession(authOptions);
  console.log("session : ", session);

  // Login required state
  if (!session || !session.user || !session.user._id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
            <p className="text-slate-300 mb-6">
              Please log in to access your portfolio dashboard and create or manage your professional portfolio.
            </p>
            <Link
              href="/signin"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Sign In to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User has portfolio - show active portfolio info
  if (session.user.hasPortfolio) {
    await connectDB();
    const data = await getDataOfUserWithUserId(session.user._id);
    
    if (!data) {
      console.log("data not found !");
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/50 rounded-2xl p-8 text-center shadow-2xl">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Portfolio Data Missing</h2>
              <p className="text-slate-300 mb-6">
                Your portfolio data could not be found. Please contact support or try creating a new portfolio.
              </p>
              <div className="space-y-3">
                <Link
                  href="/create-portfolio"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Portfolio
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Portfolio exists and data found
    const portfolioUrl = `${process.env.NEXT_PUBLIC_DOMAIN || 'https://yoursite.com'}/${data.slug}`;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-green-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Portfolio Active! 🚀
            </h2>
            
            <p className="text-slate-300 mb-6">
              Your professional portfolio is live and ready to showcase your work to the world.
            </p>
            
            <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-600">
              <p className="text-sm text-slate-400 mb-2">Your Portfolio URL:</p>
              <p className="text-blue-400 font-mono text-sm break-all">
                {portfolioUrl}
              </p>
            </div>
            
            <div className="space-y-3">
              <a
                href={data.slug}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 group"
              >
            
                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                View Live Portfolio
              </a>
              
              {/* <Link
                href="/dashboard"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Manage Portfolio
              </Link> */}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-xs text-slate-500">
                Slug: <span className="text-slate-400 font-mono">{data.slug}</span>
              </p>
            </div>
          </div>
        </div>
          <p>LOgout btn</p>
              <LogoutButton/>
      </div>
    );
  }

  // User doesn't have portfolio - show create portfolio option
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Create Your Portfolio
          </h1>
           
          <p className="text-xl text-slate-300">
            Build your professional portfolio in minutes
          </p>
          <p>LOgout btn</p>
              <LogoutButton/>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Professional Design</h3>
              <p className="text-sm text-slate-400">
                Choose from modern, responsive templates designed to impress
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Easy Setup</h3>
              <p className="text-sm text-slate-400">
                Get your portfolio live in just a few minutes with our guided setup
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="/create-portfolio"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your Portfolio Now
            </Link>
            
            <p className="text-xs text-slate-500 mt-4">
              No credit card required • Free to start
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { getDataOfUserWithUserId } from "@/services/data.services";
// import connectDB from "@/lib/connectDB"

// export default async function MainPage() {
//   const session = await getServerSession(authOptions);
//   console.log("session : ",session)
  
//   if(!session || !session.user || !session.user._id){
//     return (
//     <>
//       Login please
//     </>)
//   } else if(session.user.hasPortfolio){
//     await connectDB()
//     const data = await getDataOfUserWithUserId(session.user._id);
//     if(!data){
//       console.log("data not found !");
//       return (
//         <>
//           Data about your portfolio not found
//         </>
//       )
//     }
//     // console.log('data : ',data)
//     return (
//       <>
//       Your portfolio is active on slug : {data.slug}
//       </>
//     )
//   }

//   return (
//     <div >
//       Create your portfolio website
//     </div>
//   );
// }
