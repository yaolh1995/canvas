var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
(function () {

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawStuff();
    }
    resizeCanvas();

    function drawStuff() {

    }
})();

let isDrawing = false;
let x = 0;
let y = 0;
// Add the event listeners for mousedown, mousemove, and mouseup
var isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.addEventListener('touchstart', e => {
        let x = e.touches[0].clientX-5
        let y = e.touches[0].clientY-5
        if (e.target == canvas) {
            e.preventDefault();
          }
          last=[x,y];
        isDrawing = true;
        
    });

    canvas.addEventListener('touchmove', e => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (e.target == canvas) {
            e.preventDefault();
          }
        if (isDrawing === true) {
        drawLine(ctx, last[0]-5, last[1] - 5, e.touches[0].clientX - 5, e.touches[0].clientY - 5);
        last=[x,y];}    
    });
} else {

    /* 上面是touches */
    canvas.addEventListener('mousedown', e => {
        x = e.clientX ;
        y = e.clientY ;
        isDrawing = true;
    });

    canvas.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            drawLine(ctx, x-8, y-8, e.clientX-8, e.clientY-8);
            x = e.clientX;
            y = e.clientY;
        }
    });

    canvas.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            drawLine(ctx, x-8, y-8 , e.clientX-8 , e.clientY-8 );
            isDrawing = false;
        }
    });
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokestyle = '#000000';
    ctx.lineWidth = 10;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.lineCap = "round"
}
