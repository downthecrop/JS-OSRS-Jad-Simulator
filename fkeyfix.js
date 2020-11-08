(navigator.userAgent.search(/msie|safari/i) != -1) ? document.onkeydown = keyHit: document.onkeypress = keyHit;

function keyHit(e) {
    var keyhit = e.keyCode ? e.keyCode : e.charCode
    if (keyhit == 112) {
        event.stopPropagation();
        event.preventDefault();
        invtab = 0;
        drawinv()
    }
    if (keyhit == 114) {
        event.stopPropagation();
        event.preventDefault();
        invtab = 1;
        drawinv();
    }
}