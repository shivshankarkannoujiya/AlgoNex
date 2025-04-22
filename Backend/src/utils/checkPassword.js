import bcrypt from "bcryptjs";

async function isPasswordCorrect(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

export { isPasswordCorrect };
