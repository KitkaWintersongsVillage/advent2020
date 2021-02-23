function getImage(currentHour, day){
    console.log(currentHour);
    if(currentHour < 6 || currentHour > 16){
        console.log(currentHour, 'night');
        if(day === 31){
            return nightGreenImage
        } 
        return nightWinterImage; 
    } else {
        console.log(currentHour, 'day');
        if(day === 31){
            return dayGreenImage
        } 
        return dayWinterImage;
    }
}

function setBoxes(currentDay, currentMonth){
   boxes.forEach( box => {
      
        if(!box.gone){
            box.pulsing = true;
             box.active = true;
            }
       
   })
}



const mainImage = document.querySelector('#main-image');
const time = new Date();
const hours = time.getHours();
const day = time.getDate();
const month = time.getMonth();
let currentImage = getImage(hours, day);
mainImage.src = currentImage;

setBoxes(day, month);




