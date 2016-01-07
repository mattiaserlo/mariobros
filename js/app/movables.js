define([
    "js/app/sprites",
    "js/app/input",
    "js/app/physics",
    "js/app/debug",
    "js/app/utils",
    "js/app/level"],
function(
    sprites,
    input,
    physics,
    debug,
    utils,
    level) {

    var movables = [];

    var movableTypes = {
        MARIO:        "mario",
        LUIGI:        "luigi",
        GREEN_TURTLE: "greenTurtle",
        BLUE_STEEL:   "blueSteel"
    };

    var movableId = 0;

    var movablesData = {
        "mario": {
            spriteStandingStillFacingRight: sprites.spriteTypes.MARIO_STILL_FACING_RIGHT,
            spriteStandingStillFacingLeft: sprites.spriteTypes.MARIO_STILL_FACING_LEFT,
            spritesRunningRight: [  sprites.spriteTypes.MARIO_RUNNING_RIGHT_FRAME_1,
                                    sprites.spriteTypes.MARIO_RUNNING_RIGHT_FRAME_2,
                                    sprites.spriteTypes.MARIO_RUNNING_RIGHT_FRAME_3,
                                    sprites.spriteTypes.MARIO_RUNNING_RIGHT_FRAME_4,
                                    sprites.spriteTypes.MARIO_RUNNING_RIGHT_FRAME_5],
            spritesRunningLeft: [   sprites.spriteTypes.MARIO_RUNNING_LEFT_FRAME_1,
                                    sprites.spriteTypes.MARIO_RUNNING_LEFT_FRAME_2,
                                    sprites.spriteTypes.MARIO_RUNNING_LEFT_FRAME_3,
                                    sprites.spriteTypes.MARIO_RUNNING_LEFT_FRAME_4,
                                    sprites.spriteTypes.MARIO_RUNNING_LEFT_FRAME_5],
            spriteJumpingRight:     sprites.spriteTypes.MARIO_JUMPING_RIGHT,
            spriteJumpingLeft:      sprites.spriteTypes.MARIO_JUMPING_LEFT,
            spritesDying:       [   sprites.spriteTypes.MARIO_DYING_FRAME_1,
                                    sprites.spriteTypes.MARIO_DYING_FRAME_2],
            accelerationRunning:  300,
            velocityJumping:     -300,
            defaultVelocityX:     0,
            defaultVelocityY:     0,
            affectedByGravity:    true,
            affectedByFriction:   true,
            wrapAroundScreenX:    true,
            collidable:           true,
            collidableWithMapUnit: function(unitType) {
                switch (unitType) {
                    case sprites.spriteTypes.PIPE_LEFT_MM1_B:
                    case sprites.spriteTypes.PIPE_LEFT_R1_B:
                    case sprites.spriteTypes.PIPE_LEFT_MM2_B:
                    case sprites.spriteTypes.PIPE_LEFT_R2_B:
                    case sprites.spriteTypes.PIPE_RIGHT_L1_B:
                    case sprites.spriteTypes.PIPE_RIGHT_M1_B:
                    case sprites.spriteTypes.PIPE_RIGHT_L2_B:
                    case sprites.spriteTypes.PIPE_RIGHT_M2_B:
                        return false;
                }
                return true;
            },
            canBeDamagedByMovable: function(movable) {
                switch (movable.type) {
                    case movableTypes.GREEN_TURTLE:
                        if (!movable.upSideDown) {
                            return true;
                        }
                }
                return false;
            },
            finishedDying: function() {
                this.spawn();
            },
            spawn: function() {
                this.collidable = true;
                this.controllable = true;
                this.x = 56;
                this.y = 186;
                this.velX = 0;
                this.accX = 0;
                this.velY = 0;
                this.accY = 0;
                this.facing = "right";
                this.spriteType = this.spriteStandingStillFacingRight;
            }
        },
        "luigi": {
            spriteStandingStillFacingRight: sprites.spriteTypes.LUIGI_STILL_FACING_RIGHT,
            spriteStandingStillFacingLeft: sprites.spriteTypes.LUIGI_STILL_FACING_LEFT,
            spritesRunningRight: [  sprites.spriteTypes.LUIGI_RUNNING_RIGHT_FRAME_1,
                                    sprites.spriteTypes.LUIGI_RUNNING_RIGHT_FRAME_2,
                                    sprites.spriteTypes.LUIGI_RUNNING_RIGHT_FRAME_3,
                                    sprites.spriteTypes.LUIGI_RUNNING_RIGHT_FRAME_4,
                                    sprites.spriteTypes.LUIGI_RUNNING_RIGHT_FRAME_5],
            spritesRunningLeft: [   sprites.spriteTypes.LUIGI_RUNNING_LEFT_FRAME_1,
                                    sprites.spriteTypes.LUIGI_RUNNING_LEFT_FRAME_2,
                                    sprites.spriteTypes.LUIGI_RUNNING_LEFT_FRAME_3,
                                    sprites.spriteTypes.LUIGI_RUNNING_LEFT_FRAME_4,
                                    sprites.spriteTypes.LUIGI_RUNNING_LEFT_FRAME_5],
            spriteJumpingRight:     sprites.spriteTypes.LUIGI_JUMPING_RIGHT,
            spriteJumpingLeft:      sprites.spriteTypes.LUIGI_JUMPING_LEFT,
            spritesDying:       [   sprites.spriteTypes.LUIGI_DYING_FRAME_1,
                                    sprites.spriteTypes.LUIGI_DYING_FRAME_2], 
            accelerationRunning:  300,
            velocityJumping:     -300,
            defaultVelocityX:     0,
            defaultVelocityY:     0,
            affectedByGravity:    true,
            affectedByFriction:   true,
            wrapAroundScreenX:    true,
            collidable:           true,
            collidableWithMapUnit:  function(unitType) {
                switch (unitType) {
                    case sprites.spriteTypes.PIPE_LEFT_MM1_B:
                    case sprites.spriteTypes.PIPE_LEFT_R1_B:
                    case sprites.spriteTypes.PIPE_LEFT_MM2_B:
                    case sprites.spriteTypes.PIPE_LEFT_R2_B:
                    case sprites.spriteTypes.PIPE_RIGHT_L1_B:
                    case sprites.spriteTypes.PIPE_RIGHT_M1_B:
                    case sprites.spriteTypes.PIPE_RIGHT_L2_B:
                    case sprites.spriteTypes.PIPE_RIGHT_M2_B:
                        return false;
                }
                return true;
            },
            canBeDamagedByMovable: function(movable) {
                switch (movable.type) {
                    case movableTypes.GREEN_TURTLE:
                        if (!movable.upSideDown) {
                            return true;
                        }
                }
                return false;
            },
            finishedDying: function() {
                this.spawn();
            },
            spawn: function() {
                this.collidable = true;
                this.controllable = true;
                this.x = 190;
                this.y = 186;
                this.velX = 0;
                this.accX = 0;
                this.velY = 0;
                this.accY = 0;
                this.facing = "left";
                this.spriteType = this.spriteStandingStillFacingRight;
            }
        },
        "greenTurtle": {
            spriteStandingStillFacingRight: sprites.spriteTypes.GREEN_TURTLE_STILL_FACING_RIGHT,
            spriteStandingStillFacingLeft: sprites.spriteTypes.GREEN_TURTLE_STILL_FACING_LEFT,
            spritesRunningRight: [  sprites.spriteTypes.GREEN_TURTLE_RUNNING_RIGHT_FRAME_1,
                                    sprites.spriteTypes.GREEN_TURTLE_RUNNING_RIGHT_FRAME_2],
            spritesRunningLeft: [   sprites.spriteTypes.GREEN_TURTLE_RUNNING_LEFT_FRAME_1,
                                    sprites.spriteTypes.GREEN_TURTLE_RUNNING_LEFT_FRAME_2],
            spriteJumpingRight:     sprites.spriteTypes.GREEN_TURTLE_STILL_FACING_RIGHT,
            spriteJumpingLeft:      sprites.spriteTypes.GREEN_TURTLE_STILL_FACING_LEFT,
            accelerationRunning:  300,
            velocityJumping:     -300,
            defaultVelocityX:     30,
            defaultVelocityY:     0,
            affectedByGravity:    true,
            affectedByFriction:   false,
            wrapAroundScreenX:    true,
            collidable:           true,
            collidableWithMapUnit:  function(unitType) {
                switch (unitType) {
                    case sprites.spriteTypes.PIPE_LEFT_L1:
                    case sprites.spriteTypes.PIPE_LEFT_M1:
                    case sprites.spriteTypes.PIPE_LEFT_MM1:
                    case sprites.spriteTypes.PIPE_LEFT_R1:
                    case sprites.spriteTypes.PIPE_LEFT_L2:
                    case sprites.spriteTypes.PIPE_LEFT_M2:
                    case sprites.spriteTypes.PIPE_LEFT_MM2:
                    case sprites.spriteTypes.PIPE_LEFT_R2:
                    case sprites.spriteTypes.PIPE_RIGHT_L1:
                    case sprites.spriteTypes.PIPE_RIGHT_M1:
                    case sprites.spriteTypes.PIPE_RIGHT_MM1:
                    case sprites.spriteTypes.PIPE_RIGHT_R1:
                    case sprites.spriteTypes.PIPE_RIGHT_L2:
                    case sprites.spriteTypes.PIPE_RIGHT_M2:
                    case sprites.spriteTypes.PIPE_RIGHT_MM2:
                    case sprites.spriteTypes.PIPE_RIGHT_R2:
                    case sprites.spriteTypes.PIPE_LEFT_MM1_B:
                    case sprites.spriteTypes.PIPE_LEFT_R1_B:
                    case sprites.spriteTypes.PIPE_LEFT_MM2_B:
                    case sprites.spriteTypes.PIPE_LEFT_R2_B:
                    case sprites.spriteTypes.PIPE_RIGHT_L1_B:
                    case sprites.spriteTypes.PIPE_RIGHT_M1_B:
                    case sprites.spriteTypes.PIPE_RIGHT_L2_B:
                    case sprites.spriteTypes.PIPE_RIGHT_M2_B:
                        return false;
                }
                return true;
            },
            bounced: function() {
                if (!this.upSideDown) {
                    this.spriteType = sprites.spriteTypes.GREEN_TURTLE_UPSIDE_DOWN;
                    sprites.updateSprite({  type: this.spriteType,
                                            movableId: this.id});
                    physics.moveToCollisionFreeSpace(this, movables);
                    this.jumping = true;
                    this.upSideDown = true;
                } else {
                    // Flipped over again, from upsidedown to normal
                    if (this.facing === "right") {
                        this.spriteType = sprites.spriteTypes.GREEN_TURTLE_RUNNING_RIGHT_FRAME_1;
                        this.velX = this.defaultVelocityX;
                    } else {
                        this.spriteType = sprites.spriteTypes.GREEN_TURTLE_RUNNING_LEFT_FRAME_1;
                        this.velX = -this.defaultVelocityX;
                    }
                    sprites.updateSprite({  type: this.spriteType,
                                            movableId: this.id});
                    physics.moveToCollisionFreeSpace(this, movables);
                    this.jumping = true;
                    this.upSideDown = false;
                }
            },
            canBeDamagedByMovable: function(movable) {
                switch (movable.type) {
                    case movableTypes.MARIO:
                    case movableTypes.LUIGI:
                        if (this.upSideDown) {
                            return true;
                        }
                }
                return false;
            },
            finishedDying: function() {
                this.spawn();
            },
            spawn: function() {
                this.upSideDown = false;
                this.collidable = true;
                this.controllable = true;
                if (Math.random() < 0.5) {
                    this.facing = "left";
                    this.x = 236;
                    this.velX = -this.defaultVelocityX;
                    this.spriteType = this.spritesRunningLeft[0];
                } else {
                    this.facing = "right";
                    this.x = 20;
                    this.velX = this.defaultVelocityX;
                    this.spriteType = this.spritesRunningRight[0];
                }
                sprites.updateSprite({  type: this.spriteType,
                                        movableId: this.id});
                this.y = 16;
                this.accX = 0;
                this.velY = 0;
                this.accY = 0;
                this.affectedByGravity = false;
                setTimeout(function() {
                    this.affectedByGravity = true;
                }.bind(this), 500);
            }
        },
        "blueSteel": {
            spriteStandingStillFacingRight: sprites.spriteTypes.BLUE_STEEL,
            spriteStandingStillFacingLeft: sprites.spriteTypes.BLUE_STEEL,
            spritesRunningRight: [  sprites.spriteTypes.BLUE_STEEL],
            spritesRunningLeft: [   sprites.spriteTypes.BLUE_STEEL],
            spriteJumpingRight:     sprites.spriteTypes.BLUE_STEEL,
            spriteJumpingLeft:      sprites.spriteTypes.BLUE_STEEL,
            accelerationRunning:  0,
            velocityJumping:      0,
            defaultVelocityX:     0,
            defaultVelocityY:     -150,
            affectedByGravity:    false,
            affectedByFriction:   false,
            wrapAroundScreenX:    false,
            collidable:           true,
            collidableWithMapUnit: function(unitType) {
                return true;
            }
        }
    }

    var Movable = function(type, x, y, inputId) {
        this.type = type;
        this.sprite = null;
        this.spriteType = movablesData[type].spriteStandingStillFacingRight;
        this.spritesRunningRight = movablesData[type].spritesRunningRight;
        this.spritesRunningLeft = movablesData[type].spritesRunningLeft;
        this.spritesDying = movablesData[type].spritesDying;
        this.spriteRunningIndex = 0;
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.wantedX = x;
        this.wantedY = y;
        this.defaultVelocityX = movablesData[type].defaultVelocityX || 0;
        this.defaultVelocityY = movablesData[type].defaultVelocityY || 0;
        this.velX = this.defaultVelocityX;
        this.velY = this.defaultVelocityY;
        this.accX = 0;
        this.accY = 0;

        this.affectedByGravity = !!movablesData[type].affectedByGravity;
        this.affectedByFriction = !!movablesData[type].affectedByFriction;
        this.wrapAroundScreenX = !!movablesData[type].wrapAroundScreenX;

        this.spriteChangedX = x;

        this.inputId = inputId;
        if (inputId !== undefined) {
            this.controllable = true;
        } else {
            this.controllable = false;
        }
        this.keyState = {};
        this.lastKeyState = {};

        this.id = movableId;

        this.facing = "right";
        this.jumping = false;
        this.jumpAllowed = true;
        this.jumpTime = 0;

        this.dying = false;

        this.needsCollisionResolution = false;

        this.collidingPoints = {};

        this.markedForDeletion = false;

        this.collidable = movablesData[type].collidable;
        this.collidableWithMapUnit = movablesData[type].collidableWithMapUnit;
        this.canBeDamagedByMovable = movablesData[type].canBeDamagedByMovable;

        this.bounced = movablesData[type].bounced;
        this.upSideDown = false;

        this.spawn = movablesData[type].spawn;

        this.cycleDyingSprites = function() {
            this.dyingSpriteIndex = (this.dyingSpriteIndex + 1) % this.spritesDying.length;
            this.spriteType = this.spritesDying[this.dyingSpriteIndex];
            sprites.updateSprite({  type: this.spriteType,
                                    movableId: this.id});
            this.dieAnimationTimer = setTimeout(this.cycleDyingSprites.bind(this), 100);
        };

        this.die = function() {
            this.dying = true;
            this.collidable = false;
            this.controllable = false;
            this.keyState = {};
            this.lastKeyState = {};
            this.velX = 0;
            this.accX = 0;
            this.velY = physics.DYING_VEL_Y;
            this.accY = 0;

            if (this.spritesDying) {
                this.dyingSpriteIndex = -1;
                this.cycleDyingSprites();
            }

            setTimeout(function() {
                // Respawn
                clearTimeout(this.dieAnimationTimer);
                this.dying = false;
                this.finishedDying();
            }.bind(this), 3000);
        };

        this.finishedDying = movablesData[this.type].finishedDying || function() {
            this.collidable = true;
            this.controllable = true;
            this.velY = 0;
            this.accY = 0;
            this.x = 56;
            this.y = 186;
        };

        this.tick = function(timePassed) {
            var keyState = {};

            if (this.inputId !== undefined && this.controllable) {
                this.keyState = utils.copyObj(input.read(this.inputId));
                this.handleKeys(this.keyState);
                this.lastKeyState = utils.copyObj(this.keyState);
            }
            if (this.jumping) {
                this.jumpTime += timePassed;
            } else {
                this.jumpTime = 0;
            }
        };

        this.handleKeys = function(keyState) {
            if (keyState.up && !this.jumping && this.jumpAllowed) {
                this.velY = movablesData[this.type].velocityJumping;
                this.jumping = true;
                this.jumpAllowed = false;
                this.jumpTime = 0;
                if (this.facing === "right") {
                    this.spriteType = movablesData[this.type].spriteJumpingRight;
                } else {
                    this.spriteType = movablesData[this.type].spriteJumpingLeft;
                }
                sprites.updateSprite({  type: this.spriteType,
                                        movableId: this.id});
                physics.moveToCollisionFreeSpace(this, movables);
            }

            if (keyState.right) {
                this.accX = movablesData[this.type].accelerationRunning;
                this.facing = "right";

                if (!this.lastKeyState.right) {
                    if (this.jumping) {
                        sprites.updateSprite({  type: movablesData[this.type].spriteJumpingRight,
                                                movableId: this.id});
                    } else {
                        this.spriteRunningIndex = 0;
                        sprites.updateSprite({  type: this.spritesRunningRight[0],
                                                movableId: this.id});
                    }
                    physics.moveToCollisionFreeSpace(this, movables);
                }
            } else if (keyState.left) {
                this.accX = -movablesData[this.type].accelerationRunning;
                this.facing = "left";

                if (!this.lastKeyState.left) {
                    if (this.jumping) {
                        sprites.updateSprite({  type: movablesData[this.type].spriteJumpingLeft,
                                                movableId: this.id});
                    } else {
                        this.spriteRunningIndex = 0;
                        sprites.updateSprite({  type: this.spritesRunningLeft[0],
                                            movableId: this.id});
                    }
                    physics.moveToCollisionFreeSpace(this, movables);
                }
            } else {
                this.accX = 0;
            }
            // debug.print("accx: " + this.accX, 0);
        };

        this.handleCollisionPoints = function() {
            var otherMovable;

            if (this.collidingPoints["leftUpperMap"] ||
                this.collidingPoints["leftLowerMap"]) {
                if (this.defaultVelocityX) {
                    if (this.defaultVelocityX > 0) {
                        this.velX = this.defaultVelocityX;
                    } else {
                        this.velX = -this.defaultVelocityX;
                    }
                    this.spriteType = this.spritesRunningRight[0];
                    this.facing = "right";
                } else {
                    this.velX = 0;
                    this.accX = 0;
                    this.spriteType = movablesData[this.type].spriteStandingStillFacingLeft;
                }
                sprites.updateSprite({  type: this.spriteType,
                                        movableId: this.id});
            
                physics.moveToCollisionFreeSpace(this, movables);
                this.spriteChangedX = this.x;
            }
            if (this.collidingPoints["rightUpperMap"] ||
                this.collidingPoints["rightLowerMap"]) {
                if (this.defaultVelocityX) {
                    if (this.defaultVelocityX > 0) {
                        this.velX = -this.defaultVelocityX;
                    } else {
                        this.velX = this.defaultVelocityX;
                    }
                    this.spriteType = this.spritesRunningRight[0];
                    this.facing = "left";
                } else {
                    this.velX = 0;
                    this.accX = 0;
                    this.spriteType = movablesData[this.type].spriteStandingStillFacingLeft;
                }
                sprites.updateSprite({  type: this.spriteType,
                                        movableId: this.id});
            
                physics.moveToCollisionFreeSpace(this, movables);
                this.spriteChangedX = this.x;
            }
            if (this.collidingPoints["aboveLeftMap"] ||
                this.collidingPoints["aboveRightMap"]) {
                if (this.velY <= 0) {
                    this.velY = 0;
                    this.accY = 0;
                }
                physics.moveToCollisionFreeSpace(this, movables);
                this.spriteChangedX = this.x;

                if (this.facing === "left" && this.collidingPoints["aboveLeftMap"] === sprites.spriteTypes.BLUE_STEEL) {
                    bounce(this.x, this.y - 1);
                }
                else if (this.facing === "right" && this.collidingPoints["aboveRightMap"] === sprites.spriteTypes.BLUE_STEEL) {
                    bounce(this.x + this.sprite.spriteSheetPosition.w - 1, this.y - 1);
                }
            }

            // Movables
            var died = false;
            ["leftUpperMovable", "leftLowerMovable", "rightUpperMovable", "rightLowerMovable",
             "aboveLeftMovable", "aboveRightMovable", "underLeftMovable", "underRightMovable"].forEach(function(str) {
                if (!died) {
                    otherMovable = this.collidingPoints[str];
                    if (otherMovable) {
                        if (this.canBeDamagedByMovable && this.canBeDamagedByMovable(otherMovable)) {
                            if (this.die) {
                                this.die();
                                died = true;
                            }
                        } else {
                            if ((this.type === movableTypes.MARIO || this.type === movableTypes.LUIGI) && (otherMovable.type !== movableTypes.GREEN_TURTLE)) {
                                if ((str === "rightUpperMovable" || str === "rightLowerMovable") && this.velX > 0) {
                                    this.velX = 0;
                                    this.spriteType = movablesData[this.type].spriteStandingStillFacingRight;
                                    sprites.updateSprite({  type: this.spriteType,
                                                            movableId: this.id});
                                    physics.moveToCollisionFreeSpace(this, movables);
                                    this.spriteChangedX = this.x;
                                } else if ((str === "leftUpperMovable" || str === "leftLowerMovable") && this.velX < 0) {
                                    this.velX = 0;
                                    this.spriteType = movablesData[this.type].spriteStandingStillFacingLeft;
                                    sprites.updateSprite({  type: this.spriteType,
                                                            movableId: this.id});
                                    physics.moveToCollisionFreeSpace(this, movables);
                                    this.spriteChangedX = this.x;
                                }
                            }
                        }
                    }
                }
            }.bind(this));
        };

        this.positionUpdated = function() {

            this.handleCollisionPoints();

            if (this.velX === 0 && !this.jumping && !this.dying && !this.upSideDown && !this.keyState.left && !this.keyState.right) {
                if (this.facing === "right") {
                    this.spriteType = movablesData[this.type].spriteStandingStillFacingRight;
                } else {
                    this.spriteType = movablesData[this.type].spriteStandingStillFacingLeft;
                }
                sprites.updateSprite({  type: this.spriteType,
                                        movableId: this.id});
                physics.moveToCollisionFreeSpace(this, movables);
                this.spriteChangedX = this.x;
            }

            if (!this.jumping && !this.dying && !this.upSideDown && (Math.abs(this.x - this.spriteChangedX) > 8)) {
                if (this.facing === "right") {
                    this.spriteRunningIndex = (this.spriteRunningIndex + 1) % this.spritesRunningRight.length;
                    this.spriteType = this.spritesRunningRight[this.spriteRunningIndex];
                } else {
                    this.spriteRunningIndex = (this.spriteRunningIndex + 1) % this.spritesRunningLeft.length;
                    this.spriteType = this.spritesRunningLeft[this.spriteRunningIndex];
                }
                sprites.updateSprite({  type: this.spriteType,
                                        movableId: this.id});
                physics.moveToCollisionFreeSpace(this, movables);
                this.spriteChangedX = this.x;
            }

            if (this.wrapAroundScreenX) {
                if (this.x < -(this.sprite.spriteSheetPosition.w / 2)) {
                    if (this.type === movableTypes.GREEN_TURTLE) {
                        var unitType = physics.movableAndMapOverlap(this, 0, 0, true);
                        if (unitType && unitType.indexOf("pipe") >= 0) {
                            this.y = 16;
                            this.affectedByGravity = false;
                            this.collidable = false;
                            this.velX = 0;
                            setTimeout(function() {
                                if (this.facing === "left") {
                                    this.facing = "right";
                                    this.velX = this.defaultVelocityX;
                                    this.spriteType = this.spritesRunningRight[0];
                                } else {
                                    this.facing = "left";
                                    this.velX = -this.defaultVelocityX;
                                    this.spriteType = this.spritesRunningLeft[0];
                                }
                                setTimeout(function() {
                                    this.affectedByGravity = true;
                                    this.collidable = true;
                                }.bind(this), 500);
                            }.bind(this), 1000);
                        }
                    }
                    this.x += level.numPixelsX;
                } else if (this.x > level.numPixelsX - (this.sprite.spriteSheetPosition.w / 2)) {
                    if (this.type === movableTypes.GREEN_TURTLE) {
                        var unitType = physics.movableAndMapOverlap(this, 0, 0, true);
                        if (unitType && unitType.indexOf("pipe") >= 0) {
                            this.y = 16;
                            this.affectedByGravity = false;
                            this.collidable = false;
                            this.velX = 0;
                            setTimeout(function() {
                                if (this.facing === "left") {
                                    this.facing = "right";
                                    this.velX = this.defaultVelocityX;
                                    this.spriteType = this.spritesRunningRight[0];
                                } else {
                                    this.facing = "left";
                                    this.velX = -this.defaultVelocityX;
                                    this.spriteType = this.spritesRunningLeft[0];
                                }
                                setTimeout(function() {
                                    this.affectedByGravity = true;
                                    this.collidable = true;
                                }.bind(this), 500);
                            }.bind(this), 1000);
                        }
                    }
                    this.x -= level.numPixelsX;
                }
            }

            if (!this.markedForDeletion && this.maxY !== undefined && this.y > this.maxY) {
                this.markedForDeletion = true;
                level.setUnit(Math.floor(this.x / level.unitWidth), Math.floor(this.maxY / level.unitHeight), sprites.spriteTypes.BLUE_STEEL);
                return;
            }

            sprites.updatePosition(this.id, this.x, this.y);
        };
    };

    var createMovable = function(params) {
        var movable = new Movable(params.type, params.x, params.y, params.inputId);
        movable.sprite = sprites.createSprite({ type: movable.spriteType,
                                                x: params.x,
                                                y: params.y,
                                                movableId: movable.id});
        movables.push(movable);
        movableId++;
        return movable;
    };

    var bounce = function(x, y) {
        var unitX = Math.floor(x / level.unitWidth);
        var unitY = Math.floor(y / level.unitHeight);
        var map = level.getMap();
        var i, x, y, blueSteel;

        for (i=0; i<movables.length; i++) {
            movables[i].hasBounced = false;
        }

        if (unitX >= 0 && unitX < level.numUnitsX && map[unitY][unitX] === sprites.spriteTypes.BLUE_STEEL) {
            level.setUnit(unitX, unitY, 0);
            x = unitX * level.unitWidth;
            y = unitY * level.unitHeight;
            blueSteel = createMovable({ type: movableTypes.BLUE_STEEL,
                                        x: x,
                                        y: y});
            blueSteel.affectedByGravity = true;
            blueSteel.maxY = unitY * level.unitHeight;
            for (i=0; i<movables.length; i++) {
                if (movables[i] !== blueSteel && physics.rectangleAndMovableOverlap({x0: x, y0: y-level.unitHeight-1, x1: x+level.unitWidth-1, y1: y}, movables[i])) {
                    movables[i].velY = physics.BOUNCED_VEL_Y;
                    if (movables[i].bounced && !movables[i].hasBounced) {
                        movables[i].bounced();
                        movables[i].hasBounced = true;
                    }
                }
            }
        }

        if (unitX-1 >= 0 && unitX-1 < level.numUnitsX && map[unitY][unitX-1] === sprites.spriteTypes.BLUE_STEEL) {
            level.setUnit(unitX-1, unitY, 0);
            x = (unitX-1) * level.unitWidth;
            y = unitY * level.unitHeight;
            blueSteel = createMovable({ type: movableTypes.BLUE_STEEL,
                                        x: x,
                                        y: y});
            blueSteel.affectedByGravity = true;
            blueSteel.maxY = unitY * level.unitHeight;
            blueSteel.velY = blueSteel.velY / 1.1;
            for (i=0; i<movables.length; i++) {
                if (movables[i] !== blueSteel && physics.rectangleAndMovableOverlap({x0: x, y0: y-level.unitHeight-1, x1: x+level.unitWidth-1, y1: y}, movables[i])) {
                    movables[i].velY = physics.BOUNCED_VEL_Y;
                    if (movables[i].bounced && !movables[i].hasBounced) {
                        movables[i].bounced();
                        movables[i].hasBounced = true;
                    }
                }
            }
        }

        if (unitX+1 >= 0 && unitX+1 < level.numUnitsX && map[unitY][unitX+1] === sprites.spriteTypes.BLUE_STEEL) {
            level.setUnit(unitX+1, unitY, 0);
            x = (unitX+1) * level.unitWidth;
            y = unitY * level.unitHeight;
            blueSteel = createMovable({ type: movableTypes.BLUE_STEEL,
                                        x: x,
                                        y: y});
            blueSteel.affectedByGravity = true;
            blueSteel.maxY = unitY * level.unitHeight;
            blueSteel.velY = blueSteel.velY / 1.1;
            for (i=0; i<movables.length; i++) {
                if (movables[i] !== blueSteel && physics.rectangleAndMovableOverlap({x0: x, y0: y-level.unitHeight-1, x1: x+level.unitWidth-1, y1: y}, movables[i])) {
                    movables[i].velY = physics.BOUNCED_VEL_Y;
                    if (movables[i].bounced && !movables[i].hasBounced) {
                        movables[i].bounced();
                        movables[i].hasBounced = true;
                    }
                }
            }
        }

        if (unitX-2 >= 0 && unitX-2 < level.numUnitsX && map[unitY][unitX-2] === sprites.spriteTypes.BLUE_STEEL) {
            level.setUnit(unitX-2, unitY, 0);
            x = (unitX-2) * level.unitWidth;
            y = unitY * level.unitHeight;
            blueSteel = createMovable({ type: movableTypes.BLUE_STEEL,
                                        x: x,
                                        y: y});
            blueSteel.affectedByGravity = true;
            blueSteel.maxY = unitY * level.unitHeight;
            blueSteel.velY = blueSteel.velY / 1.4;
            for (i=0; i<movables.length; i++) {
                if (movables[i] !== blueSteel && physics.rectangleAndMovableOverlap({x0: x, y0: y-level.unitHeight-1, x1: x+level.unitWidth-1, y1: y}, movables[i])) {
                    movables[i].velY = physics.BOUNCED_VEL_Y;
                    if (movables[i].bounced && !movables[i].hasBounced) {
                        movables[i].bounced();
                        movables[i].hasBounced = true;
                    }
                }
            }
        }

        if (unitX+2 >= 0 && unitX+2 < level.numUnitsX && map[unitY][unitX+2] === sprites.spriteTypes.BLUE_STEEL) {
            level.setUnit(unitX+2, unitY, 0);
            x = (unitX+2) * level.unitWidth;
            y = unitY * level.unitHeight;
            blueSteel = createMovable({ type: movableTypes.BLUE_STEEL,
                                        x: x,
                                        y: y});
            blueSteel.affectedByGravity = true;
            blueSteel.maxY = unitY * level.unitHeight;
            blueSteel.velY = blueSteel.velY / 1.4;
            for (i=0; i<movables.length; i++) {
                if (movables[i] !== blueSteel && physics.rectangleAndMovableOverlap({x0: x, y0: y-level.unitHeight-1, x1: x+level.unitWidth-1, y1: y}, movables[i])) {
                    movables[i].velY = physics.BOUNCED_VEL_Y;
                    if (movables[i].bounced && !movables[i].hasBounced) {
                        movables[i].bounced();
                        movables[i].hasBounced = true;
                    }
                }
            }
        }

        for (i=0; i<movables.length; i++) {
            movables[i].hasBounced = false;
        }
    };

    return {
        movableTypes: movableTypes,
        createMovable: createMovable,
        getMovables: function() {
            return movables;
        },
        tick: function(timePassed) {
            var i;
            // Remove any movables that are marked for deletion
            movables = movables.filter(function(movable) {
                if (movable.markedForDeletion) {
                    sprites.removeSprite(movable.id);
                    return false;
                }
                return true;
            });
            // For remaining movables, call their tick function
            for (i=0; i<movables.length; i++) {
                movables[i].tick(timePassed);
            }
        }
    };
});
