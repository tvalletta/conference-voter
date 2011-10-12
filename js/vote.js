var socket;
var connect = function() {
	socket = io.connect('http://127.0.0.1:3001');

	socket.on('ack', function(data) {
		console.log(data);
	});

	socket.on('vote', function(data, clientId) {
        Poll.vote(data.answer);
	});
};
connect();

var Poll = (function() {
    var PI2 = Math.PI * 2;

    var colors = {
        'a' : 'rgb(0, 138, 53)',
        'b' : 'rgb(0, 102, 204)',
        'c' : 'rgb(255, 0, 0)',
        'd' : 'rgb(255, 211, 25)'
    };

    var results = {};

    var draw = function(canvas) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);

        var startAngle = 0;
        var total = 0;

        for (var a in results) {
            total += results[a];
        }

        for (var ans in results) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(250, 250);
            var percent = results[ans] / total;
            var endAngle = startAngle + (PI2 * percent);
            ctx.arc(250, 250, 250, startAngle, endAngle, false);
            startAngle = endAngle;
            ctx.fillStyle = colors[ans];
            ctx.fill();
            ctx.restore();
        }
    };

    return {
        vote : function(answer) {
            var canvas = document.findElementById('results');
            if(canvas){
                results[answer.toLowerCase()]++;
                draw(canvas);
            }
        },

        reset : function() {
            results = {
                'a' : 10,
                'b' : 10,
                'c' : 10,
                'd' : 10,
				'e' : 10
            }
        }
    }
}());
