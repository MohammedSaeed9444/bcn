import express from "express";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

const users = [];

app.use(express.json())

app.post('/register', (req, res) => {
    try{
      const {email, password }  = req.body
      const findUser = user.find((data) => email == data.email)
      if (findUser) {
        res.status(400).send("wrong")
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      users.push({email, password: hashedPassword})
      res.status(201).send("regist is success")
    } catch (err) {
      res.status(500).send({    message: err.message})  
    }
})

app.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const findUser = user.find((data) => email == data.email);
        if (!findUser) {
            res.status(400).send("wrong email")
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if  (passwordMatch) {
            res.status(200).send("logged in successed")
        }   else {
            res.status(400).send("something wrong");
        }
    } catch (err) {
        res.status(500).send({  message: err.message});
    }
})

app.listen(port, () => {
    console.log("Server is run")
})