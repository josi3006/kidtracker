const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./client/public/index.html"));
});


io.on('connection', (socket) => {
	console.log('Socket Connected.  All systems go.');

	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});


	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	  });




// //   Listen for chatMessage
//   socket.on('chatMessage', msg => {
//     const user = getCurrentUser(socket.id);

//     io.to(user.room).emit('message', formatMessage(user.username, msg));
//   });










});


server.listen(PORT, function () {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
