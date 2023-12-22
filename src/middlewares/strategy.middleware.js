import passport from "passport";

export const strategyPassport = (strategy)=>{
    return async(req, res, next) =>{
        passport.authenticate(strategy,function(err, user, info){
            if(err) next(err);
            if(!user){
                req.user = undefined;
                return next(info?.message);
            }
            else{
                req.user = user
                return next()
            }
        })(req, res, next)
    }
}