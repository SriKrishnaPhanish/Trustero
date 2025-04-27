const { Router } = require("express");
const zod = require("zod");
const { Testimonial, Company } = require("../db");
const testimonialRouter = Router();

const testimonialSchema = zod.object({
  testimonial: zod.string().nonempty(),
  rating: zod.number().min(0).max(5),
  fullName: zod.string().nonempty(),
});

testimonialRouter.get("/:companyName", async (req, res) => {
  const params = req.params;
  const companyName = params.companyName;
  const validCompany = await Company.findOne({
    companyNameURL: companyName,
  });
  if (!validCompany) {
    return res.status(404).json({
      message: "Company do not exist",
    });
  }
  return res.status(200).json({
    message: "Company Exists",
  });
});

testimonialRouter.post("/:companyName", async (req, res) => {
  const params = req.params;
  const companyName = params.companyName;
  const body = req.body;
  if (!body) {
    console.log("Break Point 1");
    return res.status(422).json({
      message: "Enter Valid Inputs",
    });
  }
  const validCompany = await Company.findOne({
    companyNameURL: companyName,
  });
  if (!validCompany) {
    console.log("Break Point 2");
    return res.status(404).json({
      message: "Company do not exist",
    });
  }
  const { success } = testimonialSchema.safeParse(body);
  if (!success) {
    console.log("Break Point 3");
    return res.status(422).json({
      message: "Enter Valid inputs",
    });
  }
  const testimonial = await Testimonial.create({
    testimonial: body.testimonial,
    rating: body.rating,
    companyNameURL: companyName,
    fullName: body.fullName,
  });
  return res.status(200).json({
    message: "Testimonial added",
  });
});

module.exports = {
  testimonialRouter,
};
