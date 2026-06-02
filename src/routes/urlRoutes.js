import express from 'express';
import { createShortUrl, getUrlStats, redirectToOriginalUrl } from '../controllers/urlController.js';

const router = express.Router()

router.post("/shorten",createShortUrl)
router.get("/:shortCode", redirectToOriginalUrl)
router.get("/stats/:shortCode", getUrlStats)

export default router