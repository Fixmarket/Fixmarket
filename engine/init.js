$(function() {
    var move = new movement();
    var collision = new questCollision();
    var objCollision = new objectCollision(move);

    move.__construct();
    collision.__construct();
    objCollision.__construct();
    
    
    //future quest submiter
    addEventListener("keydown", function(e) {
        if (e.keyCode == 13) {
            if (collision.getOverQuest() != null) {
                alert(collision.getOverQuest());
            }
        }
    }, false);
});