var root = {
  wavecolor: {  
    r: 255,
    g: 215,
    b: 0
    },
    rainbowSpeed: 0.1,
    rainbow: true,
    matrixspeed: 50
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

var hueFw = false;
var hue = -0.01;

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// the characters
var konkani  = "ក	ខ	គ	ឃ	ង	ច	ឆ	ជ	ឈ	ញ	ដ	ឋ	ឌ	ឍ	ណ	ត ថ	ទ	ធ	ន	ប	ផ	ព	ភ	ម	យ	រ	ល	វ	ឝ	ឞ	ស ហ	ឡ	អ	ឣ	ឤ	ឥ	ឦ	ឧ	ឨ	ឩ	ឪ	ឫ	ឬ	ឭ	ឮ	ឯ ឰ	ឱ	ឲ	ឳ	ា	ិ	ី	ឹ	ឺ	ុ	ូ	ួ	ើ	ឿ ៀ	េ	ែ	ៃ	ោ	ៅ	ំ	ះ	ៈ	៉	៊	់	៌	៍	៎	៏ ័	៑	 ្ 	៓	។	៕	៖	ៗ	៘	៙	៚	៛	ៜ	៝ ០	១	២	៣	៤	៥	៦	៧	៨	៩ ៰	៱	៲	៳	៴	៵	៶	៷	៸	៹";
konkani = konkani.split("	").join(""); // removing the tab characters
// converting the string into an array of single characters
var characters = konkani.split("");
var font_size = 14;
var columns = c.width/font_size;    // number of columns for the rain
var gradient = ctx.createLinearGradient(0,10, 0,200);
// an array of drops - one per column
var drops = [];
// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = 1;

// drawing the characters
function draw() {
    // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
    // translucent BG to show trail

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#BBB"; // grey text
    ctx.font = font_size + "px khmer";

    // looping over drops
    for (var i = 0; i < drops.length; i++)
    {
        // background color
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(i * font_size, drops[i] * font_size,font_size,font_size);
        // a random chinese character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size
        //root.rainbow = false
        if (root.rainbow) {
          hue += (hueFw) ? 0.01 : -0.01;
          var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
          var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
          var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
          ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
        } else {
          ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
        }

        ctx.fillText(text, i * font_size, drops[i] * font_size);
        // Incrementing Y coordinate
        drops[i]++;
        // sending the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
       if (drops[i] * font_size > c.height && Math.random() > 0.975)
			      drops[i] = 0;
    }
}

setInterval(draw, root.matrixspeed);


function livelyPropertyListener(name, val)
{
  switch(name) {
    case "matrixColor":
      root.wavecolor =  hexToRgb(val);
      break;
    case "rainBow":
      root.rainbow = val;
      break;   
    case "rainbowSpeed":
      root.rainbowSpeed = val/100;
      break;     
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

