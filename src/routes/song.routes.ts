import { Router } from "express";
import * as songController from "../controllers/song.controller";

const router = Router();

router.get("/songs", songController.getSongs);
router.get("/songs/:id", songController.getSong);
router.post("/songs", songController.addSong);
router.put("/songs/:id", songController.updateSong);
router.delete("/songs/:id", songController.deleteSong);

export default router;
