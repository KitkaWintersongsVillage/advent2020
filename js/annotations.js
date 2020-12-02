
const myContainer = document.querySelector('#container');
const divs = Array.from({ length: 31 });
const baseURL = 'http://www.kitka.org/wintersongsdaily/dec'
const storage = window.localStorage;

const stars = JSON.parse(storage.getItem('starsInStorageArray') || "[]");

function createBorder(boxId, x, y, w, h, pulsing, gone){
    const anchor = document.createElement('a');
    anchor.className= 'divLink';
    anchor.href = `${baseURL}${boxId}`;
    const div = document.createElement('div');
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.width = `${w}px`;
    div.style.height = `${h}px`;
    div.className = 'box';
    div.id = `box${boxId}`;

    if(pulsing){
        div.className += ' pulsing';
        div.style.animation = 'pulse 2s infinite';
    }
    if(gone){
        div.className = 'box no-border';
        div.style.animation = '';
    }

    div.addEventListener('click', (e) => {
        const {id, x, y} = starOffsets[boxId - 1];
        const rotVal = Math.random() * 180;
        const found = stars.find(el => el.id === boxId);
        if(boxes[boxId - 1].active){
            setTimeout(() => changePage(boxId), 500);
        }
        
        if(!found){
            const newStar = {id, x, y, rotVal};
            stars.push(newStar);
            storage.setItem('starsInStorageArray', JSON.stringify(stars));
            createNewStar(newStar);
            boxes[boxId - 1].gone = true;
            boxes[boxId - 1].pulsing = false;
        } 
        boxes[boxId - 1].gone = true;
        boxes[boxId - 1].pulsing = false;
        e.target.className = 'box no-border';
    })
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
    img.src = 'img/stars/use-star.png';
    star.appendChild(img);
    myContainer.appendChild(star);
}

function loadStars(stars){
    stars.forEach((star, i) => {
        displayStar(star.id, star.x, star.y, star.rotVal, false);
        // divs[star.id].className = '';
        // console.log(divs);
        divs[star.id - 1 ].className = 'box no-border';
        divs[star.id - 1 ].style.animation = '';
       
    })
}

function createNewStar(star){
    displayStar(star.id, star.x, star.y, star.rotVal, true);
    divs[star.id - 1 ].className = 'box no-border';
}

divs.forEach((div, i) => {
    const { id, x, y, w, h, pulsing, gone} = boxes[i]; 
    divs[i] = createBorder(id, x, y, w, h, pulsing, gone);
    console.log(divs);
})

loadStars(stars);

function changePage(i){
    document.location.href = `${baseURL}${i}`;
    console.log(i);
}
