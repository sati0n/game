enchant(); // おまじない

window.onload = function() {
    var moveStageToCenter = function(core) {
 var stagePos = {
  top: (window.innerHeight - (core.height * core.scale)) / 2,
  left: (window.innerWidth - (core.width * core.scale)) / 2,
 };
 var stage = document.getElementById('enchant-stage');
 stage.style.position = 'absolute';
 stage.style.top = stagePos.top + 'px';
 stage.style.left = stagePos.left + 'px';
 core._pageX = stagePos.left;
 core._pageY = stagePos.top;
};

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
	game_.preload('./img/horiko.png'); 
	game_.preload('./img/ホコリ動きpng/ホリコ　動き　2.0.png'); 
    game_.preload('./img/ari.png');
    game_.preload('./img/nasi.png');
    game_.preload('./img/BGM.png');
    var score=0;

    moveStageToCenter(game_);
    
    var audioElem;
    
      audioElem = new Audio();
      audioElem.src = "./sound/sample.wav";

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
            
            var back_pillar = new Sprite(900, 1600);            // スプライトを作る
			back_pillar.image = game_.assets['./img/素材/1/オブジェクト1.png']; // 画像を設定
			back_pillar.x = 1000;                                 // 横位置調整
			back_pillar.y = 650;                                    // 縦位置調整
			back_pillar.scale(0.2,0.2);
            scene.addChild(back_pillar); 



            var horiko_img = new Sprite(250, 250);            // スプライトを作る
			horiko_img.image = game_.assets['./img/horiko.png']; // 画像を設定
                                   // 縦位置調整
            //horiko_img.scale(0.25,0.25);

            var col = new Sprite(150, 150);            // スプライトを作る
           // col.backgroundColor='#999999';                               // 縦位置調整                       // 縦位置調整
            col.x = 50;
            col.y = 50;

            var horiko = new Group();
            horiko.addChild(col);
            horiko.addChild(horiko_img)
            horiko.x = 100;                                 // 横位置調整
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
            var fg1 = new Sprite(900, 1600);            // スプライトを作る
			fg1.image = game_.assets['./img/素材/1/前景1.png']; // 画像を設定
			fg1.x = 0;                                 // 横位置調整
			fg1.y = 0;                                 // 縦位置調整
			scene.addChild(fg1);  

            var fg2 = new Sprite(900, 1600);            // スプライトを作る
			fg2.image = game_.assets['./img/素材/1/前景1.png']; // 画像を設定
			fg2.x = 900;                                 // 横位置調整
			fg2.y = 0;                                 // 縦位置調整
			scene.addChild(fg2);  
 
           
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
            
            var maxWait = 4;
            var wait = 0;

            scene.addEventListener(Event.ENTER_FRAME, function() {
                if(flag){
                vy+=ay;
                horiko.y+=vy;
                back_pillar.x-=SCROLL_SPEED/3;
                if(back_pillar.x<-500){
                    back_pillar.x = 1000;
                }
                fg1.x-=SCROLL_SPEED;
                fg2.x-=SCROLL_SPEED;
                if (fg1.x <= -900) {                  // 背景1が画面外に出たら
			        fg1.x = 900;                      // 画面右端に移動
			    }
			    if (fg2.x <= -900) {                  // 背景2が画面外に出たら
			        fg2.x = 900;                      // 画面右端に移動
			    }
                if(horiko.lastChild.frame<6){
                    wait--;
                    if(wait<=0){
                        wait = maxWait;
                        horiko.lastChild.frame++;
                    }
                }


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
				if(horiko.y<-50||horiko.y>1400){
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
                scoreLabel.y=440;
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

            scene.addEventListener(Event.TOUCH_START, function(e) {
                if(flag){
                    vy=-15;
                    horiko.lastChild.frame=0;
                }

            });
            return scene;
        };

        var SoundCheckScene = function(){
            var scene = new Scene();
            var bg1 = new Sprite(900, 1600);            // スプライトを作る
			bg1.image = game_.assets['./img/素材/1/背景1.png']; // 画像を設定
			bg1.x = 0;                                 // 横位置調整
			bg1.y = 0;                                 // 縦位置調整
			scene.addChild(bg1);  

            
            var waku1 = new Sprite(150, 130);            // スプライトを作る
			waku1.image = game_.assets['./img/素材/ui/waku.png']; // 画像を設定
			waku1.x = 200;                                 // 横位置調整
			waku1.y = 800;                                 // 縦位置調整
            waku1.scale(2,2);
			scene.addChild(waku1); 

            var waku2 = new Sprite(150, 130);            // スプライトを作る
			waku2.image = game_.assets['./img/素材/ui/waku.png']; // 画像を設定
			waku2.x = 550;                                 // 横位置調整
			waku2.y = 800;                                 // 縦位置調整
            waku2.scale(2,2);
			scene.addChild(waku2); 

            var bgm = new Sprite(700, 504);            // スプライトを作る
			bgm.image = game_.assets['./img/BGM.png']; // 画像を設定
			bgm.x = 100;                                 // 横位置調整
			bgm.y = 300;                                 // 縦位置調整
			scene.addChild(bgm);


            var ari = new Sprite(768, 504);            // スプライトを作る
			ari.image = game_.assets['./img/ari.png']; // 画像を設定
            ari.scale(0.4,0.4);
			ari.x = -105;                                 // 横位置調整
			ari.y = 620;                                 // 縦位置調整
			scene.addChild(ari);

            var nasi = new Sprite(768, 504);            // スプライトを作る
			nasi.image = game_.assets['./img/nasi.png']; // 画像を設定
            nasi.scale(0.4,0.4);
			nasi.x = 245;                                 // 横位置調整
			nasi.y = 620;                                 // 縦位置調整
			scene.addChild(nasi);  



            ari.addEventListener(Event.TOUCH_START, function(e) {
                audioElem.play();
                game_.replaceScene(TitleScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            nasi.addEventListener(Event.TOUCH_START, function(e) {
                game_.replaceScene(TitleScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            // タイトルシーンを返します。
            return scene;
        };


        game_.replaceScene(SoundCheckScene());

    }
    game_.start(); // ゲームをスタートさせます



};
