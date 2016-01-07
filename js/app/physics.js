define([
    "js/app/debug",
    "js/app/level"],
function(
    debug,
    level) {

    var MARIO_ACC_RUNNING = 400;
    var MARIO_VEL_X_MAX   = 150;
    var MARIO_FRICTION_X  = 250;
    var GRAVITY           = 1500;
    var VEL_Y_MAX         = 600;
    var MAX_ITERATIONS    = 200;
    var BOUNCED_VEL_Y     = -300;
    var DYING_VEL_Y       = -400;

    var map = level.getMap();

    var calculateNewPosition = function(movable, timePassed, keyState) {

        var keyRightPressed = keyState && keyState.right;
        var keyLeftPressed  = keyState && keyState.left;

        var rightFrictionApplied = false;
        var leftFrictionApplied = false;

        if (movable.affectedByFriction) {
            // Apply friction if key in the face direction is not pressed
            if (movable.velX > 0 && movable.facing === "right" && !keyRightPressed) {
                movable.accX = -MARIO_FRICTION_X;
                rightFrictionApplied = true;
            } else if (movable.velX < 0 && movable.facing === "left" && !keyLeftPressed) {
                movable.accX = MARIO_FRICTION_X;
                leftFrictionApplied = true;
            }
        }

        movable.x    += (movable.velX * timePassed / 1000);
        movable.velX += (movable.accX * timePassed / 1000);

        if (rightFrictionApplied && movable.velX < 0) {
            movable.velX = 0;
            movable.accX = 0;
        } else if (leftFrictionApplied && movable.velX > 0) {
            movable.velX = 0;
            movable.accX = 0;
        }

        if (movable.velX > MARIO_VEL_X_MAX) {
            movable.velX = MARIO_VEL_X_MAX;
        } else if (movable.velX < -MARIO_VEL_X_MAX) {
            movable.velX = -MARIO_VEL_X_MAX;
        }

        movable.y    += (movable.velY * timePassed / 1000);
        movable.velY += (movable.accY * timePassed / 1000);

        if (movable.velY > VEL_Y_MAX) {
            movable.velY = VEL_Y_MAX;
        }

        movable.x = Math.round(movable.x);
        movable.y = Math.round(movable.y);
    };

    var rectanglesOverlap = function(rectA, rectB) {
        var overlapX = (rectA.x1 >= rectB.x0) && (rectA.x0 <= rectB.x1);
        var overlapY = (rectA.y1 >= rectB.y0) && (rectA.y0 <= rectB.y1);
        return (overlapX && overlapY);
    };

    var pointAndRectangleOverlap = function(point, rect) {
        return ((point.x >= rect.x0) && (point.x <= rect.x1) &&
                (point.y >= rect.y0) && (point.y <= rect.y1));
    };

    var pointAndMovableOverlap = function(point, movable) {
        return (point.x >= movable.x && point.x <= (movable.x + movable.sprite.spriteSheetPosition.w - 1) &&
                point.y >= movable.y && point.y <= (movable.y + movable.sprite.spriteSheetPosition.h - 1));
    };

    var rectangleAndMovableOverlap = function(rect, movable) {
        var overlapX = (rect.x1 >= movable.x) && (rect.x0 <= (movable.x + movable.sprite.spriteSheetPosition.w - 1));
        var overlapY = (rect.y1 >= movable.y) && (rect.y0 <= (movable.y + movable.sprite.spriteSheetPosition.h - 1));
        return (overlapX && overlapY);
    };

    // 'strict' is optional. If set to true, the function will disregard calling the movable's
    // collidableWithMapUnit function, i.e. all map unit types will be considered collidable
    var movableAndMapOverlap = function(movable, offsetX, offsetY, strict) {
        var x, y;

        if (!movable.collidable) {
            return false;
        }

        offsetX = offsetX || 0;
        offsetY = offsetY || 0;

        var movableUnitX0 = Math.floor((movable.x + offsetX) / level.unitWidth);
        var movableUnitX1 = Math.floor((movable.x + offsetX + movable.sprite.spriteSheetPosition.w - 1) / level.unitWidth);

        var movableUnitY0 = Math.floor((movable.y + offsetY) / level.unitHeight);
        var movableUnitY1 = Math.floor((movable.y + offsetY + movable.sprite.spriteSheetPosition.h - 1) / level.unitHeight);

        for (x=movableUnitX0; x<=movableUnitX1; x++) {
            for (y=movableUnitY0; y<=movableUnitY1; y++) {
                if (x>=0 && y>=0 && x<level.numUnitsX && y<level.numUnitsY && map[y][x]) {
                    if (strict || movable.collidableWithMapUnit(map[y][x])) {
                        if (rectanglesOverlap({ x0: x*level.unitWidth,
                                                y0: y*level.unitHeight,
                                                x1: x*level.unitWidth+level.unitWidth-1,
                                                y1: y*level.unitHeight+level.unitHeight-1},
                                            {   x0: movable.x,
                                                y0: movable.y,
                                                x1: movable.x+movable.sprite.spriteSheetPosition.w-1,
                                                y1: movable.y+movable.sprite.spriteSheetPosition.h-1})) {
                            return map[y][x];
                        }
                    }
                }
            }
        }
        return false;
    };

    var pointAndMapOverlap = function(point) {
        var pointUnitX = Math.floor(point.x / level.unitWidth);
        var pointUnitY = Math.floor(point.y / level.unitHeight);

        if (pointUnitX >= 0 && pointUnitY >= 0 && pointUnitX < level.numUnitsX && pointUnitY < level.numUnitsY) { 
            var mapData = map[pointUnitY][pointUnitX];
            if (mapData) {
                return mapData;
            }
        }
        return null;
    };

    var movablesOverlap = function(movable, movables, offsetX, offsetY) {
        var i;

        if (!movable.collidable) {
            return false;
        }

        offsetX = offsetX || 0;
        offsetY = offsetY || 0;

        for (i=0; i<movables.length; i++) {
            if (movables[i] !== movable) {
                if (movables[i].collidable && rectanglesOverlap({
                                                x0: Math.floor(movable.x + offsetX),
                                                y0: Math.floor(movable.y + offsetY),
                                                x1: Math.floor(movable.x + offsetX + movable.sprite.spriteSheetPosition.w - 1),
                                                y1: Math.floor(movable.y + offsetY + movable.sprite.spriteSheetPosition.h - 1)},
                                            {   x0: Math.floor(movables[i].x),
                                                y0: Math.floor(movables[i].y),
                                                x1: Math.floor(movables[i].x + movables[i].sprite.spriteSheetPosition.w - 1),
                                                y1: Math.floor(movables[i].y + movables[i].sprite.spriteSheetPosition.h - 1)})) {
                    return true;
                }
            }
        }
        return false;
    };

    var moveToCollisionFreeSpace = function(movable, movables) {
        var offsetX = 0;
        var offsetY = 0;
        var initialX = movable.x;
        var initialY = movable.y;

        if (movable.id === 0) {
            //console.log("moveToCollisionFreeSpace");
        }

        for (offsetX = 0; offsetX > -10; offsetX--) {

            if (movable.id === 0) {
                //console.log("A try offsetX " + offsetX + " offsetY " + offsetY);
            }

            if (!movableAndMapOverlap(movable, offsetX, offsetY) && !movablesOverlap(movable, movables, offsetX, offsetY)) {
                movable.x += offsetX;
                movable.y += offsetY;
                return;
            }
        }

        offsetX = 0;
        offsetY = 0;
        movable.x = initialX;
        movable.y = initialY;

        for (offsetX = 1; offsetX < 10; offsetX++) {

            if (movable.id === 0) {
                //console.log("B try offsetX " + offsetX + " offsetY " + offsetY);
            }


            if (!movableAndMapOverlap(movable, offsetX, offsetY) && !movablesOverlap(movable, movables, offsetX, offsetY)) {
                movable.x += offsetX;
                movable.y += offsetY;
                return;
            }
        }

        offsetX = 0;
        offsetY = 0;
        movable.x = initialX;
        movable.y = initialY;

        for (offsetY = 0; offsetY > -10; offsetY--) {
            if (movable.id === 0) {
                //console.log("C try offsetX " + offsetX + " offsetY " + offsetY);
            }


            if (!movableAndMapOverlap(movable, offsetX, offsetY) && !movablesOverlap(movable, movables, offsetX, offsetY)) {
                movable.x += offsetX;
                movable.y += offsetY;
                return;
            }
        }

        offsetX = 0;
        offsetY = 0;
        movable.x = initialX;
        movable.y = initialY;

        for (offsetY = 1; offsetY < 10; offsetY++) {
            if (!movableAndMapOverlap(movable, offsetX, offsetY) && !movablesOverlap(movable, movables, offsetX, offsetY)) {
                movable.x += offsetX;
                movable.y += offsetY;
                return;
            }
        }

        console.log("Warning: did not find collision free space");
    };

    var fallCheck = function(movable, movables) {
        var underLeft  = {x: movable.x, y: movable.y+movable.sprite.spriteSheetPosition.h};
        var underRight = {x: movable.x+movable.sprite.spriteSheetPosition.w-1, y: movable.y+movable.sprite.spriteSheetPosition.h};
        var i, inAir = true;

        if (movable.collidable) {
            if (pointAndMapOverlap(underLeft) || pointAndMapOverlap(underRight)) {
                inAir = false;
            } else {
                for (i=0; i<movables.length; i++) {
                    if (movables[i] !== movable) {
                        if (pointAndMovableOverlap(underLeft, movables[i]) || pointAndMovableOverlap(underRight, movables[i])) {
                            inAir = false;
                            break; 
                        }
                    }
                }
            }
        }

        if (inAir) {
            if (movable.affectedByGravity) {
                if (movable.jumping && movable.keyState.up && movable.jumpTime < 500) {
                    movable.accY = Math.floor(GRAVITY / 2);
                } else {
                    movable.accY = GRAVITY;
                }
            }
        } else {
            // On ground
            movable.jumping = false;
            movable.accY = 0;
            movable.velY = 0;
            if (!movable.keyState.up) {
                movable.jumpAllowed = true;
            }
            if (movable.upSideDown) {
                movable.velX = 0;
            }
        }
    };

    var tick = function(timePassed, movables) {
        var i, j;
        var movablePairCollision, mapCollision;
        var anyMovableNeedsCollisionResolution = false;
        var largestDeltaMovement;
        var iterations;

        for (i=0; i<movables.length; i++) {
            movables[i].needsCollisionResolution = false;
            movables[i].collidingPoints = {};
            movables[i].subjectedToCollisionResolution = false;
        }

        for (i=0; i<movables.length; i++) {
            movables[i].oldX = movables[i].x;
            movables[i].oldY = movables[i].y;

            calculateNewPosition(movables[i], timePassed, movables[i].keyState);
            if (movables[i].velX !== 0 || movables[i].velY !== 0) {
                mapCollision = movableAndMapOverlap(movables[i]);
                if (!mapCollision) {
                    movablePairCollision = movablesOverlap(movables[i], movables);
                    if (movablePairCollision) {
                        movables[i].needsCollisionResolution = true;
                        anyMovableNeedsCollisionResolution = true;
                    }
                } else {
                    movables[i].needsCollisionResolution = true;
                    anyMovableNeedsCollisionResolution = true;
                }
            }
        }

        if (anyMovableNeedsCollisionResolution) {

            largestDeltaMovement = -1;
            iterations = 0;

            // Put back all movables to their previous positions
            for (i=0; i<movables.length; i++) {
                // Remember where this movable tried to go
                movables[i].wantedX = movables[i].x;
                movables[i].wantedY = movables[i].y;
                // Put back the movable to its previous position
                movables[i].x = movables[i].oldX;
                movables[i].y = movables[i].oldY;

                movables[i].deltaX = movables[i].wantedX - movables[i].x;
                movables[i].deltaY = movables[i].wantedY - movables[i].y;

                largestDeltaMovement = Math.max(largestDeltaMovement, Math.abs(movables[i].deltaX));
                largestDeltaMovement = Math.max(largestDeltaMovement, Math.abs(movables[i].deltaY));
            }
            // Move all movables one pixel at a time until they collide
            do {
                anyMovableNeedsCollisionResolution = false;
                for (i=0; i<movables.length; i++) {
                    if (movables[i].needsCollisionResolution) {
                        anyMovableNeedsCollisionResolution = true;
                        break;
                    }
                }
                if (anyMovableNeedsCollisionResolution) {
                    for (i=0; i<movables.length; i++) {
                        if (movables[i].deltaX !== 0) {
                            movables[i].x = movables[i].oldX + Math.round(movables[i].deltaX * (iterations / largestDeltaMovement));
                        }
                        if (movables[i].deltaY !== 0) {
                            movables[i].y = movables[i].oldY + Math.round(movables[i].deltaY * (iterations / largestDeltaMovement));
                        }
                    }
                
                    for (i=0; i<movables.length; i++) {
                        if (movables[i].needsCollisionResolution) {
                            var mapData;
                            var aboveLeft  = {x: movables[i].x, y: movables[i].y-1};
                            var aboveRight = {x: movables[i].x+movables[i].sprite.spriteSheetPosition.w-1, y: movables[i].y-1};
                            var underLeft  = {x: movables[i].x, y: movables[i].y+movables[i].sprite.spriteSheetPosition.h};
                            var underRight = {x: movables[i].x+movables[i].sprite.spriteSheetPosition.w-1, y: movables[i].y+movables[i].sprite.spriteSheetPosition.h};
                            var leftUpper  = {x: movables[i].x-1, y: movables[i].y};
                            var leftLower  = {x: movables[i].x-1, y: movables[i].y+movables[i].sprite.spriteSheetPosition.h-1};
                            var rightUpper = {x: movables[i].x+movables[i].sprite.spriteSheetPosition.w, y: movables[i].y};
                            var rightLower = {x: movables[i].x+movables[i].sprite.spriteSheetPosition.w, y: movables[i].y+movables[i].sprite.spriteSheetPosition.h-1};

                            movables[i].subjectedToCollisionResolution = true;

                            // Check collision points with map
                            if (movables[i].velY < 0) {
                                mapData = pointAndMapOverlap(aboveLeft);
                                if (mapData) {
                                    movables[i].collidingPoints["aboveLeftMap"] = mapData;
                                    movables[i].needsCollisionResolution = false;
                                }
                                mapData = pointAndMapOverlap(aboveRight);
                                if (mapData) {
                                    movables[i].collidingPoints["aboveRightMap"] = mapData;
                                    movables[i].needsCollisionResolution = false;
                                }
                            }
                            if (movables[i].velY > 0) {
                                mapData = pointAndMapOverlap(underLeft);
                                if (mapData) {
                                    movables[i].collidingPoints["underLeftMap"] = mapData;
                                    movables[i].needsCollisionResolution = false;
                                }
                                mapData = pointAndMapOverlap(underRight);
                                if (mapData) {
                                    movables[i].collidingPoints["underRightMap"] = mapData;
                                    movables[i].needsCollisionResolution = false;
                                }
                            }
                            if (movables[i].velX < 0) {
                                mapData = pointAndMapOverlap(leftUpper);
                                if (mapData) {
                                    movables[i].collidingPoints["leftUpperMap"] = mapData;
                                    movables[i].needsCollisionResolution = false;
                                }
                                mapData = pointAndMapOverlap(leftLower);
                                if (mapData) {
                                    movables[i].collidingPoints["leftLowerMap"] = mapData;
                                    movables[i].needsCollisionResolution = false;
                                }
                            }
                            if (movables[i].velX > 0) {
                                mapData = pointAndMapOverlap(rightUpper);
                                if (mapData) {
                                    movables[i].collidingPoints["rightUpperMap"] = mapData;
                                    movables[i].needsCollisionResolution = false;
                                }
                                mapData = pointAndMapOverlap(rightLower);
                                if (mapData) {
                                    movables[i].collidingPoints["rightLowerMap"] = mapData;
                                    movables[i].needsCollisionResolution = false;
                                }
                            }

                            // Check collision points with other movables
                            for (j=0; j<movables.length; j++) {
                                if (i !== j) {
                                    if (movables[i].velY < 0) {
                                        if (pointAndMovableOverlap(aboveLeft, movables[j])) {
                                            movables[i].collidingPoints["aboveLeftMovable"] = movables[j];
                                            movables[j].collidingPoints["underLeftMovable"] = movables[i];
                                            movables[i].needsCollisionResolution = false;
                                        }
                                        if (pointAndMovableOverlap(aboveRight, movables[j])) {
                                            movables[i].collidingPoints["aboveRightMovable"] = movables[j];
                                            movables[j].collidingPoints["underRightMovable"] = movables[i];
                                            movables[i].needsCollisionResolution = false;
                                        }
                                    }
                                    if (movables[i].velY > 0) {
                                        if (pointAndMovableOverlap(underLeft, movables[j])) {
                                            movables[i].collidingPoints["underLeftMovable"] = movables[j];
                                            movables[j].collidingPoints["aboveLeftMovable"] = movables[i];
                                            movables[i].needsCollisionResolution = false;
                                        }
                                        if (pointAndMovableOverlap(underRight, movables[j])) {
                                            movables[i].collidingPoints["underRightMovable"] = movables[j];
                                            movables[j].collidingPoints["aboveRightMovable"] = movables[i];
                                            movables[i].needsCollisionResolution = false;
                                        }
                                    }
                                    if (movables[i].velX < 0) {
                                        if (pointAndMovableOverlap(leftUpper, movables[j])) {
                                            movables[i].collidingPoints["leftUpperMovable"] = movables[j];
                                            movables[j].collidingPoints["rightUpperMovable"] = movables[i];
                                            movables[i].needsCollisionResolution = false;
                                        }
                                        if (pointAndMovableOverlap(leftLower, movables[j])) {
                                            movables[i].collidingPoints["leftLowerMovable"] = movables[j];
                                            movables[j].collidingPoints["rightLowerMovable"] = movables[i];
                                            movables[i].needsCollisionResolution = false;
                                        }
                                    }
                                    if (movables[i].velX > 0) {
                                        if (pointAndMovableOverlap(rightUpper, movables[j])) {
                                            movables[i].collidingPoints["rightUpperMovable"] = movables[j];
                                            movables[j].collidingPoints["leftUpperMovable"] = movables[i];
                                            movables[i].needsCollisionResolution = false;
                                        }
                                        if (pointAndMovableOverlap(rightLower, movables[j])) {
                                            movables[i].collidingPoints["rightLowerMovable"] = movables[j];
                                            movables[j].collidingPoints["leftLowerMovable"] = movables[i];
                                            movables[i].needsCollisionResolution = false;
                                        }
                                    }
                                }
                            }                        
                        }
                    }
                    for (i=0; i<movables.length; i++) {
                        if (movables[i].subjectedToCollisionResolution) {
                            if (movables[i].x === movables[i].wantedX && movables[i].y === movables[i].wantedY) {
                                movables[i].needsCollisionResolution = false;
                                moveToCollisionFreeSpace(movables[i], movables);
                            }
                        }
                    }
                    iterations++;
                }
            } while (anyMovableNeedsCollisionResolution && iterations < MAX_ITERATIONS);
        }

        // Check if any movables should start falling
        for (i=0; i<movables.length; i++) {
            fallCheck(movables[i], movables);
        }

        // Let all movables know that their positions may have been updated and that they
        // need to check their collision points
        for (i=0; i<movables.length; i++) {
            movables[i].positionUpdated();
        }
    };

    return {
        tick: tick,
        moveToCollisionFreeSpace:   moveToCollisionFreeSpace,
        movableAndMapOverlap:       movableAndMapOverlap,
        rectangleAndMovableOverlap: rectangleAndMovableOverlap,
        BOUNCED_VEL_Y:              BOUNCED_VEL_Y,
        DYING_VEL_Y:                DYING_VEL_Y
    };
});
