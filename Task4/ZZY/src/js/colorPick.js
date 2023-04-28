//获取元素
let container = document.querySelector('.color-picker');
let colorOpacity = container.querySelector(".color-opacity");
let colorMove = container.querySelector('.color-move');
let colorHue = container.querySelector(".hue");
let colorShow = container.querySelector(".color-show");
let canvas = container.querySelector('canvas');

//声明一个全局变量
let color = {
    h: 0,
    s: '100%',
    l: '50%',
    a: 1
};

let index = 0;
let method = 'toRgbString';

//绑定事件
container.addEventListener('mousedown', function (e) {
    //修改鼠标的状态
    this.isDown = true;

})

//鼠标移动事件
container.addEventListener('mousemove', function (e) {
    //判断鼠标是否按下
    if (!this.isDown) return;
    //判断事件源
    if (e.target === colorOpacity || e.target.parentNode === colorOpacity) {
        //处理透明度元素
        let _this = colorOpacity;
        //获取元素
        let slide = _this.querySelector('.slide')
        //计算新的 top 值
        let newTop = e.clientY - _this.getBoundingClientRect().top;
        //判断边界
        newTop = Math.min(Math.max(0, newTop), _this.offsetHeight - slide.offsetHeight);
        //修改元素的 top 样式
        slide.style.top = newTop + 'px';
        //设置
        color.a = 1 - newTop / _this.offsetHeight;
    }

    if (e.target === colorHue || e.target.parentNode === colorHue) {
        //处理透明度元素
        let _this = colorHue;
        //获取元素
        let slide = _this.querySelector('.slide')
        //计算新的 top 值
        let newTop = e.clientY - _this.getBoundingClientRect().top;
        //判断边界
        newTop = Math.min(Math.max(0, newTop), _this.offsetHeight - slide.offsetHeight);
        //修改元素的 top 样式
        slide.style.top = newTop + 'px';
        //设置   这里微调一下, 将色相值调校 * 360
        color.h = newTop / _this.offsetHeight * 360;
        //重新绘制
        draw();
    }

    //判断是移动区
    if (e.target === colorMove || e.target.parentNode === colorMove) {
        //处理透明度元素
        let _this = colorMove;
        //获取元素
        let move = _this.querySelector('.move');
        //鼠标距离色块的偏移量
        let offsetX = e.clientX - _this.getBoundingClientRect().left;
        let offsetY = e.clientY - _this.getBoundingClientRect().top;
        //计算新的 top 值
        let newTop = offsetY - move.offsetHeight / 2;
        let newLeft = offsetX - move.offsetWidth / 2;
        //判断边界
        newTop = Math.min(Math.max(-move.offsetHeight / 2, newTop), _this.offsetHeight - move.offsetHeight + move.offsetHeight / 2);
        newLeft = Math.min(Math.max(-move.offsetHeight / 2, newLeft), _this.offsetWidth - move.offsetWidth + move.offsetHeight / 2);
        //修改元素的 top 样式
        move.style.top = newTop + 'px';
        move.style.left = newLeft + 'px';
        //计算水平方向的移动比例   
        let sX = offsetX / canvas.width
        //设置饱和度
        color.s = sX * 100 + '%';
        //计算垂直方向的移动比例   亮度
        let sY = offsetY / canvas.height;
        //计算当前坐标顶部的亮度
        let initL = 100 - 50 * sX;
        //设置亮度
        color.l = initL - initL * sY;
    }

    changeBg();
})

//鼠标抬起事件
container.addEventListener('mouseup', function (e) {
    this.isDown = false;
})

//色域显示区域实现
function draw() {
    //设置画布的宽度和高度
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
    //获取画笔
    let ctx = canvas.getContext('2d');
    //设置水平方向的渐变
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 1);
    //设置渐变的开始颜色
    // gradient.addColorStop(0, 'hsl(0,0%, 100%)');
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, `hsl(${color.h}, 100%, 50%)`);
    //画线
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0, canvas.width, 1);

    //获取水平方向上的像素点
    let pixelData = ctx.getImageData(0, 0, canvas.width-1, 1).data;
    //遍历数组
    for (let i = 0; i < pixelData.length; i += 4) {
        // 获取数据
        let data = {
            r: pixelData[i],
            g: pixelData[i + 1],
            b: pixelData[i + 2],
            a: pixelData[i + 3]
        };
        //创建线性渐变
        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgb(${data.r}, ${data.g}, ${data.b})`);
        gradient.addColorStop(1, `rgb(0,0,0)`);
        //画线
        ctx.fillStyle = gradient;
        ctx.fillRect(i / 4, 0, i / 4, canvas.height-1);
    }
}

draw();

//改变背景颜色函数封装
function changeBg() {
    // console.log(tinycolor(color));
    //修改 div 的背景颜色
    colorShow.style.background = tinycolor(color)[method]();
    //改变show div 的文本颜色
    colorShow.style.color = parseInt(color.l) >= 50 ? 'black' : 'white'; 
    //改变 show div 的显示文本
    colorShow.innerHTML = tinycolor(color)[method]();
    //改变 body 的背景
    // document.body.style.background = `radial-gradient(#ccc, ${tinycolor(color)[method]()})`
}

//改变显示方式
function changeType() {
    let type = {
        0: 'rgb',
        1: 'hex',
        2: 'hsl'
    }
    //判断
    switch (index % 3) {
        case 0:
            method = 'toRgbString';
            break;
        case 1:
            method = 'toHex8String';
            break;
        case 2:
            method = 'toHslString';
            break;
        default:
            break;
    }
    index++;
}


// //绑定事件
// window.addEventListener('contextmenu', function(e){
//     changeType();
//     changeBg();
//     e.preventDefault();
// })
container.addEventListener('contextmenu', function (e) {
    changeType();
    changeBg();
    e.preventDefault();
})