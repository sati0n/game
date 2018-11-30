enchant(); // おまじない

window.onload = function() {

    // 行の終わりには、;(セミコロン)をつけます。

    var game_ = new Game(320, 320); // ゲーム本体を準備すると同時に、表示される領域の大きさを設定しています。
    game_.fps = 24; // frames(フレーム) per(毎) second(秒): ゲームの進行スピードを設定しています。
    game_.preload('./img/hiyoko.png'); // pre(前)-load(読み込み): ゲームに使う素材を予め読み込んでおきます。
	game_.preload('./img/sky1.png'); 
	game_.preload('./img/sky2.png'); 
	game_.preload('./img/wall.png'); 

    game_.onload = function() { // ゲームの準備が整ったらメインの処理を実行します。

        //タイトルシーン   
        var TitleScene = function(){
            var scene = new Scene();                                            // 新しいシーンを作る
            scene.backgroundColor = '#fcc800';

            var scoreLabel = new Label("タイトル画面");
            scene.addChild(scoreLabel);    
            scene.addEventListener(Event.TOUCH_START, function(e) {
                game_.replaceScene(GameScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            // タイトルシーンを返します。
            return scene;
        };

        //ゲームシーン
        var GameScene = function(){
            var scene = new Scene();
            

            var SCROLL_SPEED = 5;


            //背景
            var bg1 = new Sprite(320, 320);            // スプライトを作る
			bg1.image = game_.assets['./img/sky1.png']; // 画像を設定
			bg1.x = 0;                                 // 横位置調整
			bg1.y = 0;                                 // 縦位置調整
			scene.addChild(bg1);   
			
			var bg2 = new Sprite(320, 320);            // スプライトを作る
		    bg2.image = game_.assets['./img/sky2.png']; // 画像を設定
		    bg2.x = 320;                               // 横位置調整 
		    bg2.y = 0;                                 // 縦位置調整
		    scene.addChild(bg2); 


            var hiyoko = new Sprite(32, 32);  
            hiyoko.image = game_.assets['./img/hiyoko.png']; 

            hiyoko.x = 100; 
            hiyoko.y = 120; 

            //hiyoko.scale(0.1,0.1);
            scene.addChild(hiyoko); 
            //scene.backgroundColor  = '#7ecef4'; 

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
            var ay = 0.6;
            var vy = 0;


		    var score = 0;
            var scoreLabel = new Label("");
            scene.addChild(scoreLabel);
  


            // シーンに「毎フレーム実行イベント」を追加します。
            scene.addEventListener(Event.ENTER_FRAME, function() {
            	score+=1;
            	scoreLabel.text = score.toString();
                vy+=ay;
                hiyoko.y+=vy;

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

			    	if(hiyoko.intersect(wall_tops[i])||hiyoko.intersect(wall_bottoms[i])){
						game_.pushScene(ResultScene());

			    	}	
				}
				if(hiyoko.y<0||hiyoko.y>320-32){
					game_.pushScene(ResultScene());

				}



            });

            // シーンに「タッチイベント」を追加します。
            scene.addEventListener(Event.TOUCH_START, function(e) {
                vy=-8;
    /*
                if (e.x > hiyoko.x) { // if (もしも) タッチした横位置がクマの横位置よりも右側(大きい)かったら
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
