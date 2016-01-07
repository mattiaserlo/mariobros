define([],
function() {

    var debugStrings = [];

    var print = function(string, x) {
        debugStrings[x] = string;
    };

    return {
        print: print,
        getStrings: function() {
            return debugStrings;
        }
    };
});
