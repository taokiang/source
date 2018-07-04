var main={};


// 获取 ID
main.Id = function(id){
	 return typeof id ==="string"?document.getElementById(id):id;
};


// 涂抹 刮奖
main.fn1 = function(){
    var star = 1;
    var nums = 0;
    var canvas = document.getElementById("cas"),ctx = canvas.getContext("2d");
    var x1,y1,a=30,timeout,totimes = 100,jiange = 30;

    var img = new Image();
    img.src = "img/img4.jpg";  //封面图片
    img.onload = function(){
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      tapClip();
    }
    //通过修改globalCompositeOperation来达到擦除的效果
    function tapClip(){

        var hastouch = "ontouchstart" in window?true:false,
        tapstart = hastouch?"touchstart":"mousedown",
        tapmove = hastouch?"touchmove":"mousemove",
        tapend = hastouch?"touchend":"mouseup";
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = a*2;
        ctx.globalCompositeOperation = "destination-out";
        
        canvas.addEventListener(tapstart , function(e){
          clearTimeout(timeout)
          e.preventDefault();
          
          x1 = hastouch?e.targetTouches[0].pageX - parseInt(getPos(canvas).left) : e.clientX-canvas.offsetLeft;
          y1 = hastouch?e.targetTouches[0].pageY - parseInt(getPos(canvas).top)  : e.clientY-canvas.offsetTop;
          ctx.save();
          ctx.beginPath();
          ctx.arc(x1,y1,1,0,2*Math.PI);
          ctx.fill();
          ctx.restore();
          
          canvas.addEventListener(tapmove,tapmoveHandler);
          canvas.addEventListener(tapend,function(){
          canvas.removeEventListener(tapmove,tapmoveHandler);
            
            timeout = setTimeout(function(){
              main.Id("box_box").style.display = "none";
              if(nums>50){
                 canvas.style.display = "none";
                 if(star == 1){
                  star = 0;
                  alert("OK")
                }
                
              };
            },totimes)
          });
          function tapmoveHandler(e){

            nums++;
            clearTimeout(timeout);
            e.preventDefault();
            x2 = hastouch?e.targetTouches[0].pageX - parseInt(getPos(canvas).left) : e.clientX-canvas.offsetLeft;
            y2 = hastouch?e.targetTouches[0].pageY - parseInt(getPos(canvas).top)  : e.clientY-canvas.offsetTop;
            ctx.save();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            ctx.restore();
            x1 = x2;
            y1 = y2;
          }
        })
    }
    //  得到 到页面的 top left  值
   function getPos(obj){
      var l =0;
      var t =0;
      while(obj){
        l+= obj.offsetLeft;
        t+= obj.offsetTop;
        obj=obj.offsetParent;
      }
      return {left:l,top:t};
   }
};

main.fn1();

 