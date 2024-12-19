import { User } from '../model/user.model';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import dotenv from 'dotenv'

dotenv.config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET
};


passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;