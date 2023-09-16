import passportGoogle from 'passport-google-oauth20'
import passport from 'passport'
import { User } from '../database/mongodb/models/user.model';
import axios from 'axios';

const GoogleStrategy=passportGoogle.Strategy
passport.use(
    new GoogleStrategy({
        clientID:"872932573146-714nbgm5slutbcdds8etdvj72dcvnlf6.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "/auth/google/callback",
			  scope: ["profile", "email"],
    },
    async (accessToken:any,refreshToken:any,profile:any,done:any)=>{
        // Check if the user with the given Google ID exists
      let user = await User.findOne({ googleId: profile.id});
      
      // If the user doesn't exist, create a new user
      if (!user) {
        user = await User.create({ googleId: profile.id,email:profile.email,name:profile.displayName });
      }

      return done(null, user);
    }
    )
);
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});