import multer from "multer";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLUDINARY_API_SECRET,
});
