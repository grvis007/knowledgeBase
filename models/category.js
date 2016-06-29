var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	title: {
		type:String,
		required:true,
		index:true
	},
	description: {
		type:String
	}
});

//model that we want is Article model and we want the articleSchema
var Category = module.exports = mongoose.model('Category',categorySchema);

module.exports.getCategories = function(callback) {
	Category.find(callback);
}

module.exports.getCategoryById = function(id,callback) {
	Category.findById(id,callback)
}

//get article by category
module.exports.getArticlesByCategory = function(category,callback) {
	//so we want the artcile category field to match in the category which comes from the function argument
	var query = {category:category};
	Article.find(query,callback);
}

module.exports.createCategory = function(newCategory,callback) {
	newCategory.save(callback);
}