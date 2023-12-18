import passport from "passport";
import CustomError from "../errors/custom.error.js";

export const strategyPassport = (strategy)=>{
    return async(req, res, next) =>{
        passport.authenticate(strategy,function(err, user, info){
            if(err) next(err);
            if(!user){
                req.user = undefined;
                // const error = new CustomError('No user', 'No user logueddd', 6);
                return next();
            }
            else{
                req.user = user
                return next()
            }
        })(req, res, next)
    }
}