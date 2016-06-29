
var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	title: {
		type:String,
		required:true,
		index:true
	},

	category:{
		type:String,
		index:true,
		required:true
	},

	body:{
		type:String,
		required:true
	},

	Date:{
		type:Date,
		default:Date.now()
	}
});

//model that we want is Article model and we want the articleSchema
var Article = module.exports = mongoose.model('Article',articleSchema);

module.exports.getArticles = function(callback) {
	Article.find(callback);
}

module.exports.getArticleById = function(id,callback) {
	Article.findById(id,callback)
}

//get article by category
module.exports.getArticlesByCategory = function(category,callback) {
	//so we want the artcile category field to match in the category which comes from the function argument
	var query = {category:category};
	Article.find(query,callback);
}

//Post methods
// Add an Article
module.exports.createArticle = function(newArticle, callback){
	newArticle.save(callback);
}

// Update Article
module.exports.updateArticle = function(id, data, callback){
	//We want to get the data and the put the field into variables.
	//R.H.S is whatever coming from user
	var title    = data.title;
	var body     = data.body;
	var category = data.category;

	//we want to match the id of the article to the article that is passes in here by user
	//var query = {_id: id};

	Article.findById(id, function(err, article){
		if(!article){
			return next(new err('Could not load article'));
		} else {
			// Update.. L.H.S is in db and R.H.S is coming from user
			article.title    = title;
			article.body     = body;
			article.category = category;

			article.save(callback);
		}
	});
}

// Remove Article
module.exports.removeArticle = function(id, callback){
	Article.find({_id: id}).remove(callback);
}