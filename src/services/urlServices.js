import { nanoid } from "nanoid";
import Url from "../models/urlModel.js";
import config from "../config/config.js";
import validator from "validator";


export const createShortUrl = async(req)=>{
    const {originalUrl,customCode} = req.body

    //Validation
    if(!originalUrl || !validator.isURL(originalUrl)){
        return res.status(400).json({
            success:false,
            body:"Invalid url"
        })
    }

    //Check if url already exists
    const existingUrl = await Url.findOne({originalUrl})
    if(existingUrl){
        return res.status(200).json({
            success:true,
            body:{
                shortUrl:config.BASE_URL + "/" + existingUrl.shortCode,
                shortCode:existingUrl.shortCode,
                clicks:existingUrl.clicks
            }
            
        })
    }
//generate short code
    const shortCode = customCode ? customCode : nanoid(8)

    //check if custom code exists
    if(shortCode){
        const existingCode = await Url.findOne({shortCode})
        if(existingCode){
            return res.status(400).json({
                success:false,
                body:"Custom code already exists"
            })
        }
    }

    //create new url
    const newUrl = await Url.create({
        originalUrl,
        customCode:shortCode
    })

    return res.status(201).json({
        success:true,
        body:{
            shortUrl:config.BASE_URL + "/" + newUrl.shortCode,
            shortCode:newUrl.shortCode,
            clicks:newUrl.clicks
        }
    }
)}

