import express from "express";
import {ApplyVoter} from '../ApplyVoter.js'
const router = express.Router();

router.post("/applyvoter", async (req, res) => {
    try {
        const resp = await ApplyVoter(req.body);
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
