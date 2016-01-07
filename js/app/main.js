define([
    "js/app/input",
    "js/app/renderer",
    "js/app/sprites",
    "js/app/movables",
    "js/app/level",
    "js/app/physics"],
function(
    input,
    renderer,
    sprites,
    movables,
    level,
    physics) {

    var lastTime = -1;

    var movablesArray = [];

    var gameFrame = function(timestamp) {
        var timePassed;
        
        if (lastTime === -1) {
            lastTime = timestamp;
            timePassed = 0;
        } else {
            timePassed = timestamp - lastTime;
            lastTime = timestamp;
        }
        movablesArray = movables.getMovables();
        movables.tick(timePassed);
        physics.tick(timePassed, movablesArray);
        renderer.draw();
        window.requestAnimationFrame(gameFrame);
    };

    return {
        init: function() {
            var mario = movables.createMovable({type: movables.movableTypes.MARIO,
                                    x: 40,
                                    y: 10,
                                    inputId: 0});
            mario.spawn();

            var luigi = movables.createMovable({type: movables.movableTypes.LUIGI,
                                    x: 100,
                                    y: 10,
                                    inputId: 1});
            luigi.spawn();

            var turtle = movables.createMovable({type: movables.movableTypes.GREEN_TURTLE,
                                    x: 140,
                                    y: 10});
            turtle.spawn();

            /*
            movables.createMovable({type: movables.movableTypes.GREEN_TURTLE,
                                    x: 160,
                                    y: 10});
            */

            movablesArray = movables.getMovables();

            var spr = sprites.getSprites();
            renderer.setSprites(spr);

            var map = level.getMap();
            var mapSprites = level.getMapSprites();
            renderer.setMap(map, mapSprites);

            window.requestAnimationFrame(gameFrame);
        }
    };
});
