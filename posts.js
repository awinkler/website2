// Simulate the database
var posts = [];

// order newest to oldest
posts.push(require('./posts/postpone-dreams'));
posts.push(require('./posts/why-travel'));
posts.push(require('./posts/meditation-camp'));
posts.push(require('./posts/collect-memories'));

for (var i = 0; i < posts.length; i++) {
	posts[i].id = function () {
		var str = this.title;
		// remove question mark
		str = str.replace(/\?/g,'')
		// remove appostrophies
		str = str.replace("'",'');
		// replace space with dashes
		str = str.replace(/\s+/g, '-').toLowerCase();

		return str;
	}

	posts[i].index = i;
}

module.exports = posts;



