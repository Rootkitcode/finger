var hasConsole = typeof console !== "undefined";


var n21payReport = function () {
    var d1 = new Date();
    var bfp = new n21pay_fing2();

    bfp.get(function (result, components) {
        var d2 = new Date();
        var time = d2 - d1;

        /* document.querySelector("#time").textContent = time;
        document.querySelector("#bfp").textContent = result; */

        var details = "";
        Window.booFinger = result;
        Window.time = time;
        if (hasConsole) {
            /* console.log("time", time);
            console.log("Boofinger hash", result); */
        }
        /* console.log('hola'); */
        for (var index in components) {
            var obj = components[index];
            var line = obj.key + " = " + String(obj.value).substr(0, 100);


            if (obj.key === "user_agent") {
                Window.user_agent = obj.value;

            } else if (obj.key === "language") {
                Window.language = obj.value;
            } else if (obj.key === "color_depth") {
                Window.color_depth = obj.value;
            } else if (obj.key === "device_memory") {
                Window.device_memory = obj.value;
            } else if (obj.key === "hardware_concurrency") {
                Window.hardware_concurrency = obj.value;
            } else if (obj.key === "resolution") {
                Window.resolution = obj.value;
            } else if (obj.key === "available_resolution") {
                Window.available_resolution = obj.value;
            } else if (obj.key === "timezone_offset") {
                Window.timezone_offset = obj.value;
            } else if (obj.key === "timezone") {
                Window.timezone = obj.value;
            } else if (obj.key === "session_storage") {
                Window.session_storage = obj.value;
            } else if (obj.key === "local_storage") {
                Window.local_storage = obj.value;
            } else if (obj.key === "indexed_db") {
                Window.indexed_db = obj.value;
            } else if (obj.key === "open_database") {
                Window.open_database = obj.value;
            } else if (obj.key === "cpu_class") {
                Window.cpu_class = obj.value;
            } else if (obj.key === "navigator_platform") {
                Window.navigator_platform = obj.value;
            } else if (obj.key === "regular_plugins") {
                Window.regular_plugins = obj.value;
            } else if (obj.key === "canvas") {
                Window.canvas = obj.value;
            } else if (obj.key === "webgl") {
                Window.webgl = obj.value;
            } else if (obj.key === "webgl_vendor") {
                Window.webgl_vendor = obj.value;
            } else if (obj.key === "adblock") {
                Window.adblock = obj.value;
            } else if (obj.key === "has_lied_languages") {
                Window.has_lied_languages = obj.value;
            } else if (obj.key === "has_lied_browser") {
                Window.has_lied_browser = obj.value;
            } else if (obj.key === "has_lied_os") {
                Window.has_lied_os = obj.value;
            } else if (obj.key === "has_lied_resolution") {
                Window.has_lied_resolution = obj.value;
            } else if (obj.key === "touch_support") {
                Window.touch_support = obj.value;
            } else if (obj.key === "js_fonts") {
                Window.js_fonts = obj.value;
            } else if (obj.key === "audio_bfp") {
                Window.audio_bfp = obj.value;
            }
            if (hasConsole) {
                /* console.log(line); */
            }

            details += line + "\n";
        }
        /*         document.querySelector("#details").textContent = details;
         */
    });
};

var cancelId;
var cancelFunction;

if (window.requestIdleCallback) {
    cancelId = requestIdleCallback(n21payReport);
    cancelFunction = cancelIdleCallback;
} else {
    cancelId = setTimeout(n21payReport, 500);
    cancelFunction = clearTimeout;
}

/* document.querySelector("#btn").addEventListener("click", function () {
    if (cancelId) {
        cancelFunction(cancelId);
        cancelId = undefined;
    }
    n21payReport();
}); */
