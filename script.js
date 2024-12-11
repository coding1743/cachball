const basket=document.querySelector('.basket')
const fallingItem=document.querySelector('.falling-item')
const scoreDisplay=document.querySelector('.score')
const coinsound=document.getElementById('sound')
let basketPosition=170
let score=0
let missed=0

document.addEventListener('keydown',(event)=>{
    if(event.key==='ArrowLeft'&& basketPosition>0){
        basketPosition -=20
    }else if(event.key==='ArrowRight'&& basketPosition<340){
        
        basketPosition +=20
    }
    basket.style.left=basketPosition+'px'
})

function resetfallingItem(){
    fallingItem.style.top='-50px'
    fallingItem.style.left=Math.random() * 370 + 'px'
}

function collision(){
    const basketrect=basket.getBoundingClientRect()

    const itemrect=fallingItem.getBoundingClientRect()
    
    return !(
        basketrect.top > itemrect.bottom ||
        basketrect.bottom < itemrect.top ||
        basketrect.left > itemrect.right ||
        basketrect.right < itemrect.left
    );
}
function gameloop(){
    let fallingItemtop=parseInt(fallingItem.style.top || '-50')
    fallingItemtop +=6
    fallingItem.style.top = fallingItemtop + 'px';

    if (fallingItemtop>550){
     missed++
     if (missed===3) {
        alert ("Game OvEr:You final score Is   "+score)
        location.reload()
     } 
     resetfallingItem()
    }
    if  (collision()){
       score++   
       coinsound.play()  
       scoreDisplay.textContent='score:'+score
resetfallingItem()

    }
    requestAnimationFrame(gameloop)
}

resetfallingItem();
gameloop();