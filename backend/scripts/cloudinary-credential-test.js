const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const fs = require("fs");
console.log("=== Step 1: dotenv loaded from backend/.env ===");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ?? "(undefined)");
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "(set, length " + process.env.CLOUDINARY_API_KEY.length + ")" : "(undefined)");
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "(set, length " + process.env.CLOUDINARY_API_SECRET.length + ")" : "(undefined)");

console.log("\n=== Step 2: require config/cloudinary.js ===");
const cloudinary = require("../config/cloudinary");

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
const testImagePath = path.join(uploadsDir, "cloudinary-credential-test.png");
fs.writeFileSync(testImagePath, Buffer.from(pngBase64, "base64"));
console.log("\n=== Step 3: Upload test image ===");
console.log("Local file:", testImagePath);

(async () => {
  try {
    const result = await cloudinary.uploader.upload(testImagePath, {
      folder: "credential-test",
      resource_type: "image",
      use_filename: true,
      unique_filename: true,
    });
    console.log("\nUPLOAD RESULT: SUCCESS");
    console.log(JSON.stringify({
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      bytes: result.bytes,
    }, null, 2));
    try {
      await cloudinary.uploader.destroy(result.public_id);
      console.log("(Cleaned up test asset:", result.public_id + ")");
    } catch (destroyErr) {
      console.log("(Could not delete test asset:", destroyErr.message + ")");
    }
  } catch (err) {
    console.log("\nUPLOAD RESULT: FAILED");
    console.log("err.message:", err.message);
    console.log("err.http_code:", err.http_code);
    console.log("err.name:", err.name);
    if (err.error) console.log("err.error:", err.error);
    console.log("Full err (util.inspect):");
    console.log(require("util").inspect(err, { depth: 5, colors: false }));
  }

  console.log("\n=== Step 4: backend/uploads folder listing ===");
  const files = fs.readdirSync(uploadsDir);
  console.log("Count:", files.length);
  files.forEach((name) => {
    const stat = fs.statSync(path.join(uploadsDir, name));
    console.log(name + " (" + stat.size + " bytes)");
  });
})();
