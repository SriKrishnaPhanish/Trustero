const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const companySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  companyNameURL: {
    type: String,
    required: true,
    unique: true,
  },
  authProvider: {
    type: String,
    required: true,
  },
});

const testimonialSchema = new mongoose.Schema({
  testimonial: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  companyNameURL: {
    type: mongoose.Schema.Types.String,
    ref: "Company",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model("Company", companySchema);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = {
  Company,
  Testimonial,
};
