import bcrypt from "bcryptjs";

const hashPasswordMiddleware = async (params, next) => {
    if (
        params.model === "User" &&
        (params.action === "create" || params.action === "update")
    ) {
        const password = params.args.data?.password;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            params.args.data.password = hashedPassword;
        }
    }
    return next(params);
};

export { hashPasswordMiddleware };
