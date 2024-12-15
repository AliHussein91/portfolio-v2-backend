import { User } from './../model/user.model';
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from 'dotenv'

dotenv.config()

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "process.env.PUB_KEY as String",
    algorithm: ["RS256"]
}


const strategy = new Strategy(options, async (payload, done) => {
    try {
        const findUser = await User.findOne({ _id: payload.sub })
        if (findUser) {
            return done(null, findUser)
        } else {
            return done(null, false)
        }
    } catch (error) {
        done(error, null)
    }
})