jewel.audio = (function () {
    var extension,
        sounds,
        activeSounds;

    function initialize() {
        extension = "mp3";

        sounds = {};
        activeSounds = [];
    }

    function createAudio(name) {
        var el = new Audio("sounds/" + name + "." + extension);

        jewel.dom.bind(el, "ended", cleanActive);

        sounds[name] = sounds[name] || [];

        sounds[name].push(el);
        return el;
    }

    function getAudioElement(name) {
        if (sounds[name]) {
            for (var i = 0, n = sounds[name].length; i < n; i++) {
                if (sounds[name][i].ended) {
                    return sounds[name][i];
                }
            }
        }
        return createAudio(name);
    }

    function play(name) {
        var audio = getAudioElement(name);
        audio.play();
        activeSounds.push(audio);
    }

    function stop() {
        for (var i=activeSounds.length-1; i>=0; i--) {
            activeSounds[i].stop();
        }
        activeSounds = [];
    }

    function cleanActive() {
        for (var i=0; i<activeSounds.length; i++) {
            if (activeSounds[i].ended) {
                activeSounds.splice(i,1);
            }
        }
    }

    return {
        initialize: initialize,
        play: play,
        stop: stop
    };
})();