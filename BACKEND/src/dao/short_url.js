
import urlSchema from "../models/short_url.model.js"
import { ConflictError } from "../utils/errorHandler.js"

export const saveShortUrl = async (shortUrl, longUrl, userId) =>
{
    try{
    const newUrl = new urlSchema({
        full_url:longUrl,
        short_url:shortUrl
    })
    if (userId){
        newUrl.user = userId
    }
    await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short Url already exists")
    }
    throw new Error(err)
    }    
    
}

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate(
        {short_url: shortUrl}, 
        {$inc: {clicks: 1}},
        {new: true}
    ).populate('user', 'name email');
}


export const getCustomShortUrl = async(slug)=>{
    return await urlSchema.findOne({short_url:slug})
}

export const getShortUrlsByUser = async (userId) => {
    return await urlSchema.find({ user: userId })
        .populate('user', 'name email')
        .select("full_url short_url clicks user")
        .lean();
}

