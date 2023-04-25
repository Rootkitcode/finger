
var hasConsole = typeof console !== "undefined";
var resultado = '';
var n21payReport = function () {
    var d1 = new Date();
    var bfp = new n21pay_fing2();
    bfp.get(function (result, components) {
        var d2 = new Date();
        var time = d2 - d1;
        /* document.querySelector("#time").textContent = time;
        document.querySelector("#bfp").textContent = result; */
        var details = "";
        if (hasConsole) {
            console.log("time", time);
            console.log("Boofinger hash", result);
            resultado = result;
        }
        for (var index in components) {
            var obj = components[index];
            var line = obj.key + " = " + String(obj.value).substr(0, 100);
            if (hasConsole) {
                console.log(line);
            }
            details += line + "\n";
        }
        /* document.querySelector("#details").textContent = details; */
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
