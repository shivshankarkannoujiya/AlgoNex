import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },

    filename: function (_, file, cb) {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1000 * 1000,
    },
});
