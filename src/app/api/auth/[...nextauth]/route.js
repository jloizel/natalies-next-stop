import connect from "@/utils/db";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google" //can add any social media, look up documentation to code it
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({ //google authentication provider, could also use github for example
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({ //this allows people to register with their email and password
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                await connect(); //this connects to database

                try {
                    const user = await User.findOne({email:credentials.email}) //this checks if there is already a user in the database with the entered email
                    
                    if (user) {
                        //this checks if the password is the same
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password, 
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error("Wrong credentials!")
                        }
                    } else {
                        throw new Error("User not found!");
                    }
                } catch (err) {
                    throw new Error(err)
                }
            }
        })
    ],
    pages: {
        error: "/dashboard/login",
    }
})

export {handler as GET, handler as POST}; //gets username and pw is POST method, getting session/user info is GET method