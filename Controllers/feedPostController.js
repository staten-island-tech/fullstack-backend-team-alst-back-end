const feedPost = require("../Models/feedPost");
const MarketPost = require("../Models/marketPost");

exports.getPosts = async (req, res) => {
  try {
    const post = await feedPost.find().limit(100); //.limit is limiting how many things pop up upon request
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.getFeedPostsByMe = async (req, res) => {
  try {
    const myFeedPost = await feedPost.find({ userId: req.params.id });
    res.json(myFeedPost);
  } catch (error) {
    console.log(error);
  }
};

exports.getPostByID = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await feedPost.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await feedPost.findOneAndDelete(req.params.id);
    if (!post) {
      res.status(404).send();
    }
    res.send(`${post.title} was deleted from the DB`);
  } catch (error) {
    console.log(error);
  }
};
