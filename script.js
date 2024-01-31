let allarr = [
  "aim",
  "badminton",
  "beer",
  "bowling",
  "chick",
  "dice",
  "diya",
  "doll",
  "firecracker",
  "flag",
  "football",
  "frenchfries",
  "joystick",
  "kite",
  "lantern",
  "martialarts",
  "mask",
  "panda",
  "plant",
  "slide",
  "teddy",
  "videogame",
];
// Array ko shuffle karne k liye
function shuffle(arr) {
  let currentindex = allarr.length,
    randomindex;
  while (currentindex > 0) {
    randomindex = Math.floor(Math.random() * currentindex);
    currentindex--;
    [arr[currentindex], arr[randomindex]] = [
      arr[randomindex],
      arr[currentindex],
    ];
  }
  return arr;
}
// function to get the coordinate of its position
function getcoordinate(element) {
  playturn1 = document.querySelector(element);
  let position = playturn1.getBoundingClientRect();
  let x = position.left;
  let y = position.top;
  return [x, y];
}
// Dono card chune hue sahi hai ki nhi
function checkcorrectpair(card, player) {
  if (card[0].querySelector("img").src == card[1].querySelector("img").src) {
    player.score += 1;
    player.pos.innerText = player.score;
    let cards;
    for (cards of card) {
      gayabkarsaleko(cards, player);
      cards.removeAttribute("style");
      let img = cards.querySelector("img");
      cards.removeChild(img);
      cards.disabled = true;
      boxes -= 1;
    }
    return true;
  } else {
    return false;
  }
}
// Koi natija nahi aaya
function noresult(card) {
  let cards;
  console.log('no result')
  for (cards of card) {
    transitionkar(cards, 180, 180);
    let img = cards.querySelector("img");
    cards.removeChild(img);
    cards.disabled = false;
  }
  return;
}
// rotate karene
function transitionkar(element, z, y) {
  element.style.transform = "rotateZ(" + z + "deg) rotateY(" + y + "deg)";
  element.style.transition = "transform 0.8s ease-out";
  return;
}
// card distroy
function gayabkarsaleko(element, player) {
  if (player === player1) {
    element.classList.add("player1kaamkhtm");
    return;
  } else {
    element.classList.add("kaamkhtm");
  }
}
// Winner
function checkkarend() {
  if (boxes === 0) {
    if (player1.score > player2.score) {
      let dusra = document.querySelector(".play2");
      dusra.classList.remove("play2display");
      turn = document.querySelector(".play1");
      turn.classList.add("player1win");
      turn = document.querySelector(".play1 p");
      turn.style.transform = "rotate(0deg)";
      turn.innerText = "You Win!";
    } else {
      let dusra = document.querySelector(".play1");
      dusra.classList.remove("play1display");
      turn = document.querySelector(".play2");
      turn.classList.add("player2win");
      turn = document.querySelector(".play2 p");
      turn.style.transform = "rotate(0deg)";
      turn.innerText = "You Win!";
    }
    return true;
  }
  return false;
}
// random id except gayab
function kiskodaba(ytohgayehai) {
  let id = Math.floor(Math.random() * 22);
  if (id in ytohgayehai) {
    kiskodaba(ytohgayehai);
  }
  return id;
}

function exchangeposition(){
  let pl1=document.querySelector('.play1');
  let pl2=document.querySelector('.play2');
  let scc=document.querySelector('.score');
  let ex=document.querySelector('.exit');
  document.querySelector('.turns:nth-child(1)').prepend(scc);
  document.querySelector('.turns:nth-child(3)').prepend(ex);
  document.querySelector('.game').prepend(pl2)
  document.querySelector('.game').appendChild(pl1)
  }
