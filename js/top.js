// JavaScript Document

$(function() {
	var breakpoint = 768; //ブレイクポイント

	function load_after01() {
		var hei = $(window).height();
		$("#bgLoader")
			.height(hei)
			.css("display", "block");

		$(window).load(function() {
			$("#bgLoader")
				.delay(100)
				.fadeOut(1000);
		});
	}

	function load_after02() {
		$(".js-inview").on("inview", function(event, isInView) {
			if (isInView) {
				$(this)
					.find(".js-inview_block")
					.each(function(i) {
						$(this)
							.delay(300 * i)
							.queue(function() {
								$(this)
									.addClass("js-inview_show")
									.dequeue();
							});
					});
			}
		});
	}

	load_after01();

	$(window).on("load", function() {
		load_after02();
	});

	$(window).on("load resize", function() {
		var browseWid = $(window).width(); //ブラウザの横幅取得
		var widPc = browseWid > breakpoint; //PC表示のとき
		var widSp = browseWid <= breakpoint; //SP表示のとき

		let $bubble01 = $(".deco_bubble01");
		let $bubble02 = $(".deco_bubble02");
		let $bubble03 = $(".deco_bubble03");
		let $bubble04 = $(".deco_bubble04");
		let $bubble05 = $(".deco_bubble05");
		let $bubble06 = $(".deco_bubble06");

		// if (widPc) {
		// bubble
		$bubble01.morphing({
			numVert: 6, //円の粒度
      spring: 0.005,  //バネ運動の動作数値
      friction: 0.90, //摩擦運動の動作数値
      radius: 110, //Canvasの表示半径
      fps: 45
		});

		$bubble02.morphing({
			numVert: 6,
			spring: 0.005,
			friction: 0.9,
			radius: 50,
			fps: 45
		});

		$bubble03.morphing({
			numVert: 6,
			spring: 0.005,
			friction: 0.9,
			radius: 50,
			fps: 45
		});

		$bubble04.morphing({
			numVert: 20,
			spring: 0.01,
			friction: 0.9,
			radius: 55,
			fps: 90
		});

		$bubble05.morphing({
			numVert: 20,
			spring: 0.01,
			friction: 0.9,
			radius: 85,
			fps: 90
		});

		$bubble06.morphing({
			numVert: 20,
			spring: 0.01,
			friction: 0.9,
			radius: 85,
			fps: 90
		});
		// }
		// else if (widSp) {
		// 	$bubble01.morphing({
		// 		numVert: 20,
		// 		spring: 0.01,
		// 		friction: 0.9,
		// 		radius: 50,
		// 		fps: 90
		// 	});

		// 	$bubble02.morphing({
		// 		numVert: 20,
		// 		spring: 0.01,
		// 		friction: 0.9,
		// 		radius: 60,
		// 		fps: 90
		// 	});

		// 	$bubble03.morphing({
		// 		numVert: 20,
		// 		spring: 0.01,
		// 		friction: 0.9,
		// 		radius: 50,
		// 		fps: 90
		// 	});

		// 	$bubble04.morphing({
		// 		numVert: 20,
		// 		spring: 0.01,
		// 		friction: 0.9,
		// 		radius: 45,
		// 		fps: 90
		// 	});

		// 	$bubble05.morphing({
		// 		numVert: 20,
		// 		spring: 0.01,
		// 		friction: 0.9,
		// 		radius: 47,
		// 		fps: 90
		// 	});

		// 	$bubble06.morphing({
		// 		numVert: 20,
		// 		spring: 0.01,
		// 		friction: 0.9,
		// 		radius: 45,
		// 		fps: 90
		// 	});
		// }
	});

	
});



//chart
!function(){var a=function(a,b){var c=document.createElement("canvas");"undefined"!=typeof G_vmlCanvasManager&&G_vmlCanvasManager.initElement(c);var d=c.getContext("2d");if(c.width=c.height=b.size,a.appendChild(c),window.devicePixelRatio>1){var e=window.devicePixelRatio;c.style.width=c.style.height=[b.size,"px"].join(""),c.width=c.height=b.size*e,d.scale(e,e)}d.translate(b.size/2,b.size/2),d.rotate((-0.5+b.rotate/180)*Math.PI);var f=(b.size-b.lineWidth)/2;b.scaleColor&&b.scaleLength&&(f-=b.scaleLength+2);var g=function(a,b,c){c=Math.min(Math.max(0,c||1),1),d.beginPath(),d.arc(0,0,f,0,2*Math.PI*c,!1),d.strokeStyle=a,d.lineWidth=b,d.stroke()},h=function(){var a,c,e=24;d.lineWidth=1,d.fillStyle=b.scaleColor,d.save();for(var e=24;e>=0;--e)0===e%6?(c=b.scaleLength,a=0):(c=.6*b.scaleLength,a=b.scaleLength-c),d.fillRect(-b.size/2+a,0,c,1),d.rotate(Math.PI/12);d.restore()};Date.now=Date.now||function(){return+new Date};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}();this.clear=function(){d.clearRect(b.size/-2,b.size/-2,b.size,b.size)},this.draw=function(a){this.clear(),b.scaleColor&&h(),b.trackColor&&g(b.trackColor,b.lineWidth),d.lineCap=b.lineCap;var c;c="function"==typeof b.barColor?b.barColor(a):b.barColor,a>0&&g(c,b.lineWidth,a/100)}.bind(this),this.animate=function(a,c){var d=Date.now();b.onStart(a,c);var e=function(){var f=Math.min(Date.now()-d,b.animate),g=b.easing(this,f,a,c-a,b.animate);this.draw(g),b.onStep(a,c,g),f>=b.animate?b.onStop(a,c):i(e)}.bind(this);i(e)}.bind(this)},b=function(b,c){var d,e={barColor:"#ef1e25",trackColor:"#f9f9f9",scaleColor:"#dfe0e0",scaleLength:5,lineCap:"round",lineWidth:3,size:110,rotate:0,animate:1e3,renderer:a,easing:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},onStart:function(){},onStep:function(){},onStop:function(){}},f={},g=0,h=function(){this.el=b,this.options=f;for(var a in e)e.hasOwnProperty(a)&&(f[a]=c&&"undefined"!=typeof c[a]?c[a]:e[a],"function"==typeof f[a]&&(f[a]=f[a].bind(this)));f.easing="string"==typeof f.easing&&"undefined"!=typeof jQuery&&jQuery.isFunction(jQuery.easing[f.easing])?jQuery.easing[f.easing]:e.easing,d=new f.renderer(b,f),d.draw(g),b.dataset&&b.dataset.percent&&this.update(parseInt(b.dataset.percent,10))}.bind(this);this.update=function(a){return a=parseInt(a,10),f.animate?d.animate(g,a):d.draw(a),g=a,this}.bind(this),h()};window.EasyPieChart=b}();

var options = {
  scaleColor: false,
  trackColor: '#e8e8e8',
  barColor: '#ebc7da',
  lineWidth: 6,
  lineCap: 'butt',
  size: 95
};

window.addEventListener('DOMContentLoaded', function() {
  var charts = [];
  [].forEach.call(document.querySelectorAll('.chart'),  function(el) {
    charts.push(new EasyPieChart(el, options));
  });
});


