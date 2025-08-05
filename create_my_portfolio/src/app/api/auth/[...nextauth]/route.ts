import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "@/lib/connectDB"
import { User } from "@/models"

export const authOptions={
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    },
    providers:[
        Credentials({
            name:"Credentials",
            credentials:{
                identifier:{ label:"identifier",type:"text"},
                password:{ label:"Password",type:"password"}
            },
            async authorize(credentials){
                console.log('Inside authorize()');
                const identifier=credentials?.identifier;
                const password=credentials?.password

                if(!identifier || !password){
                    console.log('email/URN/username or password not provided');
                    return null
                }
                await connectDB();
                
                const user=await User.findOne({
                    $or:[
                        {email:identifier},
                        {username:identifier}
                    ]
                })

                console.log('user found : ',user);
                
                if(!user){
                    console.log('user not found');
                    return null;
                } else if(!user.password){
                    console.log('Signup done via Google/Github, signup up again with those providers and set a passowrd in the "user" section');
                    return null;
                }

                const correctPassword=await user.comparePassword(password)
                // const correctPassword=user.password===credentials.password
            
                if(!correctPassword){
                    console.log('Incorrect Password');
                    return null;
                }
                return user;
            }
        })
    ],
    callbacks:{
            async jwt({token,user,account}){
                
                if(account?.provider){
                    token.provider=account.provider;
                }
                
                if(user){
                    console.log('inside jwt user : ',user);
                    token._id=user._id;
                    token.username=user.username;
                    token.email=user.email;
                    token.hasPortfolio=user.hasPortfolio;
                }
                return token;
            },
            async session({token,session}){

                if(session.user){
                    console.log('inside session() token : ',token);
                    session.user.provider=token.provider;
                    session.user._id=token._id;
                    session.user.username=token.username;
                    session.user.email=token.email;
                    session.user.hasPortfolio=token.hasPortfolio;
                }

                return session;
            }
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}