var movement = function() {
    var interval = null;
    var moveSpeed = 10;
    var maxLeft = $("#wrapper").width() - $("#player").width();
    var maxTop = $("#wrapper").height() - $("#player").height();
    var lastKeyPressed = 0;

    function movePlayer(direction, type, moveSpeed, limit) {
        return setInterval(function() {
            var currentPosition = parseInt($("#player").css(direction));

            if (type == "-") {
                var newPosition = currentPosition - moveSpeed;
            } else {
                var newPosition = currentPosition + moveSpeed;
            }

            if (newPosition < 0 || newPosition > limit) {
                if (limit == undefined) {
                    newPosition = 0;
                } else {
                    newPosition = limit;
                }
            }

            if (direction == "top") {
                $("#player").css({top: newPosition});
            } else {
                $("#player").css({left: newPosition});
            }
        }, 50);
    }

    function keyDownListener() {
        addEventListener("keydown", function(e) {
            var key = e.keyCode;

            if (interval == null) {
                if (key == 37) {  //left arrow
                    interval = movePlayer("left", "-", moveSpeed);
                } else if (key == 38) { //up arrow
                    interval = movePlayer("top", "-", moveSpeed);
                } else if (key == 39) { //right arrow
                    interval = movePlayer("left", "+", moveSpeed, maxLeft);
                } else if (key == 40) { //down arrow
                    interval = movePlayer("top", "+", moveSpeed, maxTop);
                }

                lastKeyPressed = key;
            }
        }, false);
    }

    function keyUpListener() {
        addEventListener("keyup", function(e) {
            var key = e.keyCode;

            if (interval != null && key >= 37 && key <= 40) {
                clearInterval(interval);
                interval = null;
            }
        }, false);
    }

    this.getLastKeyPressed = function() {
        return lastKeyPressed;
    };

    this.__construct = function() {
        keyDownListener();
        keyUpListener();
    };
};