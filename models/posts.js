var Post = require('../lib/mongo.js').Post;

module.exports = {
    create : function create(post){
        return Post.create(post).exec();
    },

    getPosts: function getPosts() {
        return Post
            .find()
            .populate({ path: 'author', model: 'User' })
            .exec();
    }
};