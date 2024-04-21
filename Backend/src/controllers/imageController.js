const cloudinary = require('../config/cloudinaryConfig');
const { Readable } = require('stream');

// Function to upload image to Cloudinary
exports.uploadImage = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No image file provided.');
      }

    try {
        const uploadedImages = [];
        for (const file of req.files) {

            //Convert buffer to a readable stream
            const readableStream = new Readable();
            readableStream.push(file.buffer);
            readableStream.push(null); // Indicates the end of the stream

            // Upload the image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: 'CycleVale' // specify the folder name in Cloudinary
                }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });

                readableStream.pipe(uploadStream);
            });

            uploadedImages.push(result.secure_url);
        }

        res.status(200).send( uploadedImages );
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
};
