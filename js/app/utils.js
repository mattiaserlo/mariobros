define([],
function() {

    return {
        copyObj: function(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    };
});
