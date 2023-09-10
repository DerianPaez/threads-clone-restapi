import { Router } from "express";
import {
  createPost,
  deletePost,
  getFeed,
} from "../controllers/post.controllers.js";

const router = Router();

router.get("/feed", getFeed);
router.post("/create", createPost);
router.delete("/delete", deletePost);

export default router;
