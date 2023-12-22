import passport from "passport";
import CustomError from "../errors/custom.error.js";

export const strategyPassport = (strategy)=>{
    return async(req, res, next) =>{
        passport.authenticate(strategy,function(err, user, info){
            if(err) next(err);
            if(!user){
                req.user = undefined;
                return res.status(403).send({status:'error', error:info.message});
            }
            else{
                req.user = user
                return next()
            }
        })(req, res, next)
    }
}