var objectCollision = function(movement) {
    var collisionPoints = {};
    var playerCoords = {left: 0, top: 0, topEnd: 0, leftEnd: 0};

    function collision(blockElement) {
        var x1 = $("#player").offset().left;
        var y1 = $("#player").offset().top;
        var h1 = $("#player").outerHeight(true);
        var w1 = $("#player").outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = blockElement.offset().left;
        var y2 = blockElement.offset().top;
        var h2 = blockElement.outerHeight(true);
        var w2 = blockElement.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 <= y2 || y1 >= b2 || r1 <= x2 || x1 >= r2) {
            return false;
        }

        return true;
    }

    function getPlayerCoordinates() {
        setInterval(function() {
            var posLeft = parseInt($("#player").css("left") || 0);
            var leftPosEnd = posLeft + $("#player").width();
            var posTop = parseInt($("#player").css("top") || 0);
            var topPosEnd = posTop + $("#player").height();

            playerCoords = {left: posLeft, top: posTop, topEnd: topPosEnd, leftEnd: leftPosEnd};
        }, 20);
    }

    function setCollisionPoints() {
        $(".collision").each(function() {
            var id = $(this).attr("id");
            var leftPos = parseInt($(this).css("left"));
            var leftPosEnd = leftPos + $(this).width();
            var topPos = parseInt($(this).css("top"));
            var topPosEnd = topPos + $(this).height();

            collisionPoints[id] = {left: leftPos, top: topPos, topEnd: topPosEnd, leftEnd: leftPosEnd};
        });
    }
    
    function startCollisionDetection() {
        setInterval(function() {
            for (var index in collisionPoints) {
                var obj = collisionPoints[index];

                if (collision($("#" + index))) {
                    var changeParams = {};
                    var lastKey = movement.getLastKeyPressed();

                    if (lastKey == 37) {
                        changeParams = {left: (obj.leftEnd + 10)};
                    } else if (lastKey == 38) {
                        changeParams = {top: (obj.topEnd + 10)};
                    } else if (lastKey == 39) {
                        changeParams = {left: (obj.left - 40)};
                    } else if (lastKey == 40) {
                        changeParams = {top: (obj.top - 43)};
                    }

                    $("#player").css(changeParams);
                }
            }
        }, 50);
    }

    this.__construct = function() {
        getPlayerCoordinates();
        setCollisionPoints();
        startCollisionDetection();
    };
};