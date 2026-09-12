const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- Debug check: remove once uploads work ---
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error(
    '❌ Cloudinary env vars are missing/undefined. ' +
    'Your .env is not being read. Check its location and that dotenv loads before this file.'
  );
} else {
  console.log('✅ Cloudinary config loaded for cloud:', process.env.CLOUDINARY_CLOUD_NAME);
}
// ---------------------------------------------

module.exports = cloudinary;
