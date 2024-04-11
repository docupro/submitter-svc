import express from 'express';
import { ApplyVoter} from './ApplyVoter.js';
import { checkvoter } from './checkvoter.js'
const router = express.Router();
import cors from 'cors';
// import bodyParser from 'body-parser';

const corsOptions = {
    origin: 'http://localhost:3000',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  }; 

//   const app =express();
//   app.use(bodyParser());

router.get("/",(req,res)=>{

    return res.send({
        "Port":"Running on 1000"
    })

})
  router.post("/applyvoter",cors(corsOptions),async (req, res) => {
    try {
        const resp = await ApplyVoter(req.body);
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/checkvoterid",cors(corsOptions),async (req, res) => {
    try {
        const resp = await checkvoter(req.body);
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;

