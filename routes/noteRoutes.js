import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  shareNote,
  getSharedNote,
} from "../controllers/noteController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

// Share feature
router.get("/share/:shareId", getSharedNote);
router.post("/share/:id", protect, shareNote);

export default router;