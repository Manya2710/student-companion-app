const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const  GridFsStorage  = require("multer-gridfs-storage");
const multer = require("multer");

const mongoURI = "mongodb://localhost:27017/asdfghjkl";

// Create mongoose connection
const conn = mongoose.createConnection(mongoURI);

let gfs;
let upload;
    
conn.once("open", () => {
  console.log("Mongo connection open");

  // Initialize GridFS stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  console.log("GridFS stream initialized");

  // ✅ Correct: use db object instead of mongoose connection
  const storage = new GridFsStorage({
    db: conn.db, // ✅ NOT conn, just conn.db
    file: (req, file) => {
      return {
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: "uploads",
      };
    },
  });

  upload = multer({ storage });
});

module.exports = {
  getGFS: () => gfs,
  getUpload: () => upload,
};
