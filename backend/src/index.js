const express = require("express");
const cors = require("cors");
const { companyRouter } = require("./routes/company");
const { testimonialRouter } = require("./routes/testimonial");
const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: "https://trustero.onrender.com/",
  })
);
app.use(express.json());
app.options("*", cors());
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/testimonials", testimonialRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is up and running at ${PORT}`);
});
