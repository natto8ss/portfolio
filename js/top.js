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
      radius: 80, //Canvasの表示半径
      fps: 45
		});

		$bubble02.morphing({
			numVert: 6,
			spring: 0.005,
			friction: 0.9,
			radius: 60,
			fps: 45
		});

		$bubble03.morphing({
			numVert: 20,
			spring: 0.01,
			friction: 0.9,
			radius: 85,
			fps: 90
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


window.onload = function(){  // ローディング画面をフェードアウトさせる
    $(function() {
        $(".loading").fadeOut(3000);
    });
}
           
$(window).load(function () {  //全ての読み込みが完了したら実行する
    $('.loader').delay(900).fadeOut(500);
    $('#wrap').css('display', 'block');
});
 
$(function(){  //10秒たったらロードを終わらせる
    setTimeout('stopload()',10000);
});


