const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// cloudinary Upload Image

const cloudinaryUploadImage = async (fileToUpload)=>{
    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type : 'auto'
        });
        return data;
    } catch (error) {
        return error;
    }
}

// cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePublicId)=>{
    try {
        const result = await cloudinary.destroy(imagePublicId);
        return result;
    } catch (error) {
        return error;
    }
}
// cloudinary Remove Multiple Image
const cloudinaryRemoveMultipleImage = async (PublicIds)=>{
    try {
        const result = await cloudinary.v2.delete.resources(PublicIds);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage
}