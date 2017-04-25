//speed in path-lengths per minute
function conveyor(el,speed,reversed) {
  var speed    = speed    || 1,
      reversed = reversed || 0;

  var len = reversed ? -el.getTotalLength() : el.getTotalLength(),
      dur = 60000/speed;

  el.attr('stroke-dashoffset', len);

  el.animate({ 'stroke-dashoffset': 0 }, dur );
}

function addStrokeAnimation(part, speed) {
  var speed    = speed    || 20;

  part.selectAll('path').forEach(function(el, i){
    el.attr({ 'stroke-dasharray': el.getTotalLength() + " " + el.getTotalLength()});

    conveyor(el, speed ,i);
  });
}

// background music
var bgmusic = document.getElementById('bgmusic');

// Reset the style
var s = Snap('#zitat');
s.selectAll('path').attr({fill: '#010002'});
s.selectAll('path').attr({'fill-opacity': 0});
s.selectAll('rect').attr({'fill-opacity': 0});

document.getElementById('zitat').style.display = 'block';

var the_land = s.select('.the-land'),
    of_the = s.select('.of-the'),
    blind = s.select('.blind'),
    unten = s.select('.unten'),
    eyelid = s.select('.eyelid'),
    one_eyed = s.select('.one-eyed'),
    man_is = s.select('.man-is'),
    king = s.select('.king'),
    crown = s.select('.crown');

setTimeout(function() {
  the_land.attr({stroke: '#010002'});
  addStrokeAnimation(the_land);
}, 2000);

setTimeout(function() {
  the_land.selectAll('path').animate({'fill-opacity': 1}, 2000);
  of_the.selectAll('path').animate({'fill-opacity': 1}, 2000);
  blind.attr({stroke: '#010002'});
  addStrokeAnimation(blind, 30);
}, 5000);

setTimeout(function() {
  blind.selectAll('path').animate({'fill-opacity': 1}, 1000, mina.easeout, function (){
  });
}, 7000);

setTimeout(function() {
    one_eyed.selectAll('path').animate({'fill-opacity': 1}, 2000);
    man_is.selectAll('path').animate({'fill-opacity': 1}, 3000);
}, 9500);

setTimeout(function() {
    king.attr({stroke: '#010002'});
    addStrokeAnimation(king);
}, 11000);

setTimeout(function() {
    king.selectAll('path').animate({'fill-opacity': 1}, 2000);
    crown.selectAll('path').animate({'fill-opacity': 1}, 2000);

    crown.selectAll('rect').attr({'fill': '#8A0707'});
    crown.selectAll('rect').animate({'fill-opacity': 1}, 2000);

    var fadeAudio = setInterval(function () {

        if (bgmusic.volume > 0.4) {
            bgmusic.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (bgmusic.volume === 0.4) {
            clearInterval(fadeAudio);
        }
    }, 200);

}, 14000);

// Crown zoom
var bbox = crown.getBBox(),
    crown_sound = document.getElementById('crown_sound');

crown.hover(function() {
  if (crown.select('rect').attr('fill-opacity') != 1) return;

  crown_sound.play();
  crown.animate({ transform: "s1.1,1.1," + bbox.cx + "," + bbox.cy}, 100, mina.bounce, function () {
    crown.selectAll('path').attr({'fill': '#8A0707'});
  });
}, function() {
  crown.animate({ transform: "s1,1," + bbox.cx + "," + bbox.cy}, 100, mina.bounce, function () {
    crown.selectAll('path').attr({'fill': '#010002'});
  });
});

// close the eye
var blink_sound = document.getElementById('blink_sound');

s.mouseover(function(e) {
  if (crown.select('rect').attr('fill-opacity') != 1) return;

    eyelid.animate({'fill-opacity': 1}, 50, mina.easeout, function (){
      eyelid.animate({'fill-opacity': 0}, 50, mina.easeout, function (){
        eyelid.animate({'fill-opacity': 1}, 50, mina.easeout, function (){
          eyelid.animate({'fill-opacity': 0}, 50, mina.easeout, function (){
          });
        });
      });
    });

    blink_sound.play();
});
