const canvas=document.querySelector('#can'),
toolBtns=document.querySelectorAll('.tools'),
clearCanvas=document.querySelector('#clear-canvas'),
saveCanvas=document.querySelector('#save-canvas'),
ctx=canvas.getContext('2d');

let prevMouseX,prevMouseY, snapshot,
isDrawing=false;
selectedTool="brush",
brushWidth=3;

window.addEventListener('load', () =>{
    canvas.width = canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
});

const drawRect=(e)=>{
    ctx.stroke(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
}

const startDraw=(e)=> {
    isDrawing=true;
    prevMouseX=e.offsetX;
    prevMouseY=e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot,0,0);
    if(selectedTool=="brush"){
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }else if(selectedTool=="square"){
        drawRect(e);
    }

    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}

toolBtns.forEach(btn=>{
    btn.addEventListener('click',() =>{
        // selectedTool=btn.id;
        console.log(btn.id);
    });
});

clearCanvas.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

saveCanvas.addEventListener("click",()=>{
    const link=document.createElement("a");
    link.download=`${Date.now()}.jpg`;
    link.href =canvas.toDataURL();
    link.click();
})
canvas.addEventListener('mousedown',startDraw);
canvas.addEventListener('mousemove',drawing);
canvas.addEventListener('mouseup',() => isDrawing=false);



const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            clear:true,
            save:true,
        }
    }
});

pickr.on('change', (color, instance) => {
    const rgbaColor=color.toRGBA().toString();
    console.log(rgbaColor)
    document.querySelector('#can').style.background=rgbaColor;
}).on('save', (color, instance) => {
    console.log('Event: "save"', color, instance);
}).on('clear', instance => {
    console.log('Event: "clear"', instance);
})