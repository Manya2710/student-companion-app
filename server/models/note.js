const { required } = require('joi');
const mongoose=require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userData", required: true },
    title: {type: String, required: true },
    description: {type:String},
});

const Note = mongoose.model("note", noteSchema);
module.exports={Note, noteSchema};   