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
app.options("/api/v1/company", cors());
app.options("/api/v1/testimonials", cors());
app.use(express.json());
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/testimonials", testimonialRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is up and running at ${PORT}`);
});
