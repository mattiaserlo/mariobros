define([
    "js/app/sprites"],
function(
    sprites) {

    var unitWidth  =  8;
    var unitHeight =  8;
    var numUnitsX  = 32;
    var numUnitsY  = 28;
    var numPixelsX = numUnitsX * unitWidth;
    var numPixelsY = numUnitsY * unitHeight;

    var mapSprites = {};

    var mapEncoding = { 1: sprites.spriteTypes.BLUE_STEEL,
                        2: sprites.spriteTypes.RED_BRICK,

                        3: sprites.spriteTypes.PIPE_LEFT_TOP,
                        4: sprites.spriteTypes.PIPE_LEFT_L1,
                        5: sprites.spriteTypes.PIPE_LEFT_M1,
                        6: sprites.spriteTypes.PIPE_LEFT_MM1,
                        7: sprites.spriteTypes.PIPE_LEFT_R1,
                        8: sprites.spriteTypes.PIPE_LEFT_L2,
                        9: sprites.spriteTypes.PIPE_LEFT_M2,
                        10: sprites.spriteTypes.PIPE_LEFT_MM2,
                        11: sprites.spriteTypes.PIPE_LEFT_R2,
                        12: sprites.spriteTypes.PIPE_LEFT_L3,
                        13: sprites.spriteTypes.PIPE_LEFT_R3,
                        14: sprites.spriteTypes.PIPE_LEFT_L4,
                        15: sprites.spriteTypes.PIPE_LEFT_R4,
                        16: sprites.spriteTypes.PIPE_LEFT_L5,
                        17: sprites.spriteTypes.PIPE_LEFT_R5,
                        18: sprites.spriteTypes.PIPE_LEFT_L6,
                        19: sprites.spriteTypes.PIPE_LEFT_R6,

                        20: sprites.spriteTypes.PIPE_RIGHT_TOP,
                        21: sprites.spriteTypes.PIPE_RIGHT_L1,
                        22: sprites.spriteTypes.PIPE_RIGHT_M1,
                        23: sprites.spriteTypes.PIPE_RIGHT_MM1,
                        24: sprites.spriteTypes.PIPE_RIGHT_R1,
                        25: sprites.spriteTypes.PIPE_RIGHT_L2,
                        26: sprites.spriteTypes.PIPE_RIGHT_M2,
                        27: sprites.spriteTypes.PIPE_RIGHT_MM2,
                        28: sprites.spriteTypes.PIPE_RIGHT_R2,
                        29: sprites.spriteTypes.PIPE_RIGHT_L3,
                        30: sprites.spriteTypes.PIPE_RIGHT_R3,
                        31: sprites.spriteTypes.PIPE_RIGHT_L4,
                        32: sprites.spriteTypes.PIPE_RIGHT_R4,
                        33: sprites.spriteTypes.PIPE_RIGHT_L5,
                        34: sprites.spriteTypes.PIPE_RIGHT_R5,
                        35: sprites.spriteTypes.PIPE_RIGHT_L6,
                        36: sprites.spriteTypes.PIPE_RIGHT_R6,

                        37: sprites.spriteTypes.PIPE_LEFT_MM1_B,
                        38: sprites.spriteTypes.PIPE_LEFT_R1_B,
                        39: sprites.spriteTypes.PIPE_LEFT_MM2_B,
                        40: sprites.spriteTypes.PIPE_LEFT_R2_B,

                        41: sprites.spriteTypes.PIPE_RIGHT_L1_B,
                        42: sprites.spriteTypes.PIPE_RIGHT_M1_B,
                        43: sprites.spriteTypes.PIPE_RIGHT_L2_B,
                        44: sprites.spriteTypes.PIPE_RIGHT_M2_B
                    };

    var encodedMap1 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 4, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,21,22,23,24],
                        [ 8, 9,10,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,25,26,27,28],
                        [12,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,29,30],
                        [14,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,31,32],
                        [16,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33,34],
                        [18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,35,36],
                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                        [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [37,38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,41,42],
                        [39,40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,43,44],
                        [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                        [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]];

    var decodeMap = function(map) {
        var i, j;
        var decodedMap = [];
        for (i=0; i<map.length; i++) {
            decodedMap[i] = [];
            for (j=0; j<map[i].length; j++) {
                decodedMap[i][j] = mapEncoding[map[i][j]];
            }
        }
        return decodedMap;
    };

    var createSpritesFromMap = function(map) {
        var i, j;
        for (i=0; i<map.length; i++) {
            for (j=0; j<map[i].length; j++) {
                if (map[i][j] && !mapSprites[map[i][j]]) {
                    mapSprites[map[i][j]] = sprites.createSprite({  type: map[i][j],
                                                                    x: -1,
                                                                    y: -1});
                }
            }
        }
    };

    var decodedMap1 = decodeMap(encodedMap1);

    createSpritesFromMap(decodedMap1);

    return {
        unitWidth:  unitWidth,
        unitHeight: unitHeight,
        numUnitsX:  numUnitsX,
        numUnitsY:  numUnitsY,
        numPixelsX: numPixelsX,
        numPixelsY: numPixelsY,
        getMap: function () {
            return decodedMap1;
        },
        getMapSprites: function() {
            return mapSprites;
        },
        setUnit: function(x, y, type) {
            decodedMap1[y][x] = type;
        }
    };
});
