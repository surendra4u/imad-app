var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one': {
		title: 'Article One | Surendra',
		heading: 'Article One',
		date: '31 July, 2017',
		content:
			'<p> This is the content for my first Article.  This is the content for my first Article. </p> <p> This is the content for my first Article. This is the content for my first Article. This is the content for my first Article. This is the content for my first Article. This is the content for my first Article.</p><p>This is the content for my first Article. This is the content for my first Article. This is the content for my first Article. This is the content for my first Article. This is the content for my first Article. This is the content for my first Article. This is the content for my first Article. This is the content for my first Article. .....</p>'
	},
	'article-two': {
			title: 'Article Two | Narendra',
			heading: 'Article Two',
			date: '01 Aug, 2017',
			content:
				'<p> This is the content for my second Article. This is the content for my second Article.</p>'
	},
	'article-three': {
			title: 'Article Three | Verandra',
			heading: 'Article Three',
			date: '17 Aug, 2017',
			content:
				'<p> This is the content for my third Article.  </p>'

	}
};

function createTemplate(data){
	var title = data.title;
	var headding = data.headding;
	var date = data.date;
	var content = data.content;
	var htmlTemplate = `
	<HTML>
	<HEAD>
	<TITLE> ${title} </TITLE>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	 <link href="/ui/style.css" rel="stylesheet" />
	</HEAD>
	<BODY>
		<div class="container" >
			<div>
				<a href="/">Home</a>
			</div>
			<hr>
			<h3>${headding}</h3>
			<div>
				${date}
			</div>
			<div>
				${content}
			</div>
		</div>
	</BODY>
	</HTML>
	`;
	return htmlTemplate;
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articalName', function (req, res) {
	var articalName=req.params.articalName;
  res.send(createTemplate(articles[articalName]));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
