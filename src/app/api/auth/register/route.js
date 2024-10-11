import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";

export const POST = async (request) => {
    const {name, email, password} = await request.json();

    await connect();

    const hashedPassword = await bcrypt.hash(password, 5); //this will transform the user's password to a hashed 5 char long passsword on the database

    const newUser = new User(
        {
            name,
            email,
            password: hashedPassword,
        }
    );

    try {

        await newUser.save()
        return new NextResponse("User has been created" , {
            status: 201,
        });
    } catch (err) {
        return new NextResponse(err.message , {
            status: 500,
        });
    }

};