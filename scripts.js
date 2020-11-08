// Credit https://runeapps.org/jadsim_app
// Asset swap by @downthecrop
// Nov 8, 2020

function startup() {
    mode = 0;
    praybook = 0;
    ping = 40;
    invtab = 1;
    prayprot = 0;
    framenr = 0;
    cooldown = 1000000;
    potcooldown = 0;
    tickstr = "";
    tickcount = 0;
    maxlife = 990;
    maxpray = 990;
    lifepoints = maxlife;
    praypoints = 990;
    loaded = 0;
    blindmode = 0;
    potions = new Array();
    potions[0] = 13;
    potions[1] = 13;
    potions[2] = 13;
    potions[3] = 23;
    potions[4] = 13;
    potions[5] = 13;
    potions[6] = 13;
    potions[7] = 23;
    potions[8] = 13;
    potions[9] = 13;
    potions[10] = 13;
    potions[11] = 23;
    potions[12] = 13;
    potions[13] = 13;
    potions[14] = 13;
    potions[15] = 23;
    potions[16] = 13;
    potions[17] = 13;
    potions[18] = 13;
    potions[19] = 23;
    potions[20] = 13;
    potions[21] = 13;
    potions[22] = 13;
    potions[23] = 23;
    potions[24] = 13;
    potions[25] = 13;
    potions[26] = 13;
    potions[27] = 23;
    imgback = new Image();
    imgback.src = "interface_base.png";
    imgtabs = new Image();
    imgtabs.src = "alltabs.png";
    imgprayeron = new Image();
    imgprayeron.src = "allprays.png";
    imgoverhead = new Image();
    imgoverhead.src = "overheadprays.png";
    imghpbar = new Image();
    imghpbar.src = "hpbar.png";
    imgdigits = new Image();
    imgdigits.src = "digits.png";
    imghit = new Image();
    imghit.src = "hitsplats.png";
    imghpicon = new Image();
    imghpicon.src = "hpicon.png";
    imgpotions = new Image();
    imgpotions.src = "potions.png";
    prayprotstartup = 0;
}

window.onload = function() {
    drawall();
    setTimeout(drawall, 2000);
    tick();
    mset_volume(.5);
    if (navigator.userAgent.indexOf("Chrome") == -1) {
        var a = document.getElementById("volumeselect");
        a.innerHTML = "<input id='volrange' onchange='mset_volume(this.checked)' type='checkbox'> sounds";
    }
}


function klik(ev) {
    var el = document.getElementById('maincvs');
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    var xx = ev.clientX - _x;
    var yy = ev.clientY - _y;


    //inv tab
    if (xx > 541 && xx < 771 && yy > 169 && yy < 203) {
        invtab = 0;
        drawinv();
    }
    //prayer tab
    if (xx > 681 && xx < 751 && yy > 169 && yy < 203) {
        invtab = 1;
        drawinv();
    }
    if (xx > 521 && xx < 551 && yy > 466 && yy < 502) {
        invtab = 2;
        drawinv();
    }
    if (invtab == 0 && xx > 564 && xx < 732 && yy > 213 && yy < 465) {
        var i = 4 * Math.floor((yy - 213) / 36) + Math.floor((xx - 564) / 42);
        if (potions[i] >= 10 && potions[i] <= 13) {
            fakesend("if(potcooldown<=0){playsound(\"a_potion\"); if(lifepoints>maxlife){lifepoints=maxlife;}lifepoints+=20;  lifepoints+=Math.floor(maxlife*0.15); if(potions[" + i + "]==10){potions[" + i + "]=1;}else{potions[" + i + "]-=1;} potcooldown=2; drawinv();}")
        }
        if (potions[i] >= 20 && potions[i] <= 23) {
            fakesend("if(potcooldown<=0){playsound(\"a_potion\"); praypoints+=Math.floor(maxpray*0.33); if(praypoints>maxpray){praypoints=maxpray;} if(potions[" + i + "]==20){potions[" + i + "]=1;}else{potions[" + i + "]-=1;} potcooldown=2; drawinv();}")
        }
    }
    //prayers selection
    if (invtab == 1 && praybook == 0) {
        var xxx = Math.floor((xx - 33 - 519) / 37);
        var yyy = Math.floor((yy - 41 - 168) / 36);
        console.log("clickpos:" +xx + yy + "floored" + xxx + " "+ yyy);
        //yyy = 3 is overheads
        if (xxx == 1 && yyy == 3) {
            fakesend("if(praypoints>0){if(prayprot==1){prayprot=0;}else{prayprot=1;} drawpray();}")
        }
        if (xxx == 2 && yyy == 3) {
            fakesend("if(praypoints>0){if(prayprot==2){prayprot=0;}else{prayprot=2;} drawpray();}")
        }
        if (xxx == 3 && yyy == 3) {
            fakesend("if(praypoints>0){if(prayprot==3){prayprot=0;}else{prayprot=3;} drawpray();}")
        }
    }
}

