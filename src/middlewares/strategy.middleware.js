import passport from "passport";

export const strategyPassport = (strategy)=>{
    return async(req, res, next) =>{
        passport.authenticate(strategy,function(err, user, info){
            console.log(info);
            if(err) next(err);
            if(!user) next('Error no hay user')
            else{
                req.user = user
                return next()
            }
        })(req, res, next)
    }
}