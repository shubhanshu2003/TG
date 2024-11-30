import express from 'express';
import cors from 'cors'
import OpenAI from 'openai';
import 'dotenv/config'


const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;

app.post('/post',async(req,res)=>{
    try {
    const {prompt} = req.body;
    console.log(prompt)
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
      });
      let result ;
    //   async function main() {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant that will give title of the video." },
                {
                    role: "user",
                    content: `${prompt} , this is title generate multiple titles for video of this type`,
                },
            ],
        //   messages: [{ role: 'user', content: 'give me list of names to be given to a black dog' }],
          model: 'gpt-4o',
        });
        result = chatCompletion.choices[0].message.content
        console.log(result)
    //   }
      
    //   main();
      res.status(201).send({data :result })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})




app.listen(port,()=>{
    console.log("listeing on 3000")
})