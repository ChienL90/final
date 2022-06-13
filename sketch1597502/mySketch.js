var capture//宣告變數
var cacheGraphics//抓取影像
var bk
var mode=1//宣告變數初始值
var inputElement,sliderElement
var mic 
var colors = "ffb5a7-fcd5ce-f8edeb-f9dcc4-fec89a".split("-").map(a=>"#"+a)
class Ball_1{ //定義物件快速建立同類型的物件 
	constructor(args){ //參數預設值(工廠) 宣告物件ball的值 用args接收參數
		this.r=args.r || 20 //直徑 // 用變數名稱args接收r值  ||符號主要設定優先使用args.r，如果沒有傳args.r參數，採用下一個值
		this.p=args.p || {x:width/2,y:height/2}//p的位置
		this.color = args.color || random(colors) //顏色
	}
	draw(){//繪製函數 //微笑臉
		push()
			translate(this.p.x, this.p.y)
			fill(random(colors))
		 ellipse( 0,0, this.r);//臉
		 	ellipse(-this.r/2,-this.r/2,this.r/2)//耳朵
  		ellipse(this.r/2,-this.r/2,this.r/2)//耳朵
		  fill("#e7c6ff")
			ellipse(this.r/4, -this.r/4 , this.r/8);//眼睛
			ellipse(-this.r/4, -this.r/4 , this.r/8);//眼睛
			fill("#caffbf")
		 arc(0,0,this.r/2,this.r/2,0,PI)	//嘴巴弧度		
		fill(0)
		pop()
	}
}
class Ball{//定義物件
	constructor(args){ // 參數預設值(工廠)
		this.r= args.r || 30 // ||符號主要設定優先使用args.r，如果沒有傳args.r參數，採用下一個值
		this.p= args.p || {x:random(width),y:random(height)}  //p的位置
		this.color = args.color || random(colors)//顏色
	}	
	
	draw(){  //  繪製函數 小熊
			push() 
			translate(this.p.x, this.p.y)
			fill(this.color)
		  ellipse(-this.r/2,-this.r/2,this.r/2)//耳朵
  		ellipse(this.r/2,-this.r/2,this.r/2)//耳朵
			ellipse( 0,0, this.r);//臉
			fill(255)
			arc(0,0,this.r/2,this.r/2,0,PI)//嘴巴大弧度
			fill(0)
			arc(0,0,this.r/3,this.r/3,0,PI)//嘴巴小弧度

		
		pop()
	}

}

var ball
var balls=[]  //宣告一個陣列產生多個
function setup() {
	createCanvas(windowWidth, windowHeight);//創建畫布
	background(0);
	
	capture = createCapture(VIDEO)//抓取video設備的指令
	capture.size(640,480);//設定顯示畫面大小
	cacheGraphics = createGraphics(640,480)	//用宣告的變數創造一個graphics
	cacheGraphics.translate(640,0) // 先往右移動一倍距離
	cacheGraphics.scale(-1,1) // 翻轉畫布
	capture.hide();//把capture的圖隱藏起來
	
	inputElement=createInput("") //文字框
	inputElement.position(850,70)  //文字框位置
	
	sliderElement= createSlider(30,150,30,3)//設定滑桿最小值，最大值，預設值，間距
	sliderElement.position(850,180)//滑桿位置
	
	mic = new p5.AudioIn() //取得麥克風的聲音放入變數mic裡
	mic.start()//開始取樣
}

