const express = require("express");
require("dotenv").config();
const Intern = require("./model/Intern.js"); // Adjust path if needed
const db = require("./db.js"); // Adjust path if needed

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
// Serve HTML and other static files from "public" folder
app.use(express.static('public'));

app.post("/register", async (req,res)=>{
    console.log(req.body);
    const {id, name, course} = req.body;
// console.log(isNaN(Number.parseInt(id)));
    if(!id || !/\d/g.test(id)  || !name || !course){
        return res.status(400).json({error: "Missing or Illegal fields"});
    }

    try{
        const newIntern = new Intern({
            id,
            name,
            course_name: course,
            joining_date: new Date(),
        })

        const savedIntern = await newIntern.save();
        res.status(201).json({ status: true, message: "Intern Added", data: savedIntern });
    }catch(err){
        res.status(500).json({ status: false, error: err.message });
    }
})

// API endpoint
app.get('/intern', async (req, res) => {
  const id = req.query.id;

  if (isNaN(Number.parseInt(id))) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  try {
    const intern = await Intern.findOne({ id });

    if (!intern) {
      return res.status(404).json({ status: false, error: "Intern not found" });
    }

    res.json(intern);
  } catch (error) {
    console.error("Error fetching intern:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});