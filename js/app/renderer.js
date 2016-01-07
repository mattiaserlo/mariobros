define([
    "js/app/debug",
    "js/app/utils"],
function(
    debug,
    utils) {

    var canvas   = document.getElementById("canvas");
    canvas.setAttribute("width",  32 * 8);
    canvas.setAttribute("height", 28 * 8);

    var context  = canvas.getContext("2d");
    context.font = "12px Arial";
    context.fillStyle = "white";

    var loaded   = false;
    var localSprites  = {};

    var map;
    var mapSprites = {};

    var spriteSheetImage = new Image();

    spriteSheetImage.onload = function() {
        loaded = true;
    };

    spriteSheetImage.src = "images/mb_spritesheet.png";

    var drawSprite = function(x, y, spriteSheetCoordinate) {
        if (loaded) {
            context.drawImage(  spriteSheetImage,
                                spriteSheetCoordinate.x,
                                spriteSheetCoordinate.y,
                                spriteSheetCoordinate.w,
                                spriteSheetCoordinate.h,
                                x,
                                y,
                                spriteSheetCoordinate.w,
                                spriteSheetCoordinate.h);
        }
    };

    var clearCanvas = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    var drawMap = function() {
        var i, j;
        if (map) {
            for (i=0; i<map.length; i++) {
                for (j=0; j<map[i].length; j++) {
                    if (map[i][j]) {
                        drawSprite(j*8, i*8, {
                                        x: mapSprites[map[i][j]].spriteSheetPosition.x,
                                        y: mapSprites[map[i][j]].spriteSheetPosition.y,
                                        w: 8,
                                        h: 8
                        });
                    }
                }
            }
        }
    };

    var drawSprites = function() {
        for (var id in localSprites) {
            var sprite = localSprites[id];
            drawSprite(sprite.x, sprite.y, {
                x: sprite.spriteSheetPosition.x,
                y: sprite.spriteSheetPosition.y,
                w: sprite.spriteSheetPosition.w,
                h: sprite.spriteSheetPosition.h
            });
        }
    };

    var drawDebugInfo = function() {
        var yOffset = 10;

        var debugStrings = debug.getStrings();
        for (var i=0; i<debugStrings.length; i++) {
            if (debugStrings[i]) {
                context.fillText(debugStrings[i], 10, yOffset);
                yOffset += 20;
            }
        }
    };

    return {
        draw: function() {
            clearCanvas();
            drawSprites();
            drawMap();
            drawDebugInfo();
        },
        setSprites: function(spr) {
            localSprites = spr;
        },
        updateSprite: function(params) {
            var sprite = localSprites[params.movableId];
            if (sprite) {
                sprite.spriteSheetPosition.x = params.spriteSheetPosition.x;
                sprite.spriteSheetPosition.y = params.spriteSheetPosition.y;
                sprite.spriteSheetPosition.w = params.spriteSheetPosition.w;
                sprite.spriteSheetPosition.h = params.spriteSheetPosition.h;
            }
        },
        removeSprite: function(movableId) {
            delete localSprites[movableId];
        },
        setMap: function(m, mapSpr) {
            map         = m;
            mapSprites  = utils.copyObj(mapSpr);
        }
    };
});