function drawall() {
    var c = document.getElementById("maincvs");
    c.width = c.width;
    c = c.getContext("2d");
    mx = 0;
    my = 0;
    if (mode == 2) {
        mx = 8;
        my = -8;
    }
    if (mode == 3) {
        mx = 8;
        my = -9;
    }
    c.drawImage(imgback, 0, 0);
    drawinv();
    drawpray();
    drawpoints();
}

function drawinv() {
    var c = document.getElementById("maincvs");
    c = c.getContext("2d");
    if (invtab == 0) {
        c.drawImage(imgtabs, 0, 0, 246, 335, 519, 168, 246, 335);
        var i = 0;
        while (i < potions.length) {
            if (potions[i] >= 10 && potions[i] <= 13) {
                c.drawImage(imgpotions, 32 * (potions[i] - 9), 0, 32, 32, 564 + (i % 4) * 42, 213 + Math.floor(i / 4) * 36, 32, 32);
            }
            if (potions[i] >= 20 && potions[i] <= 23) {
                c.drawImage(imgpotions, 32 * (potions[i] - 19), 32, 32, 32, 564 + (i % 4) * 42, 213 + Math.floor(i / 4) * 36, 32, 32);
            }
            if (potions[i] == 1) {
                c.drawImage(imgpotions, 0, 0, 32, 32, 564 + (i % 4) * 42, 213 + Math.floor(i / 4) * 36, 32, 32);
            }
            i += 1;
        }
    }
    if (invtab == 1 && praybook == 0) {
        c.drawImage(imgtabs, 246, 0, 246, 335, 519, 168, 246, 335);
        if (prayprot == 1) {
            c.drawImage(imgprayeron, 37, 72, 37, 36, 519 + 37 + 31, 168 + 72 + 83, 37, 36)
        }
        if (prayprot == 2) {
            c.drawImage(imgprayeron, 74, 72, 37, 36, 519 + 74 + 31, 168 + 72 + 83, 37, 36)
        }
        if (prayprot == 3) {
            c.drawImage(imgprayeron, 111, 72, 37, 36, 519 + 111 + 31, 168 + 72 + 83, 37, 36)
        }
    }
    if (invtab == 1 && praybook == 1) {
        c.drawImage(imgtabs, 492, 0, 246, 335, 519, 168, 246, 335);
        if (prayprot == 11) {
            c.drawImage(imgcurseson, 37, 72, 37, 36, 519 + 37 + 33, 168 + 72 + 41, 37, 36)
        }
        if (prayprot == 12) {
            c.drawImage(imgcurseson, 74, 72, 37, 36, 519 + 74 + 33, 168 + 72 + 41, 37, 36)
        }
        if (prayprot == 13) {
            c.drawImage(imgcurseson, 111, 72, 37, 36, 519 + 111 + 33, 168 + 72 + 41, 37, 36)
        }
    }
    if (invtab == 2) {
        c.drawImage(imgtabs, 738, 0, 246, 335, 519, 168, 246, 335);
    }
}

function drawpray() {
    var c = document.getElementById("maincvs");
    c = c.getContext("2d");
    c.globalCompositeOperation = 'destination-out';
    c.fillRect(242 + mx, 102 + my, 30, 30);
    c.globalCompositeOperation = 'source-over';
    if (prayprot == 1) {
        c.drawImage(imgoverhead, 0, 0, 29, 29, 242 + mx, 102 + my, 29, 29);
    }
    if (prayprot == 2) {
        c.drawImage(imgoverhead, 0, 30, 29, 29, 242 + mx, 102 + my, 29, 29);
    }
    if (prayprot == 3) {
        c.drawImage(imgoverhead, 0, 60, 29, 29, 242 + mx, 102 + my, 29, 29);
    }
    if (prayprot == 11) {
        c.drawImage(imgoverhead, 30, 0, 29, 29, 242 + mx, 102 + my, 29, 29);
    }
    if (prayprot == 12) {
        c.drawImage(imgoverhead, 30, 30, 29, 29, 242 + mx, 102 + my, 29, 29);
    }
    if (prayprot == 13) {
        c.drawImage(imgoverhead, 30, 60, 29, 29, 242 + mx, 102 + my, 29, 29);
    }
    if (invtab == 1) {
        drawinv();
    }
}

