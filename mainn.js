
// ボタンを取得
const next = document.getElementById("next");
const prev = document.getElementById("prev");
// 写真達を動かすためにul取得
const ul = document.querySelector(".slide ul");
// スライドを一つずつ全て取得
const slides = document.querySelectorAll(".slide li")
// 円ボタンの配列
const sirclebuttons =[];
// ページナンバー
let pagenunber = 0;


// functionで処理を関数化　最初と最後のスライドで横ボタン消し処理
function sidebuttonsoff(){
  // 初めのページでも最後のページでもなかったら横ボタンを表示し直す
  prev.classList.remove("off");
  next.classList.remove("off");
  // ページ数が０で初めのページだったら横ボタンを消す
  if(pagenunber === 0){
    prev.classList.add("off");
  }
  // slides.lengthでスライドの数を数字化　ページ数がスライドの全ページ数とが一緒だったら横ボタンを消す
  if(pagenunber === slides.length - 1){
    next.classList.add("off");
  }
}



// slidesをページ数分横に動かす処理
function slidemove(){
  // slidesの横幅を取得
  const slidewidth = ul.getBoundingClientRect().width;
  // 現在地でなく初めの位置からどこに移動するか　スライドページナンバー分動かす
  ul.style.transform =`transLateX(${-1 * slidewidth * pagenunber}px)`;
}

// 円ボタンの作成＆円ボタンがクリックされたら
function setupsircle(){
  // 円ボタンの数の設定
  for(let i = 0; i < slides.length; i++){
    // HTMLでの円ボタン生成
    const button = document.createElement("button");
    // HTMLからclassを呼び出しその中にbuttonを入れ込む
    document.querySelector(".sirclebutton").appendChild(button);
    // sirclebuttonsの中に円ボタンを入れ込む
    sirclebuttons.push(button);
    // 円ボタンがクリックされたら
    button.addEventListener("click",() => {
      // ページ数をクリックされたボタン番号に
      pagenunber = i;
      // 横ボタン消す必要あるかチェック
      sidebuttonsoff();
      // スライドを動かす
      slidemove();
      // 円ボタンの現在地表記
      sirclebuttoncurrent()
    });
  }
}
// 円ボタンの現在地表記
function sirclebuttoncurrent(){
  // 円ボタンそれぞれに対しcurrentを消去
  sirclebuttons.forEach(sirclebutton => {
    sirclebutton.classList.remove("current")
  })
  // ページナンバーの円ボタンに現在地表記
  sirclebuttons[pagenunber].classList.add("current")
}

// 円ボタンの動作
setupsircle();
// 円ボタンの現在地表記
sirclebuttoncurrent();
// 初めの表示の際の横ボタンの消す必要があるかチェック
sidebuttonsoff();


// nextボタンを押したら
next.addEventListener("click", () =>{
  // ページを次の数字へ
  pagenunber++;
  // 横ボタン消す必要あるかチェック
  sidebuttonsoff();
  // スライドを動かす
  slidemove();
  // 円ボタンの現在地表記
  sirclebuttoncurrent()
});
// prevボタンを押したら
prev.addEventListener("click",() =>{
  // ページを一つ前の数字へ
  pagenunber--;
  // 横ボタン消す必要あるかチェック
  sidebuttonsoff();
  // スライドを動かす
  slidemove();
  // 円ボタンの現在地表記
  sirclebuttoncurrent()
});

// 目次を全項目取得
const tabItems = document.querySelectorAll(".innav li a");
// 中身を全種類取得
const contents = document.querySelectorAll(".content")
// 目次それぞれをclickdItemと命名
tabItems.forEach(clickedItem => {
  // clickdItemがクリックされたら
  clickedItem.addEventListener("click",e =>{
    // バグ修正
    e.preventDefault();
    // 目次全てからアクティブを消去
    tabItems.forEach(item => {
      item.classList.remove("active");
    });
    // 中身全てからアクティブを消去
    contents.forEach(content =>{
      content.classList.remove("active");
    });
    // クリックされた目次にアクティブをつける
    clickedItem.classList.add("active");
    // クリックされた目次と繋がっている中身にアクティブをつける
    document.getElementById(clickedItem.dataset.id).classList.add("active");
  });
});