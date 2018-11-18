enchant(); // おまじない

window.onload = function() {

    // 行の終わりには、;(セミコロン)をつけます。

    var game_ = new Game(320, 320); // ゲーム本体を準備すると同時に、表示される領域の大きさを設定しています。
    game_.fps = 24; // frames(フレーム) per(毎) second(秒): ゲームの進行スピードを設定しています。
    game_.preload('./img/hiyoko.png'); // pre(前)-load(読み込み): ゲームに使う素材を予め読み込んでおきます。
	game_.preload('./img/sky1.png'); 
	game_.preload('./img/sky2.png'); 

    game_.onload = function() { // ゲームの準備が整ったらメインの処理を実行します。

        //タイトルシーン   
        var TitleScene = function(){
            var scene = new Scene();                                // 新しいシーンを作る
            scene.backgroundColor = '#fcc800';    
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
		    bg2.x = 320;                               // 横位置調整 320px右に配置(bg1の右隣に隙間なく並べる)
		    bg2.y = 0;                                 // 縦位置調整
		    scene.addChild(bg2); 

		    var score = 0;
            var scoreLabel = new Label("");
            scene.addChild(scoreLabel);

            var hiyoko = new Sprite(320, 320);  
            hiyoko.image = game_.assets['./img/hiyoko.png']; 

            hiyoko.x = 100-144; 
            hiyoko.y = 120-144; 

            hiyoko.scaleX=0.1;
            hiyoko.scaleY=0.1;
            scene.addChild(hiyoko); 
            //scene.backgroundColor  = '#7ecef4'; // ゲームの動作部分の背景色を設定しています(16進数)。

            var ay = 0.4;
            var vy = 0;
  


            // シーンに「毎フレーム実行イベント」を追加します。
            scene.addEventListener(Event.ENTER_FRAME, function() {
            	score+=1;
            	scoreLabel.text = score.toString();
                vy+=ay;
                hiyoko.y+=vy;

                bg1.x -= SCROLL_SPEED;                // 背景1をスクロール
			    bg2.x -= SCROLL_SPEED;                // 背景2をスクロール
			    if (bg1.x <= -320) {                  // 背景1が画面外に出たら
			        bg1.x = 320;                      // 画面右端に移動
			    }
			    if (bg2.x <= -320) {                  // 背景2が画面外に出たら
			        bg2.x = 320;                      // 画面右端に移動
			    }

            });

            // シーンに「タッチイベント」を追加します。
            scene.addEventListener(Event.TOUCH_START, function(e) {
                vy=-5;
                // タッチイベントは、タッチした座標をe.x , e.y として取ることができます。
                // なお、eという変数の名前は自由に変更できます。 例：function(好きな名前) { 〜
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
        game_.replaceScene(TitleScene());

    }
    game_.start(); // ゲームをスタートさせます

    // このようにスラッシュ2つで書き始めた行は「コメント」扱いとなります。
    // プログラム中のメモとして活用しましょう。
    /* また、このようにスラッシュと米印を使うと、
        複数行に渡ってコメントを書くことができます。 */


};
