var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var sharp = require('sharp');

router.get('/', function (req, res, next) {
	res.render('index.html', { title: 'Express' });
});

router.post('/upload', async function (req, res, next) {
	const [fields, files] = await parseForm(req);
	sharp(files.attach)
		.resize(200, 300, {
			kernel: sharp.kernel.nearest,
			fit: 'contain',
			position: 'right top',
			background: { r: 255, g: 255, b: 255, alpha: 0.5 }
		})
		.toFile('output.jpg', function (err) {
			if (err) console.log(err);
			response.sendFile('output.jpg');
		})
		.then(() => {
			// output.png is a 200 pixels wide and 300 pixels high image
			// containing a nearest-neighbour scaled version
			// contained within the north-east corner of a semi-transparent white canvas
		});
})


const parseForm = (req) => {
	var form = new formidable.IncomingForm();
	return new Promise(
		function (resolve, reject) {
			form.parse(req, (err, fields, files) => {
				if (err) reject(err);
				else resolve([fields, files]);
			})
		})
}
module.exports = router;
