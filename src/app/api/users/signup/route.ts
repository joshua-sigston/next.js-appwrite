import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {username, email, password} = reqBody;
    console.log(reqBody);

    // chk is user exists
    const userExists = await User.findOne({email});

    if (userExists) {
      return NextResponse.json({error: 'User already exists.'}, {status: 400})
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashPassword
    })

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      {
        message: "User created successfully.", 
        success: true,
        savedUser 
      }
    );
    
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message
      }, 
      {
        status: 500
      });
  };
}