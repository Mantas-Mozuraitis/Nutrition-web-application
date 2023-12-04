import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

// Initialising express server and port number
const app = express();
const port = 3000;

// API authentication
const APIid = "4adfc42b";
const APIkey = "5694d77393fca58e53dc6eaa985bfcec";
const APIurl = "https://trackapi.nutritionix.com/v2/search/instant/?query=";

// Set location of static files
app.use(express.static("public"));
// parse application form body data
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.post("/get_nutrition", async (req, res)=>{
    const food = req.body.food;
    console.log(food);
    try {
        const response = await axios.get((`${APIurl}${food}`),{
            headers:{
            'Content-Type':'application/json',
            'x-app-id':APIid,
            'x-app-key':APIkey
            }
        });
        console.log(response.data.common[0]);
        res.render("index.ejs", {output:response.data.common[0]})
      } catch (error) {
        console.error(error);
        res.render("index.ejs", {output:error})
      }
})

app.listen(port, (req,res)=>{
    console.log(`Server is listening on port ${port}`);
})
