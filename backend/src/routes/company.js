const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { EMAIL_AUTH } = require("../../config");
const { Company, Testimonial } = require("../db");
const { authMiddleware } = require("../middleware");
const { jwtDecode } = require("jwt-decode");
const dotenv = require("dotenv");

dotenv.config();
//SignUp Schema
const signUpSchema = zod.object({
  username: zod.string().nonempty(),
  password: zod.string().nonempty(),
  companyName: zod.string().nonempty(),
  authProvider: zod.string().nonempty(),
});

//SignIn Schema
const signInSchema = zod.object({
  username: zod.string().nonempty(),
  password: zod.string().nonempty(),
});

const companyRouter = Router();

companyRouter.post("/signup", async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(422).json({
      message: "Enter Valid Inputs",
    });
  }
  const username = body.username;
  const authProvider = body.authProvider;
  const { success } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(422).json({
      message: "Enter Valid Inputs",
    });
  }
  const company = await Company.findOne({
    username: req.body.username,
  });
  if (company) {
    return res.status(409).json({
      message: "User already exists with this username.",
    });
  }
  const newCompany = await Company.create({
    username: body.username,
    password: body.password,
    companyName: body.companyName,
    companyNameURL: body.companyName.toLowerCase().replace(/\s+/g, ""),
    authProvider: body.authProvider,
  });
  const token = jwt.sign({ username, authProvider }, process.env.JWT_SECRET);
  return res.status(200).json({
    message: "User is created",
    token: token,
    companyNameURL: newCompany.companyNameURL,
  });
});

companyRouter.post("/signin", async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(422).json({
      message: "Enter Valid Inputs",
    });
  }
  const username = body.username;
  const { success } = signInSchema.safeParse(req.body);
  if (!success) {
    return res.status(422).json({
      message: "Enter Valid Inputs",
    });
  }
  const company = await Company.findOne({
    username: req.body.username,
  });
  if (!company) {
    return res.status(404).json({
      message: "User do not exist, please signup",
    });
  }
  if (company.password != body.password) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  return res.status(200).json({
    message: "User is logged in successfully",
    token: token,
    companyNameURL: company.companyNameURL,
  });
});

companyRouter.post("/signin/google", async (req, res) => {
  const username = req.body.username;
  const company = await Company.findOne({
    username: username,
  });
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  if (!company) {
    return res.status(404).json({
      message: "User do not exist, please Sign Up",
    });
  }
  console.log(token);
  return res.status(200).json({
    message: "User Exist",
    token: token,
    companyNameURL: company.companyNameURL,
  });
});

companyRouter.get("/testimonials", authMiddleware, async (req, res) => {
  const username = req.username;
  const company = await Company.findOne({
    username: username,
  });
  const companyNameURL = company.companyNameURL;
  const testimonials = await Testimonial.find({
    companyNameURL: companyNameURL,
  });
  if (!testimonials) {
    return res.json({
      message: "No testimonials",
    });
  }
  return res.status(200).json({
    testimonials: testimonials,
  });
});

module.exports = {
  companyRouter,
};