function tick() {
    if (prayprot != 0 && prayprotstartup == 1) {
        praypoints -= 2;
    }
    if (prayprot != 0) {
        prayprotstartup = 1
    } else {
        prayprotstartup = 0
    }
    if (praypoints <= 0) {
        praypoints = 0;
        prayprot = 0;
        drawpray();
    }
    if (tickcount % 10 == 0) {
        if (lifepoints < maxlife) {
            lifepoints += 8;
        }
        if (lifepoints > maxlife) {
            lifepoints -= 8;
        }
    }
    drawpoints();
    eval(tickstr);
    tickstr = "";
    if (cooldown <= 0 && (mode == 0 || mode == 2)) {
        var a = Math.floor(Math.random() * 2);
        m = document.getElementById("mageattack");
        r = document.getElementById("rangeattack");
        if (a == 0) {
            cooldown = 8;
            if (blindmode == 0) {
                r.style.zIndex = 1;
                m.style.zIndex = 2;
                m.currentTime = 0;
                m.play();
            }
            playsound("a_mage");
            setTimeout("checkpray(1)", 3000);
        }
        if (a == 1) {
            cooldown = 8;
            if (blindmode == 0) {
                m.style.zIndex = 1;
                r.style.zIndex = 2;
                r.currentTime = 0;
                r.play();
            }
            playsound("a_range");
            setTimeout("checkpray(2)", 3000);
        }
    }
    if (cooldown <= 0 && (mode == 1 || mode == 3)) {
        var a = Math.floor(Math.random() * 3);
        m = document.getElementById("mageattack");
        r = document.getElementById("rangeattack");
        c = document.getElementById("meleeattack");
        if (a == 0) {
            cooldown = 8;
            if (blindmode == 0) {
                r.style.zIndex = 1;
                c.style.zIndex = 1;
                m.style.zIndex = 2;
                m.currentTime = 0;
                m.play();
            }
            playsound("a_mage");
            setTimeout("checkpray(1)", 2400);
        }
        if (a == 1) {
            cooldown = 8;
            if (blindmode == 0) {
                c.style.zIndex = 1;
                m.style.zIndex = 1;
                r.style.zIndex = 2;
                r.currentTime = 0;
                r.play();
            }
            playsound("a_range");
            setTimeout("checkpray(2)", 2400);
        }
        if (a == 2) {
            cooldown = 4;
            if (blindmode == 0) {
                m.style.zIndex = 1;
                r.style.zIndex = 1;
                c.style.zIndex = 2;
                c.currentTime = 0;
                c.play();
            }
            playsound("a_melee");
            setTimeout("checkpray(3)", 600);
        }
    }
    cooldown -= 1;
    setTimeout("tick()", 600);
    potcooldown -= 1;
    tickcount += 1;
}

function drawpoints() {
    var c = document.getElementById("maincvs");
    c = c.getContext("2d");
    var d = 25 - Math.floor(lifepoints / maxlife * 25);
    if (d < 0) {
        d = 0;
    }
    //hp orb
    if (d < 25) {
        c.drawImage(imghpicon, 0, d, 57, 25 - d, 516, 45 + d, 57, 25 - d);
    }
    if (d > 0) {
        c.drawImage(imghpicon, 0, 25, 57, d, 516, 45, 57, d);
    }
    var d = 25 - Math.floor(praypoints / maxpray * 25);
    //pray orb
    if (d < 25) {
        c.drawImage(imghpicon, 57, d, 57, 25 - d, 515, 78 + d, 57, 25 - d);
    }
    if (d > 0) {
        c.drawImage(imghpicon, 57, 25, 57, d, 515, 78, 57, d);
    }

    var a = Math.floor(lifepoints / maxlife * 56) + 1;
    if (a > 57) {
        a = 57;
    }
    c.drawImage(imghpbar, 0, 1, a, 8, 229 + mx, 133 + my, a, 8);
    c.drawImage(imghpbar, a, 10, 58 - a, 8, 229 + a + mx, 133 + my, 58 - a, 8);

    var b = 0;
    if (lifepoints < maxlife * 0.75) {
        b = 1;
    }
    if (lifepoints < maxlife * 0.5) {
        b = 2;
    }
    if (lifepoints < maxlife * 0.25) {
        b = 3;
    }
    var i = 0;
    var l = 0;
    while (i < 2) {
        var a = parseInt(("" + lifepoints).charAt(i));
        c.drawImage(imgdigits, 10 * b, a * 12, 6, 12, 524 + l, 57, 6, 12);
        if (a == 1) {
            l += 4
        } else if (a == 4) {
            l += 5
        } else if (a == 3 || a == 5 || a == 7) {
            l += 6
        } else {
            l += 7
        }
        i += 1;
    }
    var b = 0;
    if (praypoints < maxpray * 0.75) {
        b = 1;
    }
    if (praypoints < maxpray * 0.5) {
        b = 2;
    }
    if (praypoints < maxpray * 0.25) {
        b = 3;
    }
    var i = 0;
    var l = 0;
    while (i < 2) {
        var a = parseInt(("" + praypoints).charAt(i));
        c.drawImage(imgdigits, 10 * b, a * 12, 6, 12, 526 + l, 91, 6, 12);
        if (a == 1) {
            l += 4
        } else if (a == 4) {
            l += 5
        } else if (a == 3 || a == 5 || a == 7) {
            l += 6
        } else {
            l += 7
        }
        i += 1;
    }
}

