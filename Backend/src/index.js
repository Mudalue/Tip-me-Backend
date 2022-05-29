import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express();

const ads = [
    {title: 'Hello world again!!'}
]

app.use(helmet());
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res)=> {
    res.send(ads);
})

app.listen(3001, ()=>{
    console.log('listening on port 3001');
})
