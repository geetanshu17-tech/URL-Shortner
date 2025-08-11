import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";
import bcrypt from "bcrypt"; // ✅ Needed for password comparison
import User from "../models/user.model.js"; // ✅ Import model for .select("+password")

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (user) throw new ConflictError("User already exists");

    const newUser = await createUser({ name, email, password });
    const token = await signToken({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    return { token, user: newUser };
};

export const loginUser = async (email, password) => {
    // ✅ Fetch user WITH password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid Credentials");

    // ✅ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");

    const token = signToken({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    // ✅ Remove password before returning
    user.password = undefined;

    return { token, user };
};
