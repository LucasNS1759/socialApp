const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer ({storage});


module.exports = upload;


//router.post("/upload", upload.single("file"), async (req, res) => {
    // try {
    //     const fileBuffer = req.file.buffer.toString("base64"); // Convertir archivo a base64
    //     const result = await uploadToCloudinary(`data:${req.file.mimetype};base64,${fileBuffer}`);
    //     res.json({ url: result.secure_url });
    //   } catch (err) {
    //     res.status(500).json({ error: "Error subiendo archivo" });
    //   }
    // });
    