// Two player kehlene k liye
function friend(allelement) {
  chance = "player1";
  let turn = document.querySelector(".play1");
  let card = [];
  turn.classList.add("play1display");
  allelement.forEach((element) => {
    element.addEventListener("click", () => {
      let img = document.createElement("img");
      img.src = "img//" + desiredelement[element.id] + ".png";
      element.appendChild(img);
      element.disabled = true;
      // Card ko turn karne k liye
      transitionkar(element, 0, 0);
      times += 1;
      card.push(element);
      element.addEventListener("transitionend", () => {
        if (times % 2 == 0 && card.length == 2 && boxes > 0) {
          let correct;
          card[0].disabled = false;
          card[1].disabled = false;
          switch (chance) {
            case "player1":
              correct = checkcorrectpair(card, player1);
              if (correct) {
                result = checkkarend();
                if (result) {
                  break;
                }
                break;
              } else {
                noresult(card);
              }

              turn.classList.remove("play1display");
              chance = "player2";
              turn = document.querySelector(".play2");
              turn.classList.add("play2display");
              break;
            case "player2":
              correct = checkcorrectpair(card, player2);
              if (correct) {
                result = checkkarend();
                if (result) {
                  break;
                }
                break;
              } else {
                noresult(card);
              }
              turn.classList.remove("play2display");
              chance = "player1";
              turn = document.querySelector(".play1");
              turn.classList.add("play1display");
              break;
          }
          card.pop();
          card.pop();
        }
      });
    });
  });
}
const shuffled = shuffle(allarr);
let elemarr = shuffled.slice(0, 11);
elemarr = elemarr.concat(shuffled.slice(0, 11));
let desiredelement = shuffle(elemarr);
console.log("1", elemarr);
for (let i = 0; i < 22; i++) {
  let button = document.createElement("button");
  button.setAttribute("id", i);
  button.setAttribute("class", "buttons");
  document.querySelector(".allbuttons").appendChild(button);
}
var boxes = 22;
var player1, player2;
player1 = {
  pos: document.querySelector("#player1"),
  coordinates: getcoordinate(".play1"),
  score: 0,
};
player2 = {
  pos: document.querySelector("#player2"),
  coordinates: getcoordinate(".play2"),
  score: 0,
};
var times = 0;
var result;
var allelement = document.querySelectorAll(".buttons");
friend(allelement);
// bot(allelement);
let exit = document.querySelector(".exit");
exit.addEventListener("click", () => {
  window.location.href= window.location.origin+'/index.html'
});
function bot(allelement) {
  chance = "player1";
  player1kobula(allelement);
  
}
function player1kobula(){
  console.log("Chance of player1");
  let turn = document.querySelector(".play1");
  let card = [];
  let gayabcard = [];
  turn.classList.add("play1display");
  allelement.forEach((element) => {
    element.addEventListener("click", () => {
      let img = document.createElement("img");
      img.src = "img//" + desiredelement[element.id] + ".png";
      element.appendChild(img);
      element.disabled = true;
      transitionkar(element, 0, 0);
      times += 1;
      card.push(element);
      element.addEventListener("transitionend", () => {
        if (times % 2 == 0 && card.length == 2 && boxes > 0) {
          let correct;
          card[0].disabled = false;
          card[1].disabled = false;
          switch (chance) {
            case "player1":
              correct = checkcorrectpair(card, player1);
              if (correct) {
                gayabcard.push(card[0].id)
                gayabcard.push(card[1].id)
                result = checkkarend();
                if (result) {
                  break;
                }
                break;
              } else {
                noresult(card);
              }
            turn.classList.remove("play1display");
            chance = "player2";
            chalbhaibot(gayabcard,allelement,[],element);
            break;
          }
          console.log(card)
          card.pop();
          card.pop();
        }
      });
    });
  }); 
}
function chalbhaibot(gayabcard,allelement,card,element) {
  console.log("player 2 chance");
    let id1 = kiskodaba(gayabcard);
    allelement[id1].click();
    transitionkar(allelement[id1], 0, 0);
    card.push(allelement[id1]);
    let img = document.createElement("img");
    img.src = "img//" + desiredelement[id1] + ".png";
    allelement[id1].appendChild(img);
    allelement[id1].disabled = true;
    times += 1;
    let id2 = kiskodaba(gayabcard);
    allelement[id2].click();
    transitionkar(allelement[id2], 360, 360);
    card.push(allelement[id2]);
    times += 1;
    console.log(boxes,card,times)

    // allelement[id1].addEventListener("transitionend", () => {
      console.log(boxes,card,times)
      if (times % 2 == 0 && boxes > 0 && card.length == 2) {
        console.log('bot bhai ooo')
        let correct = checkcorrectpair(card, player1);
        if (correct) {
          gayabcard.push(card[0].id);
          gayabcard.push(card[1].id);
        } else {
          noresult(card);
          console.log('bot bhai no')
          chance = "player1";
          // bot(allelement);
        }
      }
    // });
    card.pop();
    card.pop();
}
let windowwidth=window.screen.width
let windowheight=window.screen.height
if(windowheight>windowwidth){
  exchangeposition()
}