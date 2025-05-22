const accessTokenExpiry = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + accessTokenExpiry),
    maxAge: accessTokenExpiry,
};

export { cookieOptions };