function draw() {
	background("#051923");//畫面不會暫留,不會有軌跡//文字顏色
	textSize(30)//文字大小
	textStyle(BOLD)//文字粗體
   fill("#FF99AC")//文字顏色
	text("上方可輸入文字，輸入pizza&cry會有圖示🤟🏻",880,160)//顯示文字
	fill("#FF7096")//文字顏色
	text("按下1，顯示圓圈",880,300)//顯示文字
	fill("#FF5C8A")//文字顏色
	text("按下2，顯示文字",880,350)//顯示文字
	fill("#FF477E")//文字顏色
	text("按下3，原相機",880,400)//顯示文字
	fill("#ff477e")//文字顏色
	text("按下4，顯示旋轉圓圈",880,450)//顯示文字
	fill("#d90368")//文字顏色
	text("按下5，聲音大小聲變換圖片",880,500)//顯示文字
	
	
	balls=[]
  cacheGraphics.image(capture, 0,0)//將圖設定在座標0,0顯示一張圖 就不會隨著滑鼠移動而產生圖,取capture值
	


var span=20+max(mouseX,0)/20 //宣告變數 雙迴圈裡面每次的間隔+mouseX方塊隨著滑鼠移動改變大小 往左最大值為0不會是負數
for(var x=0 ; x<cacheGraphics.width; x+=span){//做一個雙迴圈 切一塊一塊的方塊
	for(var y=0;y<cacheGraphics.height; y+=span){
    var pixel = cacheGraphics.get(x,y);

		bk = (pixel[0] + pixel[1] + pixel[2])/3 //RGB 的平均值,把顏色轉成灰階 0代表r 1代表g 2代表b 3是透明度



		
		
		
		
		if(mode=="1"){
			fill(bk)//畫面充滿灰階
					ellipse(x+100,y+100,span*map(bk,0,255,0,1))//bk的值在0(黑)-255(白)間 經過map值會轉換成0-1間 藉此利用顏色改變那個顏色圓的大小
				}	
		
		if(mode=="2"){
			let txt = "Lee";
			fill(pixel)//充滿原色
			text("Lee",x,y)
			textSize(span)//文字大小
			textStyle(BOLD)//粗體
		}

		if(mode=="3"){
		image(capture,0,0)//顯示畫面圖
		}
			
		if(mode=="4"){
			fill(pixel)	
			push()//圓旋轉
				colorMode(HSB) //色相，飽和度，亮度
				fill(pixel[6],100,80)
				translate(x,y)
				rotate(pixel[0]/100) //轉動，左上角轉動
				ellipse(0,0,span*0.5+pixel[2]/50) 
	      fill("#ffc9b9")//中心圓淡粉色
	      strokeWeight(5)//邊線粗細	
	      ellipse(0,0,10)//加一個圓在外圓中間
				pop()
		}
	  if(mode=="5"){
			var micLevel=mic.getLevel();//宣告變數 取得麥克風的大小聲的資料
			
			if(micLevel>0.005){
			ball = new Ball_1({p:{x:x,y:y},color: color(pixel[0],pixel[1],pixel[2]) }) //產生一個新的物件
			}//產生一個新的物件 傳參數 p的位置 r的直徑 color顏色
			else
			{
			ball = new Ball({p:{x:x,y:y},color: color(pixel[0],pixel[1],pixel[2]) }) //產生一個新的物件
			}
				balls.push(ball)//把ball放到陣列裡
		}
	}
	}
	
	  if(mode=="5"){
			for(let ball of balls){//設迴圈
			ball.draw()	 //繪製		
	}
		}

	
	  var txts=	inputElement.value()  //取得文字框文字
	  if(txts=="pizza"){//輸入pizza產生相關圖示
    txts="🍕"
    }
    if(txts=="cry"){//輸入cry產生相關圖示
    txts="🥲"
    }
		fill("#ffff00")  //顏色
	  //textSize(50)  //大小
	  textSize(sliderElement.value())  //大小
	  textStyle(BOLD)  //粗體
	  for(var x=0;x<width;x=x+textWidth(txts)+10){   
		//從0開始，不能超過視窗寬度，取得文字寬度，間距10
  	text(txts,x,30) //顯示文字在座標上
	}
	
	
}


function keyPressed(){
	if(key=="1"){
		mode=1
	}//當鍵盤被按1的時候 顯示模式1
	if(key=="2"){
		mode=2
	}//當鍵盤被按2的時候 顯示模式2
	if(key=="3"){
		mode=3
	}//當鍵盤被按3的時候 顯示模式3
		if(key=="4"){
		mode=4
	}//當鍵盤被按4的時候 顯示模式4
	if(key=="5"){
		mode=5
	}//當鍵盤被按5的時候 顯示模式5

}