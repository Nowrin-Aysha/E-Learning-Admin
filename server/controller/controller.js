import adminModel from "../model/adminModel.js";
import mentorModel from "../model/mentorModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

dotenv.config();



export async function register(req, res) {
  try {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    
    const { email, firstName, phoneNumber, password, role, gender, isSuperAdmin } = req.body;

    if (!email) return res.status(400).send({ error: "Please enter email" });
    if (!emailRegex.test(email)) return res.status(400).send({ error: "Please enter a valid email" });
    if (!firstName) return res.status(400).send({ error: "Please enter first name" });
    if (!phoneNumber) return res.status(400).send({ error: "Please enter phone number" });
    if (!phoneRegex.test(phoneNumber)) return res.status(400).send({ error: "Phone number must be 10 digits" });
    if (!password) return res.status(400).send({ error: "Password is required" });
    if (!gender) return res.status(400).send({ error: "Gender is required" });

    const existEmail = await adminModel.findOne({ email });
    if (existEmail) return res.status(400).send({ error: "Email already in use. Please use a unique email." });

    if (!specialCharRegex.test(password)) {
      return res.status(400).send({ error: "Password should contain at least one special character" });
    }
    if (password.length < 6) return res.status(400).send({ error: "Password should be at least 6 characters" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new adminModel({
      email,
      password: hashPassword,
      firstName,
      phoneNumber,
      role,
      gender,
      isSuperAdmin: isSuperAdmin !== undefined ? isSuperAdmin : false,
    });

    await user.save();

    return res.status(201).send({ error: false, msg: "User registered successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
}




export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ error: "email should not be empty" });
    if (!password) return res.status(400).send({ error: "password should not be empty" });

    const user = await adminModel.findOne({ email });
    if (!user) return res.status(404).send({ error: "email not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).send({ error: "Password does not match" });

    const token = Jwt.sign(
      { userid: user._id, email: user.email },
      process.env.JWTS,
      { expiresIn: "30d" }
    );

    return res.status(200).send({
      msg: "Logged in successfully...",
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}



export async function addMentor(req, res) {
  console.log("hellooo");
  
  try {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const { name, email, phone, password} = req.body;
    console.log(req.body);
    console.log(req.file);
    console.log(req.file.path);
    

    

    if (!email) return res.status(400).send({ error: "Please enter email" });
    if (!emailRegex.test(email)) return res.status(400).send({ error: "Please enter a valid email" });
    if (!name) return res.status(400).send({ error: "Please enter name" });
    if (!phone) return res.status(400).send({ error: "Please enter phone number" });
    if (!phoneRegex.test(phone)) return res.status(400).send({ error: "Phone number must be 10 digits" });
    if (!password) return res.status(400).send({ error: "Password is required" });

    const existingMentor = await mentorModel.findOne({ email });
    if (existingMentor) return res.status(400).send({ error: "Email already in use. Please use a unique email." });

    if (!specialCharRegex.test(password)) {
      return res.status(400).send({ error: "Password should contain at least one special character" });
    }
    if (password.length < 6) return res.status(400).send({ error: "Password should be at least 6 characters" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let filename=req.file.path;
    const newMentor = new mentorModel({
      name,
      email,
      phone,
      password: hashedPassword,
      photo:filename,
      joinedDate: new Date(),
    });

    await newMentor.save();

    return res.status(200).send({ error: false, msg: "Mentor registered successfully" });

  } catch (error) {
    console.error("Error occurred during mentor registration:", error);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
}



export async function getMentors(req, res) {
  try {
    const userId = req.user.userid;

    const user = await adminModel.findById(userId);

    const response = {
      userId: user._id,
      ...user._doc,
    };
    if (user) {
      res.status(200).json({
        error: false,
        message: "Mentor details retrieved successfully",
        data: response,
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Mentor not found",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error fetching mentor details:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      data: null,
    });
  }
}




export async function addAdmin(req, res) {
  try {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const { email, firstName, phoneNumber, password, role, gender, isSuperAdmin } = req.body;

    if (!email) return res.status(400).send({ error: "Please enter email" });
    if (!emailRegex.test(email)) return res.status(400).send({ error: "Please enter a valid email" });
    if (!firstName) return res.status(400).send({ error: "Please enter first name" });
    if (!phoneNumber) return res.status(400).send({ error: "Please enter phone number" });
    if (!phoneRegex.test(phoneNumber)) return res.status(400).send({ error: "Phone number must be 10 digits" });
    if (!password) return res.status(400).send({ error: "Password is required" });
    if (!gender) return res.status(400).send({ error: "Gender is required" });

    const existEmail = await adminModel.findOne({ email });
    if (existEmail) return res.status(400).send({ error: "Email already in use. Please use a unique email." });

    if (!specialCharRegex.test(password)) {
      return res.status(400).send({ error: "Password should contain at least one special character" });
    }
    if (password.length < 6) return res.status(400).send({ error: "Password should be at least 6 characters" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new adminModel({
      email,
      password: hashPassword,
      firstName,
      phoneNumber,
      role,
      gender,
      isSuperAdmin: isSuperAdmin !== undefined ? isSuperAdmin : false,
    });

    await user.save();

    return res.status(201).send({ error: false, msg: "Admin registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
}


export async function getAdmins(req, res) {
  try {
    const admins = await adminModel.find();
    return res.status(200).send({ error: false, admins });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
