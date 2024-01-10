import passport from "passport";
import CustomError from "../errors/custom.error.js";

export const strategyPassport = (strategy)=>{
    return async(req, res, next) =>{
        passport.authenticate(strategy,function(err, user, info){
            if(err){
                next(err);
            }
            if(!user){
                if(info?.message === 'No auth token'){
                    req.user = undefined;
                    const errorToken = new CustomError('No user', 'No hay user logueado', 4);
                    return next(errorToken);
                }else{
                    req.user = undefined;
                    return next(info?.message);
                }
            }
            else{
                req.user = user
                return next()
            }
        })(req, res, next)
    }
}