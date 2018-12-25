enchant(); // おまじない

window.onload = function() {


    var game_ = new Game(900, 1600); // ゲーム本体を準備すると同時に、表示される領域の大きさを設定しています。
    game_.fps = 30; // frames(フレーム) per(毎) second(秒): ゲームの進行スピードを設定しています。
    game_.preload('./img/素材/ui/title.png'); // pre(前)-load(読み込み): ゲームに使う素材を予め読み込んでおきます。
	game_.preload('./img/素材/ui/tap.png'); 
    game_.preload('./img/素材/ui/tap2.png'); 
    game_.preload('./img/素材/ui/waku.png'); 
    game_.preload('./img/素材/ui/retry.png'); 
	game_.preload('./img/素材/1/背景1.png'); 
	game_.preload('./img/素材/1/前景1.png'); 
	game_.preload('./img/素材/1/オブジェクト1.png'); 
	game_.preload('./img/ホコリ動きpng/ホリコ　動き　2.0.png'); 
    var score=0;

    

    game_.onload = function() { // ゲームの準備が整ったらメインの処理を実行します。

        //タイトルシーン   
        var TitleScene = function(){
            score=0;
            var scene = new Scene();                                            // 新しいシーンを作る
            var bg1 = new Sprite(900, 1600);            // スプライトを作る
			bg1.image = game_.assets['./img/素材/1/背景1.png']; // 画像を設定
			bg1.x = 0;                                 // 横位置調整
			bg1.y = 0;                                 // 縦位置調整
			scene.addChild(bg1); 
            
            var pillar = new Sprite(900, 1600);            // スプライトを作る
			pillar.image = game_.assets['./img/素材/1/オブジェクト1.png']; // 画像を設定
			pillar.x = -130;                                 // 横位置調整
			pillar.y = -400;                                    // 縦位置調整
			pillar.scale(1.5,1.5);
            scene.addChild(pillar); 

            var bg2 = new Sprite(900, 1600);            // スプライトを作る
			bg2.image = game_.assets['./img/素材/1/前景1.png']; // 画像を設定
			bg2.x = 0;                                 // 横位置調整
			bg2.y = 0;                                 // 縦位置調整
			scene.addChild(bg2);  


            var title = new Sprite(225, 195);            // スプライトを作る
			title.image = game_.assets['./img/素材/ui/title.png']; // 画像を設定
			title.x = 640;                                 // 横位置調整
			title.y = 40;                                 // 縦位置調整
			scene.addChild(title); 

            var tap = new Sprite(327, 144);            // スプライトを作る
			tap.image = game_.assets['./img/素材/ui/tap.png']; // 画像を設定
			tap.x = 400;                                 // 横位置調整
			tap.y = 500;                                 // 縦位置調整
            tap.scale(1.6,1.6);
			scene.addChild(tap); 

            var horiko = new Sprite(1000, 1000);            // スプライトを作る
			horiko.image = game_.assets['./img/ホコリ動きpng/ホリコ　動き　2.0.png']; // 画像を設定
			horiko.x = -50;                                 // 横位置調整
			horiko.y = 650;                                 // 縦位置調整
            horiko.scale(0.5,0.5);
			scene.addChild(horiko);  


            scene.addEventListener(Event.TOUCH_START, function(e) {
                game_.replaceScene(GameScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            // タイトルシーンを返します。
            return scene;
        };

        //ゲームシーン
        var GameScene = function(){
            var scene = new Scene();
            

            var SCROLL_SPEED = 10;
            var SCROLL_DIST = 700;

            var bg1 = new Sprite(900, 1600);            // スプライトを作る
			bg1.image = game_.assets['./img/素材/1/背景1.png']; // 画像を設定
			bg1.x = 0;                                 // 横位置調整
			bg1.y = 0;                                 // 縦位置調整
			scene.addChild(bg1); 
            




            var horiko_img = new Sprite(1000, 1000);            // スプライトを作る
			horiko_img.image = game_.assets['./img/ホコリ動きpng/ホリコ　動き　2.0.png']; // 画像を設定
                                   // 縦位置調整
            horiko_img.scale(0.25,0.25);

            var col = new Sprite(150, 150);            // スプライトを作る
            //col.backgroundColor='#999999';                               // 縦位置調整                       // 縦位置調整
            col.x = 425;
            col.y =425;

            var horiko = new Group();
            horiko.addChild(col);
            horiko.addChild(horiko_img)
            horiko.x = -200;                                 // 横位置調整
			horiko.y = 300;          
			scene.addChild(horiko);   

            var pillars = [];
            
            for(var i=0;i<2;i++){

                var p_a = new Sprite(900, 1600);            // スプライトを作る
                p_a.image = game_.assets['./img/素材/1/オブジェクト1.png']; // 画像を設定
                p_a.x = 0;                                 // 横位置調整
                p_a.y = -700;                                    // 縦位置調整
                p_a.scale(0.9,-0.9);

                var p_b = new Sprite(900, 1600);            // スプライトを作る
                p_b.image = game_.assets['./img/素材/1/オブジェクト1.png']; // 画像を設定
                p_b.x = 0;                                 // 横位置調整
                p_b.y = 700;                                    // 縦位置調整
                p_b.scale(0.9,0.9);

                var col_a = new Sprite(280,1000);
                col_a.x = 170; 
                col_a.y = -460; 
                //col_a.backgroundColor='#999999';

                var col_b = new Sprite(280,1000);
                col_b.x = 170; 
                col_b.y = 1060; 
                //col_b.backgroundColor='#999999';

                var pillar = new Group();
                pillar.addChild(col_a);
                pillar.addChild(p_a);
                pillar.addChild(p_b);
                pillar.addChild(col_b);
                pillar.x=1000+i*SCROLL_DIST;
                pillar.y=Math.random()*600-300;
                pillars.push(pillar);
                scene.addChild(pillars[i]);

            } 
            var bg2 = new Sprite(900, 1600);            // スプライトを作る
			bg2.image = game_.assets['./img/素材/1/前景1.png']; // 画像を設定
			bg2.x = 0;                                 // 横位置調整
			bg2.y = 0;                                 // 縦位置調整
			scene.addChild(bg2);  
 
            /*
            var wall_tops=[];
            var wall_bottoms=[];
            var rand_h = 70;

            for(var i=0;i<2;i++){
	         	var wall_top = new Sprite(64,338);
				var wall_bottom = new Sprite(64,338);
				wall_top.image = game_.assets['./img/wall.png'];
				wall_bottom.image = game_.assets['./img/wall.png'];
				wall_top.x = 320+224*i;
				wall_bottom.x = 320+224*i;
				var h=Math.random()*rand_h*2-rand_h;
				wall_top.y = -220+h;
				wall_bottom.y = 220+h;
				wall_tops.push(wall_top);
				wall_bottoms.push(wall_bottom);

	            scene.addChild(wall_tops[i]);
	            scene.addChild(wall_bottoms[i]);
			}
            */
            var ay = 1;
            var vy = 0;
            var flag = true;
            
            var label = new Label("SCORE");
                label.font = "90px Mamelon";
                label.x=340;
                label.y=320;
                label.color ="#ff8000";
            
            var scoreLabel = new Label("000");
                scoreLabel.font = "275px Mamelon";
                scoreLabel.color ="#ff8000";
            
            scene.addEventListener(Event.ENTER_FRAME, function() {
                if(flag){
                vy+=ay;
                horiko.y+=vy;
                for(var i=0;i<2;i++){
                    pillars[i].x-=SCROLL_SPEED;
                    if(pillars[i].x<=-500){
                        pillars[i].x = pillars[1-i].x+SCROLL_DIST;
                        pillars[i].y = Math.random()*600-300;
                        score++;
                    }
    		    	if(horiko.firstChild.intersect(pillars[i].firstChild)
                    ||horiko.firstChild.intersect(pillars[i].lastChild)
                    ){
                        gameover();

			    	}	
                }
				if(horiko.y<-450||horiko.y>1050){
                    gameover();

				}
                }else{

                }
            });
            function gameover(){
                flag = false;

                var waku = new Sprite(150, 130);            // スプライトを作る
			    waku.image = game_.assets['./img/素材/ui/waku.png']; // 画像を設定
			    waku.x = 375;                                 // 横位置調整
			    waku.y = 450;                                 // 縦位置調整
                waku.scale(4.5,4.5);
			    scene.addChild(waku); 

                scoreLabel.text = ""+score;
                scoreLabel.x = (game_.width - scoreLabel._boundWidth)/2;
                scoreLabel.y=420;
                scene.addChild(label);  
                scene.addChild(scoreLabel);  

                var tap = new Sprite(297, 137);            // スプライトを作る
			    tap.image = game_.assets['./img/素材/ui/tap2.png']; // 画像を設定
			    tap.x = 300;                                 // 横位置調整
			    tap.y = 1000;                                 // 縦位置調整
                tap.scale(1.3,1.3);
			    scene.addChild(tap); 

                var retry = new Sprite(190, 190);            // スプライトを作る
			    retry.image = game_.assets['./img/素材/ui/retry.png']; // 画像を設定
			    retry.x = 355;                                 // 横位置調整
			    retry.y = 1200;                                 // 縦位置調整
                retry.scale(1,1);
			    scene.addChild(retry); 

                retry.addEventListener(Event.TOUCH_START, function(e) {
                game_.replaceScene(TitleScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            }

            /*

            // シーンに「毎フレーム実行イベント」を追加します。
            scene.addEventListener(Event.ENTER_FRAME, function() {
            	score+=1;
            	scoreLabel.text = score.toString();
                vy+=ay;
                horiko.y+=vy;

                bg1.x -= SCROLL_SPEED;                // 背景1をスクロール
			    bg2.x -= SCROLL_SPEED;
			    for(var i=0;i<2;i++ ){
			    	wall_tops[i].x -= SCROLL_SPEED;
			    	wall_bottoms[i].x -= SCROLL_SPEED;
			    }               // 背景2をスクロール
			    if (bg1.x <= -320) {                  // 背景1が画面外に出たら
			        bg1.x = 320;                      // 画面右端に移動
			    }
			    if (bg2.x <= -320) {                  // 背景2が画面外に出たら
			        bg2.x = 320;                      // 画面右端に移動
			    }

			    for(var i=0;i<2;i++){
			 	   if (wall_tops[i].x <= -wall_tops[i].width) {                  // 背景2が画面外に出たら
			    	    wall_tops[i].x = 400;   
						wall_bottoms[i].x = 400;    
						var h=Math.random()*rand_h*2-rand_h;
						wall_tops[i].y = -220+h;
						wall_bottoms[i].y = 220+h;
			    	}

			    	if(horiko.intersect(wall_tops[i])||horiko.intersect(wall_bottoms[i])){
						game_.pushScene(ResultScene());

			    	}	
				}
				if(horiko.y<0||horiko.y>320-32){
					game_.pushScene(ResultScene());

				}



            });
*/
            // シーンに「タッチイベント」を追加します。
            scene.addEventListener(Event.TOUCH_START, function(e) {
                vy=-15;
    /*
                if (e.x > horiko.x) { // if (もしも) タッチした横位置がクマの横位置よりも右側(大きい)かったら
                    speed = 1; // クマのスピードを1にする
                } else { // それ以外のときは
                    speed = -1; // クマのスピードを-1にする
                }
                */
            });
            return scene;
        };

                //タイトルシーン   
        var ResultScene = function(){
            var scene = new Scene();                                // 新しいシーンを作る
            scene.backgroundColor = '#ffffff';    

            var scoreLabel = new Label("リザルト");
            scene.addChild(scoreLabel);    
            scene.addEventListener(Event.TOUCH_START, function(e) {
                game_.replaceScene(TitleScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            // タイトルシーンを返します。
            return scene;
        };


        game_.replaceScene(TitleScene());

    }
    game_.start(); // ゲームをスタートさせます



};
