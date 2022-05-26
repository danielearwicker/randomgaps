var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth * window.devicePixelRatio;
canvas.height = canvas.clientHeight * window.devicePixelRatio;

ctx.strokeStyle = "purple";
ctx.lineCap = "round";
ctx.lineWidth = 16;

function arc(from: number, to: number) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height * 0.4, 
            Math.PI * (from + 1), Math.PI * (to + 1), false);
    ctx.stroke();
}

var pieces: [from: number, to: number][] = [
    [0, 0.5],
    [0.55, 0.65],
    [0.7, 0.8],
    [0.85, 1]
];

function render(value: number) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const [from, to] of pieces) {
        ctx.globalAlpha = 0.3;
        arc(from, to);

        ctx.globalAlpha = 1;

        if (value > to) {
            arc(from, to);
        } else if (value > from) {
            arc(from, value);
        }
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "24pt Helvetica";
    ctx.fillText("random gaps!", canvas.width / 2, canvas.height / 2);
}

let value = 0;

function doFrame() {

    render(value);

    value += 0.01;
    if (value > 1) value = 0;

    requestAnimationFrame(doFrame);
}

doFrame();