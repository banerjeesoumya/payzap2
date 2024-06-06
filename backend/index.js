const express = require("express");
const v1Router = require("./routes/index");
const cors = require("cors")
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", v1Router)

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

