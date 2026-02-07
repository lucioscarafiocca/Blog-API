require("dotenv").config
const db = require("./db/queries")
const passport = require("passport-jwt")
const JwtStrategy = passport.Strategy
const ExtractJwt = passport.ExtractJwt

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUBLIC_KEY,
  algorithms: ["RS256"],
}

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await db.GetUser(payload.sub)
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (err) {
    return done(err, null)
  }
})

module.exports = (passport) => {
  passport.use(strategy)
}
