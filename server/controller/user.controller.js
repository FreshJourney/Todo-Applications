const User = require("../model/user.model");
const z = require("zod");
const bcrypt = require("bcrypt");
const { generateTokenAndSaveInCookies } = require("../jwt/token");
const UserSchema = z.object({
  Email: z.string().email({ message: "Invalid Email Address" }),
  Username: z
    .string()
    .min(3, { message: "Username atleast 3 characters long" }),
  Password: z
    .string()
    .min(6, { message: "Password minimum six characters long" }),
});
const Register = async (req, res) => {
  try {
    const { Email, Username, Password } = req.body;
    if (!Email || !Username || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const validation = UserSchema.safeParse({ Email, Username, Password });
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    const existinguser = await User.findOne({ Email: Email });
    if (existinguser) {
      return res.status(400).json({ message: "User Exists" });
    }
    const hashPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({
      Username: Username,
      Email: Email,
      Password: hashPassword,
    });

    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      return res
        .status(201)
        .json({ message: "User Created Successfully", newUser, token });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in creating user" });
  }
};

const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    const chkUser = await User.findOne({ Email }).select("+Password");

    if (!chkUser || !(await bcrypt.compare(Password, chkUser.Password))) {
      return res.status(400).json({ message: "Invalid Email and Password" });
    }
    const token = await generateTokenAndSaveInCookies(chkUser._id, res);
    return res
      .status(201)
      .json({ message: "Login Successful", chkUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Facing Issues In Login" });
  }
};
const Logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    return res.status(200).json({ message: "User Logged out successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Logging Out " });
  }
};

module.exports = { Register, Login, Logout };
