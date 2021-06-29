import express from 'express';
import { Request, Response } from  'express';
import compression from 'compression';
import  helmet from 'helmet';
import { sendMail } from './nodemailler';
import bodyParser from 'body-parser';
import cors from 'cors'


const app: express.Application = express();
const port = process.env.PORT || 5000

app.use(cors());
app.options('', cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());


app.post('/text-mail', (req: Request, res: Response) => sendMail(req,res));

app.get('/', (req: Request, res: Response) =>  
res.status(200).send({ message: "application up"}));

  app.listen(port, () => console.log(`Server listening on port ${port}`));


