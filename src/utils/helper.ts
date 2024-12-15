import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET!
const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET!

const saltRounds = 10

export const hashPassword = async (password: string)=> {
   const salt = await bcrypt.genSalt(saltRounds);
   const hashedPassword = await bcrypt.hash(password, salt)
   return hashedPassword
}



export const accessToken = (id: {_id: string})=> jwt.sign(id,
   accessTokenSecret,
   {expiresIn: '60m'}
)

export const refreshToken = (id: {_id: string})=> jwt.sign(id,
   refreshTokenSecret,
   {expiresIn: '1d'}
)