import { nanoid } from "nanoid";
import Url from "../models/urlModel.js";
import config from "../config/config.js";
import validator from "validator";

export const createShortUrl = async (req, res) => {
    const { originalUrl, shortCode } = req.body;

    // Validate URL
    if (!originalUrl || !validator.isURL(originalUrl)) {
        return res.status(400).json({
            success: false,
            body: "Invalid URL"
        });
    }

    // Check if URL already exists
    const existingUrl = await Url.findOne({ originalUrl });

    // Return existing URL only if no custom short code is provided
    if (existingUrl && !shortCode) {
        return res.status(200).json({
            success: true,
            body: {
                shortUrl: `${config.BASE_URL}/${existingUrl.shortCode}`,
                shortCode: existingUrl.shortCode,
                clicks: existingUrl.clicks
            }
        });
    }

    // Generate short code
    const generatedCode = shortCode || nanoid(8);

    // Check if short code already exists
    const existingCode = await Url.findOne({
        shortCode: generatedCode
    });

    if (existingCode) {
        return res.status(400).json({
            success: false,
            body: "Short code already exists for other URL, please choose a different code"
        });
    }

    // Create new URL
    const newUrl = await Url.create({
        originalUrl,
        shortCode: generatedCode
    });

    return res.status(201).json({
        success: true,
        body: {
            shortUrl: `${config.BASE_URL}/${newUrl.shortCode}`,
            shortCode: newUrl.shortCode,
            clicks: newUrl.clicks
        }
    });
};


export const redirectToOriginalUrl = async (req, res) => {
    const { shortCode } = req.params
    try {
        const url = await Url.findOne({ shortCode })
        if (!url) {
            return res.status(404).json({
                success: false,
                body: "Short code not found"
            })
        }
        url.clicks += 1
        await url.save()
        return res.status(302).redirect(url.originalUrl)
    } catch (error) {
        return res.status(500).json({
            success: false,
            body: "Internal server error"
        })
    }
}

export const getUrlStats = async(req,res)=>{
    const {shortCode} = req.params
    try {
        const url = await Url.findOne({shortCode})
        if(!url){
            return res.status(404).json({
                success:false,
                body:"Short code not found"
            })
        }
        return res.status(200).json({
            success:true,
            body:{
                shortCode:url.shortCode,
                originalUrl:url.originalUrl,
                clicks:url.clicks
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            body: "Internal server error"
        })
    }
}