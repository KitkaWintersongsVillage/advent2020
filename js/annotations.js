
const myContainer = document.querySelector('#container');
const divs = Array.from({ length: 31 });
const baseURL = 'http://www.kitka.org/wintersongsdaily/dec'
// const starImages = [
//     // 'img/stars/star.png',
//     'img/stars/use-star.png',
//     // 'img/stars/bronze-star.png',
//     // 'img/stars/rose-star.png',
//     // 'img/stars/copper-star.png',
//     // 'img/stars/pink-star.png',
// ]


const storage = window.localStorage;

const stars = JSON.parse(storage.getItem('starsInStorageArray') || "[]");
// const stars = [];
console.log(stars);


function createBorder(boxId, x, y, w, h, pulsing, gone){
    const anchor = document.createElement('a');
    anchor.className= 'divLink';
    anchor.href = `${baseURL}${boxId}`;
    const div = document.createElement('div');
    // div.appendChild(anchor);
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.width = `${w}px`;
    div.style.height = `${h}px`;
    div.className = 'box';
    div.id = `box${boxId}`;
    if(gone){
        div.className += '';
    }
    if(pulsing){
        div.className += ' pulsing';
        // div.style.animation = 'pulse 2s infinite';
        div.style.animation = 'pulse 2s infinite';
        div.addEventListener('click', (e)=>{
            // console.log(id);
            // console.log(starOffsets[id-1]);
            const {id, x, y} = starOffsets[boxId - 1];
            const rotVal = Math.random() * 180;
            const found = stars.find(el => el.id === boxId);
            if(!found){
                const newStar = {id, x, y, rotVal};
                stars.push(newStar);
                storage.setItem('starsInStorageArray', JSON.stringify(stars));
                createNewStar(newStar);
                // divs[boxId - 1].className = 'box';
                // divs[star.id-1].className = 'box';
               
            } 
            
            setTimeout(() => changePage(boxId), 500);
            // e.target.className = '';
            // e.target.className = 'box';
        })
    }
    myContainer.appendChild(div);
    return div
}

function displayStar(id, x, y, rotVal, growing){
    const star = document.createElement('div');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.transform = `rotate(${rotVal}deg)`;
    if(growing){
        star.style.animation = 'grow 0.5s';  
    } else {
        star.style.animation = 'none';
    }
    
    star.className = 'star';
    star.id = `star${id}`;
    const img = document.createElement('img');
    const starImg = starImages[Math.floor(Math.random() * starImages.length)];
    // const starImg = starImages[0];
    // const starImg = 'img/stars/pink-star.png';
    img.src = 'img/stars/use-star.png';
    img.src = starImg;
    star.appendChild(img);
    myContainer.appendChild(star);
}

function loadStars(stars){
    stars.forEach((star, i) => {
        displayStar(star.id, star.x, star.y, star.rotVal, false);
        // divs[star.id].className = '';
        // console.log(divs);
        divs[star.id - 1 ].className = 'hide';
    })
}

function createNewStar(star){
    displayStar(star.id, star.x, star.y, star.rotVal, true);
    divs[star.id - 1 ].className = 'hide';
}

divs.forEach((div, i) => {
    const { id, x, y, w, h, pulsing, gone} = boxes[i]; 
    divs[i] = createBorder(id, x, y, w, h, pulsing, gone);
    console.log(divs);
})

loadStars(stars);

function changePage(i){
    document.location.href = `${baseURL}${i}`;
    // loadStars(stars);
}
