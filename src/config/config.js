import dotenv from 'dotenv';

dotenv.config();

export default{
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    secretKey: process.env.SECRET_KEY,
    secretCookieCode: process.env.COOKIE_CODE,
    jwtSecret: process.env.JWT_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS,
    accesTokenMP: process.env.ACCES_TOKEN_MP,
    awsSecretKey: process.env.AWS_ACCES_KEY,
    awsSecretAccesKey: process.env.AWS_SECRET_ACCES_KEY,
    awsRegion: process.env.AWS_REGION,
    awsBucket: process.env.AWS_IMGS_BUCKET,
    urlFront: process.env.URL_FRONT,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS
};