function checkpray(attstyle) {
    var a_def = document.getElementById("a_deflect");
    if (mode == 0 || mode == 1) {
        if (attstyle == 1) {
            if (prayprot == 1 || prayprot == 11) {
                setTimeout("takehit(0)", 1500);
                if (prayprot == 11) {
                    playsound("a_deflect")
                }
            } else {
                setTimeout("takehit(1)", 1500)
            }
        }
        if (attstyle == 2) {
            if (prayprot == 2 || prayprot == 12) {
                setTimeout("takehit(0)", 1500);
                if (prayprot == 12) {
                    playsound("a_deflect")
                }
            } else {
                setTimeout("takehit(2)", 1500)
            }
        }
        if (attstyle == 3) {
            if (prayprot == 3 || prayprot == 13) {
                takehit(0);
                if (prayprot == 13) {
                    playsound("a_deflect")
                }
            } else {
                takehit(3)
            }
        }
    } else {
        if (attstyle == 1) {
            if (prayprot == 1 || prayprot == 11) {
                setTimeout("takehit(11)", 1500);
                if (prayprot == 11) {
                    playsound("a_deflect")
                }
            } else {
                setTimeout("takehit(1)", 1500)
            }
        }
        if (attstyle == 2) {
            if (prayprot == 2 || prayprot == 12) {
                setTimeout("takehit(12)", 1500);
                if (prayprot == 12) {
                    playsound("a_deflect")
                }
            } else {
                setTimeout("takehit(2)", 1500)
            }
        }
        if (attstyle == 3) {
            if (prayprot == 3 || prayprot == 13) {
                takehit(13);
                if (prayprot == 13) {
                    playsound("a_deflect")
                }
            } else {
                takehit(3)
            }
        }
    }
}

function takehit(attstyle) {
    var c = document.getElementById("maincvs");
    c = c.getContext("2d");
    if (attstyle == 0 || lifepoints == 0) {
        c.drawImage(imghit, 0, 0, 52, 30, 230 + mx, 144 + my, 52, 30);
    } else {
        if (mode == 0 || mode == 1) {
            var h = Math.floor(Math.random() * 8000);
        } else {
            var h = Math.floor(Math.random() * 10000);
        }
        if (attstyle >= 10) {
            h = Math.floor(h * 0.05);
            attstyle -= 10;
        }
        if (h < 1) {
            h = 1;
        }
        if (h > lifepoints) {
            h = lifepoints;
            setTimeout("death()", 3000);
        }
        lifepoints -= h;
        if (attstyle == 1) {
            c.drawImage(imghit, 0, 30, 20, 20, 230 + mx, 144 + my, 20, 20);
        }
        if (attstyle == 2) {
            c.drawImage(imghit, 0, 50, 20, 20, 230 + mx, 144 + my, 20, 20);
        }
        if (attstyle == 3) {
            c.drawImage(imghit, 0, 70, 20, 20, 230 + mx, 144 + my, 20, 20);
        }
        //if(h>=100 && h<10000){c.drawImage(imghit,20,70,32,20,250+mx,144+my,32,20)}
        //if(h>=10 && h<100){c.drawImage(imghit,20,50,32,20,250+mx,144+my,32,20)}
        //if(h>=1 && h<10){c.drawImage(imghit,20,30,32,20,250+mx,144+my,32,20)}
        var i = 0;
        while (i < 2) {
            var a = parseInt(("" + h).charAt(i));
            c.drawImage(imgdigits, 40, a * 12, 8, 12, 256 + i * 7 + mx, 148 + my, 8, 12);
            i += 1;
        }
    }
    drawpoints();
    setTimeout("var c=document.getElementById('maincvs'); c=c.getContext('2d'); c.globalCompositeOperation='destination-out'; c.fillRect(230+mx,144+my,54,30); c.globalCompositeOperation='source-over';", 1200);
}

