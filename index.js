var splash_id = 1;
var internal_count = 0;
function toggleSplash() {
    console.log('toggle');
    internal_count++;
    if (internal_count % 6 == 0) {
        splash_id = 2;
    } else {
        splash_id = 1;
    }
    var splash = document.getElementById('splash');
    splash.src = 'assets/splash-' + splash_id + '-min.svg';
}
setInterval(toggleSplash, 500);
