import { User } from '../model/user.model';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Blacklist } from '../model/blacklist.model';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }

    // Extract the token from the request
    // const token = ExtractJwt.fromAuthHeaderAsBearerToken()(payload);
    // if (token) {
    //   const blacklisted = await Blacklist.findOne({ token });
    //   if (blacklisted) {
    //     return done(null, false);
    //   }
    // }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;