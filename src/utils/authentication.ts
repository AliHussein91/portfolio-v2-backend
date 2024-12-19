import passport from "../config/jwt.config";

export const authenticate = passport.authenticate('jwt', { session: false })