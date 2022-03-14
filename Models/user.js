const mongoose = require("mongoose");
const slugify = require("slugify");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: "Please provide a description",
  },
  profile_picture: {
    type: String,
    trim: true,
    required: "Please enter a list price",
  },
  slug: String,
  tags: [String],
});
userSchema.pre("save", function (next) {
  if (!this.isModified("caption", "price", "title")) {
    next();
    return;
  }
  this.slug = slugify(this.username);
  next();
});
module.exports = mongoose.model("User", userSchema);