function death() {
    lifepoints = maxlife;
}

function fakesend(c) {
    setTimeout("tickstr+='" + c + "'", ping)
}

function playsound(a) {
    document.getElementById(a).currentTime = 0;
    document.getElementById(a).play();
}


//============================================ menu ===============================================

function mset_prayers(a) {
    if (a == 0) {
        praybook = 1
    } else {
        praybook = 0
    }
    drawinv();
}

function mset_mode(a, b) {
    if ((a == 0 && b == -1 && mode == 1) || (b == 0 && a == -1 && mode == 2)) {
        mode = 0;
        document.getElementById("vids").innerHTML = '\n\
        <video style="position:absolute; left:4px; top:4px; display:hidden; z-index:1;" id="mageattack" preload="auto">\n\
          <source src="jf_mage.mp4" type="video/mp4">\n\
          <source src="jf_mage.ogv" type="video/ogv">Srsly bro, upgrade your browser</video>\n\
        <video style="position:absolute; left:4px; top:4px; display:hidden; z-index:1;" id="rangeattack" preload="auto">\n\
          <source src="jf_range.mp4" type="video/mp4">\n\
          <source src="jf_range.ogv" type="video/ogv">Srsly bro, upgrade your browser</video>'
    }
    if (b != -1) {
        drawall();
    }
}

function mset_jadtype(a) {}

function mset_level(a) {
    if (a == 0) {
        maxlife = 9001;
        lifepoints = 9001;
        maxpray = 990;
        praypoints = 990;
    }
    if (a == 1) {
        maxlife = 5000;
        lifepoints = 5000;
        maxpray = 700;
        praypoints = 700;
    }
    if (a == 2) {
        maxlife = 1000;
        lifepoints = 1000;
        maxpray = 400;
        praypoints = 400;
    }
    drawpoints();
}

function mset_inv(a) {
    potions.length = 0;
    if (a == 0) {
        potions[0] = 13;
        potions[1] = 13;
        potions[2] = 13;
        potions[3] = 23;
        potions[4] = 13;
        potions[5] = 13;
        potions[6] = 13;
        potions[7] = 23;
        potions[8] = 13;
        potions[9] = 13;
        potions[10] = 13;
        potions[11] = 23;
        potions[12] = 13;
        potions[13] = 13;
        potions[14] = 13;
        potions[15] = 23;
        potions[16] = 13;
        potions[17] = 13;
        potions[18] = 13;
        potions[19] = 23;
        potions[20] = 13;
        potions[21] = 13;
        potions[22] = 13;
        potions[23] = 23;
        potions[24] = 13;
        potions[25] = 13;
        potions[26] = 13;
        potions[27] = 23;
    }
    if (a == 1) {
        potions[0] = 13;
        potions[1] = 13;
        potions[2] = 13;
        potions[3] = 13;
        potions[4] = 13;
        potions[5] = 13;
        potions[6] = 23;
        potions[7] = 23;
    }
    if (a == 2) {
        potions[0] = 10;
        potions[1] = 1;
        potions[2] = 1;
        potions[3] = 11;
        potions[4] = 1;
        potions[5] = 21;
        potions[6] = 22;
        potions[7] = 1;
        potions[8] = 1;
        potions[9] = 1;
        potions[10] = 1;
        potions[11] = 1;
        potions[12] = 20;
    }
    drawinv();
}

function mset_ping(a) {
    if (a == 0) {
        ping = 40
    }
    if (a == 1) {
        ping = 200
    }
    if (a == 2) {
        ping = 500
    }
}

function mset_volume(a) {
    a = a * a * a
    document.getElementById("a_mage").volume = a;
    document.getElementById("a_range").volume = a;
    document.getElementById("a_melee").volume = a;
    document.getElementById("a_deflect").volume = a;
    document.getElementById("a_potion").volume = a;
}

function mset_blind(a) {
    blindmode = a;
}