define(["js/app/renderer"], function(renderer) {

    var currentSprites = {};

    var spriteTypes = {
        MARIO_STILL_FACING_RIGHT:    "marioStillFacingRight",
        MARIO_STILL_FACING_LEFT:     "marioStillFacingLeft",
        MARIO_RUNNING_RIGHT_FRAME_1: "marioRunningRightFrame1",
        MARIO_RUNNING_RIGHT_FRAME_2: "marioRunningRightFrame2",
        MARIO_RUNNING_RIGHT_FRAME_3: "marioRunningRightFrame3",
        MARIO_RUNNING_RIGHT_FRAME_4: "marioRunningRightFrame4",
        MARIO_RUNNING_RIGHT_FRAME_5: "marioRunningRightFrame5",
        MARIO_RUNNING_LEFT_FRAME_1:  "marioRunningLeftFrame1",
        MARIO_RUNNING_LEFT_FRAME_2:  "marioRunningLeftFrame2",
        MARIO_RUNNING_LEFT_FRAME_3:  "marioRunningLeftFrame3",
        MARIO_RUNNING_LEFT_FRAME_4:  "marioRunningLeftFrame4",
        MARIO_RUNNING_LEFT_FRAME_5:  "marioRunningLeftFrame5",
        MARIO_JUMPING_RIGHT:         "marioJumpingRight",
        MARIO_JUMPING_LEFT:          "marioJumpingLeft",
        MARIO_DYING_FRAME_1:         "marioDyingFrame1",
        MARIO_DYING_FRAME_2:         "marioDyingFrame2",

        LUIGI_STILL_FACING_RIGHT:    "luigiStillFacingRight",
        LUIGI_STILL_FACING_LEFT:     "luigiStillFacingLeft",
        LUIGI_RUNNING_RIGHT_FRAME_1: "luigiRunningRightFrame1",
        LUIGI_RUNNING_RIGHT_FRAME_2: "luigiRunningRightFrame2",
        LUIGI_RUNNING_RIGHT_FRAME_3: "luigiRunningRightFrame3",
        LUIGI_RUNNING_RIGHT_FRAME_4: "luigiRunningRightFrame4",
        LUIGI_RUNNING_RIGHT_FRAME_5: "luigiRunningRightFrame5",
        LUIGI_RUNNING_LEFT_FRAME_1:  "luigiRunningLeftFrame1",
        LUIGI_RUNNING_LEFT_FRAME_2:  "luigiRunningLeftFrame2",
        LUIGI_RUNNING_LEFT_FRAME_3:  "luigiRunningLeftFrame3",
        LUIGI_RUNNING_LEFT_FRAME_4:  "luigiRunningLeftFrame4",
        LUIGI_RUNNING_LEFT_FRAME_5:  "luigiRunningLeftFrame5",
        LUIGI_JUMPING_RIGHT:         "luigiJumpingRight",
        LUIGI_JUMPING_LEFT:          "luigiJumpingLeft",
        LUIGI_DYING_FRAME_1:         "luigiDyingFrame1",
        LUIGI_DYING_FRAME_2:         "luigiDyingFrame2",

        GREEN_TURTLE_STILL_FACING_RIGHT:    "greenTurtleStillFacingRight",
        GREEN_TURTLE_STILL_FACING_LEFT:     "greenTurtleStillFacingLeft",
        GREEN_TURTLE_RUNNING_RIGHT_FRAME_1: "greenTurtleRunningRightFrame1",
        GREEN_TURTLE_RUNNING_RIGHT_FRAME_2: "greenTurtleRunningRightFrame2",
        GREEN_TURTLE_RUNNING_LEFT_FRAME_1:  "greenTurtleRunningLeftFrame1",
        GREEN_TURTLE_RUNNING_LEFT_FRAME_2:  "greenTurtleRunningLeftFrame2",
        GREEN_TURTLE_JUMPING_RIGHT:         "greenTurtleJumpingRight",
        GREEN_TURTLE_JUMPING_LEFT:          "greenTurtleJumpingLeft",
        GREEN_TURTLE_UPSIDE_DOWN:           "greenTurtleUpsideDown",

        BLUE_STEEL:                  "blueSteel",
        RED_BRICK:                   "redBrick",

        PIPE_LEFT_TOP:               "pipeLeftTop",
        PIPE_LEFT_L1:                "pipeLeftL1",
        PIPE_LEFT_M1:                "pipeLeftM1",
        PIPE_LEFT_MM1:               "pipeLeftMM1",
        PIPE_LEFT_R1:                "pipeLeftR1",
        PIPE_LEFT_L2:                "pipeLeftL2",
        PIPE_LEFT_M2:                "pipeLeftM2",
        PIPE_LEFT_MM2:               "pipeLeftMM2",
        PIPE_LEFT_R2:                "pipeLeftR2",
        PIPE_LEFT_L3:                "pipeLeftL3",
        PIPE_LEFT_R3:                "pipeLeftR3",
        PIPE_LEFT_L4:                "pipeLeftL4",
        PIPE_LEFT_R4:                "pipeLeftR4",
        PIPE_LEFT_L5:                "pipeLeftL5",
        PIPE_LEFT_R5:                "pipeLeftR5",
        PIPE_LEFT_L6:                "pipeLeftL6",
        PIPE_LEFT_R6:                "pipeLeftR6",

        PIPE_LEFT_MM1_B:             "pipeLeftMM1B",
        PIPE_LEFT_R1_B:              "pipeLeftR1B",
        PIPE_LEFT_MM2_B:             "pipeLeftMM2B",
        PIPE_LEFT_R2_B:              "pipeLeftR2B",

        PIPE_RIGHT_TOP:              "pipeRightTop",
        PIPE_RIGHT_L1:               "pipeRightL1",
        PIPE_RIGHT_M1:               "pipeRightM1",
        PIPE_RIGHT_MM1:              "pipeRightMM1",
        PIPE_RIGHT_R1:               "pipeRightR1",
        PIPE_RIGHT_L2:               "pipeRightL2",
        PIPE_RIGHT_M2:               "pipeRightM2",
        PIPE_RIGHT_MM2:              "pipeRightMM2",
        PIPE_RIGHT_R2:               "pipeRightR2",
        PIPE_RIGHT_L3:               "pipeRightL3",
        PIPE_RIGHT_R3:               "pipeRightR3",
        PIPE_RIGHT_L4:               "pipeRightL4",
        PIPE_RIGHT_R4:               "pipeRightR4",
        PIPE_RIGHT_L5:               "pipeRightL5",
        PIPE_RIGHT_R5:               "pipeRightR5",
        PIPE_RIGHT_L6:               "pipeRightL6",
        PIPE_RIGHT_R6:               "pipeRightR6",

        PIPE_RIGHT_L1_B:             "pipeRightL1B",
        PIPE_RIGHT_M1_B:             "pipeRightM1B",
        PIPE_RIGHT_L2_B:             "pipeRightL2B",
        PIPE_RIGHT_M2_B:             "pipeRightM2B",
    };

    var spriteSheetPositions = {
        "marioStillFacingRight":    {x:   3, y:  14, w: 16, h: 21},
        "marioStillFacingLeft":     {x: 267, y: 138, w: 16, h: 21},
        "marioRunningRightFrame1":  {x:  26, y:  14, w: 12, h: 21},
        "marioRunningRightFrame2":  {x:  45, y:  14, w: 16, h: 21},
        "marioRunningRightFrame3":  {x:  67, y:  14, w: 14, h: 21},
        "marioRunningRightFrame4":  {x:  86, y:  14, w: 14, h: 21},
        "marioRunningRightFrame5":  {x: 104, y:  14, w: 13, h: 21},
        "marioRunningLeftFrame1":   {x: 248, y: 138, w: 12, h: 21},
        "marioRunningLeftFrame2":   {x: 225, y: 138, w: 16, h: 21},
        "marioRunningLeftFrame3":   {x: 205, y: 138, w: 14, h: 21},
        "marioRunningLeftFrame4":   {x: 186, y: 138, w: 14, h: 21},
        "marioRunningLeftFrame5":   {x: 169, y: 138, w: 13, h: 21},
        "marioJumpingRight":        {x: 194, y:  14, w: 15, h: 21},
        "marioJumpingLeft":         {x:  77, y: 138, w: 15, h: 21},
        "marioDyingFrame1":         {x: 243, y:  15, w: 16, h: 20},
        "marioDyingFrame2":         {x: 267, y:  15, w: 16, h: 20},

        "luigiStillFacingRight":    {x:   3, y:  62, w: 16, h: 21},
        "luigiStillFacingLeft":     {x: 267, y: 186, w: 16, h: 21},
        "luigiRunningRightFrame1":  {x:  26, y:  62, w: 12, h: 21},
        "luigiRunningRightFrame2":  {x:  46, y:  62, w: 16, h: 21},
        "luigiRunningRightFrame3":  {x:  69, y:  62, w: 14, h: 21},
        "luigiRunningRightFrame4":  {x:  92, y:  62, w: 14, h: 21},
        "luigiRunningRightFrame5":  {x: 111, y:  62, w: 13, h: 21},
        "luigiRunningLeftFrame1":   {x: 248, y: 186, w: 12, h: 21},
        "luigiRunningLeftFrame2":   {x: 224, y: 186, w: 16, h: 21},
        "luigiRunningLeftFrame3":   {x: 203, y: 186, w: 14, h: 21},
        "luigiRunningLeftFrame4":   {x: 180, y: 186, w: 14, h: 21},
        "luigiRunningLeftFrame5":   {x: 162, y: 186, w: 13, h: 21},
        "luigiJumpingRight":        {x: 194, y:  62, w: 15, h: 21},
        "luigiJumpingLeft":         {x:  77, y: 186, w: 15, h: 21},
        "luigiDyingFrame1":         {x: 240, y:  62, w: 16, h: 20},
        "luigiDyingFrame2":         {x: 264, y:  62, w: 16, h: 20},

        "greenTurtleStillFacingRight":      {x:   0, y: 268, w: 12, h: 16},
        "greenTurtleStillFacingLeft":       {x: 140, y: 268, w: 12, h: 16},
        "greenTurtleRunningRightFrame1":    {x:  14, y: 268, w: 11, h: 16},
        "greenTurtleRunningRightFrame2":    {x:  28, y: 268, w: 11, h: 16},
        "greenTurtleRunningLeftFrame1":     {x: 127, y: 268, w: 11, h: 16},
        "greenTurtleRunningLeftFrame2":     {x: 113, y: 268, w: 11, h: 16},
        "greenTurtleJumpingRight":          {x:   0, y: 268, w: 12, h: 16},
        "greenTurtleJumpingLeft":           {x: 140, y: 268, w: 12, h: 16},
        "greenTurtleUpsideDown":            {x:  41, y: 268, w: 11, h: 16},

        "blueSteel":                {x:   0, y: 260, w:  8, h:  8},
        "redBrick":                 {x:   8, y: 260, w:  8, h:  8},

        "pipeLeftTop":              {x:  24, y: 204, w:  8, h:  8},
        "pipeLeftL1":               {x:   0, y: 212, w:  8, h:  8},
        "pipeLeftM1":               {x:   8, y: 212, w:  8, h:  8},
        "pipeLeftMM1":              {x:  16, y: 212, w:  8, h:  8},
        "pipeLeftR1":               {x:  24, y: 212, w:  8, h:  8},
        "pipeLeftL2":               {x:   0, y: 220, w:  8, h:  8},
        "pipeLeftM2":               {x:   8, y: 220, w:  8, h:  8},
        "pipeLeftMM2":              {x:  16, y: 220, w:  8, h:  8},
        "pipeLeftR2":               {x:  24, y: 220, w:  8, h:  8},
        "pipeLeftL3":               {x:   0, y: 228, w:  8, h:  8},
        "pipeLeftR3":               {x:   8, y: 228, w:  8, h:  8},
        "pipeLeftL4":               {x:   0, y: 236, w:  8, h:  8},
        "pipeLeftR4":               {x:   8, y: 236, w:  8, h:  8},
        "pipeLeftL5":               {x:   0, y: 244, w:  8, h:  8},
        "pipeLeftR5":               {x:   8, y: 244, w:  8, h:  8},
        "pipeLeftL6":               {x:   0, y: 252, w:  8, h:  8},
        "pipeLeftR6":               {x:   8, y: 252, w:  8, h:  8},

        "pipeLeftMM1B":             {x:  16, y: 212, w:  8, h:  8},
        "pipeLeftR1B":              {x:  24, y: 212, w:  8, h:  8},
        "pipeLeftMM2B":             {x:  16, y: 220, w:  8, h:  8},
        "pipeLeftR2B":              {x:  24, y: 220, w:  8, h:  8},

        "pipeRightTop":             {x:  32, y: 204, w:  8, h:  8},
        "pipeRightL1":              {x:  32, y: 212, w:  8, h:  8},
        "pipeRightM1":              {x:  40, y: 212, w:  8, h:  8},
        "pipeRightMM1":             {x:  48, y: 212, w:  8, h:  8},
        "pipeRightR1":              {x:  56, y: 212, w:  8, h:  8},
        "pipeRightL2":              {x:  32, y: 220, w:  8, h:  8},
        "pipeRightM2":              {x:  40, y: 220, w:  8, h:  8},
        "pipeRightMM2":             {x:  48, y: 220, w:  8, h:  8},
        "pipeRightR2":              {x:  56, y: 220, w:  8, h:  8},
        "pipeRightL3":              {x:  48, y: 228, w:  8, h:  8},
        "pipeRightR3":              {x:  56, y: 228, w:  8, h:  8},
        "pipeRightL4":              {x:  48, y: 236, w:  8, h:  8},
        "pipeRightR4":              {x:  56, y: 236, w:  8, h:  8},
        "pipeRightL5":              {x:  48, y: 244, w:  8, h:  8},
        "pipeRightR5":              {x:  56, y: 244, w:  8, h:  8},
        "pipeRightL6":              {x:  48, y: 252, w:  8, h:  8},
        "pipeRightR6":              {x:  56, y: 252, w:  8, h:  8},

        "pipeRightL1B":             {x:  32, y: 212, w:  8, h:  8},
        "pipeRightM1B":             {x:  40, y: 212, w:  8, h:  8},
        "pipeRightL2B":             {x:  32, y: 220, w:  8, h:  8},
        "pipeRightM2B":             {x:  40, y: 220, w:  8, h:  8}
    };

    var setSpriteSheetPosition = function(type) {
        this.spriteSheetPosition = {
            x: spriteSheetPositions[type].x,
            y: spriteSheetPositions[type].y,
            w: spriteSheetPositions[type].w,
            h: spriteSheetPositions[type].h,
        };
    };

    var Sprite = function(type, x, y, movableId) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.spriteSheetPosition = {
            x: spriteSheetPositions[type].x,
            y: spriteSheetPositions[type].y,
            w: spriteSheetPositions[type].w,
            h: spriteSheetPositions[type].h,
        };
        this.movableId = movableId;
    };

    return {
        spriteTypes: spriteTypes,
        createSprite: function(params) {
        	var sprite = new Sprite(params.type, params.x, params.y, params.movableId);
            if (params.x >= 0) {
                currentSprites[sprite.movableId] = sprite;
            }
            return sprite;
        },
        getSprites: function() {
            return currentSprites;
        },
        updatePosition: function(id, x, y) {
            var sprite = currentSprites[id];
            if (sprite) {
                sprite.x = x;
                sprite.y = y;
            }
        },
        updateSprite: function(params) {
            var sprite = currentSprites[params.movableId];
            if (sprite) {
                if (params.type === "marioStillFacingRight") {
                    // console.log("update sprite standing still facing right");
                }
                setSpriteSheetPosition.call(this, params.type);
                renderer.updateSprite({ spriteSheetPosition: this.spriteSheetPosition,
                                        movableId: params.movableId});
            }
        },
        removeSprite: function(movableId) {
            var sprite = currentSprites[movableId];
            if (sprite) {
                renderer.removeSprite(movableId);
            }
        }
    };
});
