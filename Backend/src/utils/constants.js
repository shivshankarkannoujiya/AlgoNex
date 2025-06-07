const accessTokenExpiry = 7 * 24 * 60 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    expires: new Date(Date.now() + accessTokenExpiry),
    maxAge: accessTokenExpiry,
};

export { cookieOptions };
