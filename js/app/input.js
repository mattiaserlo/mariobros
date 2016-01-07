define([], function() {

    var KEYCODE_PLAYER1_UP 	  = 38;
    var KEYCODE_PLAYER1_DOWN  = 40;
    var KEYCODE_PLAYER1_LEFT  = 37;
    var KEYCODE_PLAYER1_RIGHT = 39;
    var KEYCODE_PLAYER1_FIRE  = 32;

    var KEYCODE_PLAYER2_UP 	  = 87;
    var KEYCODE_PLAYER2_DOWN  = 83;
    var KEYCODE_PLAYER2_LEFT  = 65;
    var KEYCODE_PLAYER2_RIGHT = 68;
    var KEYCODE_PLAYER2_FIRE  = 70;

    var keyStatePlayer1 = {
        up:    false,
        down:  false,
        left:  false,
        right: false,
        fire:  false
    };

    var keyStatePlayer2 = {
        up:    false,
        down:  false,
        left:  false,
        right: false,
        fire:  false
    };

    // Set up key event listeners

    document.onkeydown = function(evt) {
        switch (evt.keyCode) {
            case KEYCODE_PLAYER1_UP:
                keyStatePlayer1.up = true;
                break;
            case KEYCODE_PLAYER1_DOWN:
                keyStatePlayer1.down = true;
                break;
            case KEYCODE_PLAYER1_LEFT:
                keyStatePlayer1.left = true;
                break;
            case KEYCODE_PLAYER1_RIGHT:
                keyStatePlayer1.right = true;
                break;
            case KEYCODE_PLAYER1_FIRE:
                keyStatePlayer1.fire = true;
                break;

            case KEYCODE_PLAYER2_UP:
                keyStatePlayer2.up = true;
                break;
            case KEYCODE_PLAYER2_DOWN:
                keyStatePlayer2.down = true;
                break;
            case KEYCODE_PLAYER2_LEFT:
                keyStatePlayer2.left = true;
                break;
            case KEYCODE_PLAYER2_RIGHT:
                keyStatePlayer2.right = true;
                break;
            case KEYCODE_PLAYER2_FIRE:
                keyStatePlayer2.fire = true;
                break;
        }
    };

    document.onkeyup = function(evt) {
        switch (evt.keyCode) {
            case KEYCODE_PLAYER1_UP:
                keyStatePlayer1.up = false;
                break;
            case KEYCODE_PLAYER1_DOWN:
                keyStatePlayer1.down = false;
                break;
            case KEYCODE_PLAYER1_LEFT:
                keyStatePlayer1.left = false;
                break;
            case KEYCODE_PLAYER1_RIGHT:
                keyStatePlayer1.right = false;
                break; 
            case KEYCODE_PLAYER1_FIRE:
                keyStatePlayer1.fire = false;
            break;

            case KEYCODE_PLAYER2_UP:
                keyStatePlayer2.up = false;
                break;
            case KEYCODE_PLAYER2_DOWN:
                keyStatePlayer2.down = false;
                break;
            case KEYCODE_PLAYER2_LEFT:
                keyStatePlayer2.left = false;
                break;
            case KEYCODE_PLAYER2_RIGHT:
                keyStatePlayer2.right = false;
                break; 
            case KEYCODE_PLAYER2_FIRE:
                keyStatePlayer2.fire = false;
            break;
        }
    };

    return {
        read: function(inputId) {
            if (inputId === 0) {
                return keyStatePlayer1;
            } else if (inputId === 1) {
                return keyStatePlayer2;
            }
        }
    };
});
