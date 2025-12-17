import { v2 as cloudinary } from 'cloudinary';

let isConfigured = false;

const configureCloudinary = () => {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    console.log('✅ Cloudinary Config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '❌ MISSING',
      api_key: process.env.CLOUDINARY_API_KEY ? '✅ Loaded' : '❌ MISSING',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ Loaded' : '❌ MISSING'
    });
    
    isConfigured = true;
  }
  return cloudinary;
};

export default configureCloudinary;