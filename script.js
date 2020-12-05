const value1 = document.getElementById('value1');
const value2 = document.getElementById('value2');

const leftFirstValue = document.getElementById('country')
const leftSecondValue = document.getElementById('city')
const leftThirdValue = document.getElementById('temp')

const rigthFirstValue = document.getElementById('country2')
const rigthSecondValue = document.getElementById('city2')
const rigthThirdValue = document.getElementById('temp2')

const resultValue = document.getElementById('result')

resultValue.textContent = 0

let temp1 = null;
let temp2 = null;

let stopClick = true;

function randomCity(){
    let x = Math.floor(Math.random()*countryCapitals.length)
    return countryCapitals[x]
}
function getData(){
    
    leftThirdValue.textContent = "--"
    rigthThirdValue.textContent ="--"
    let city1 = randomCity();
    let city2 = randomCity();
    let firstCity = fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city1.city +"&units=metric&appid=c8ad92304c65c233f74e2bc8f8fc3a53")
    let secondCity = fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city2.city +"&units=metric&appid=c8ad92304c65c233f74e2bc8f8fc3a53")
    
    Promise.all([firstCity,secondCity]).then(results =>{
        Promise.all([results[0].json(), results[1].json()]).then(res =>{
            value1.style.backgroundColor ="rgba(13, 13, 71, 0.4)"
            value2.style.backgroundColor ="rgba(13, 13, 71, 0.4)"
            leftFirstValue.textContent = city1.country
            leftSecondValue.textContent = res[0].name
            temp1 = res[0].main.temp
            rigthFirstValue.textContent = city2.country
            rigthSecondValue.textContent = res[1].name
            temp2 = res[1].main.temp
            stopClick = false;
        })
    })
 
}


value1.addEventListener('click',function(){
    if(stopClick){
        return;
    }

    if(temp1 > temp2){
        value1.style.backgroundColor = "Green"
        resultValue.textContent ++
        if(resultValue.textContent == 5){
            setTimeout(function(){
                alert("you win")
                window.location.reload();
            },500)
        }
    }
    if(temp1 < temp2){
        value1.style.backgroundColor = "red"
        resultValue.textContent --;
        if(resultValue.textContent ==-5){
            setTimeout(function(){
                alert("you lose")
                window.location.reload();
            },500)
        }
    }
    stopClick = true;
    showTemperature();
    setTimeout(getData,2000)
})

value2.addEventListener('click',function(){
    if(stopClick){
        return;
    }
    if(temp2 > temp1){
        value2.style.backgroundColor = "Green"
        resultValue.textContent ++
        if(resultValue.textContent == 5){
            setTimeout(function(){
                alert("you win")
                window.location.reload();
            },500)
        }
    }
    if(temp2 < temp1){
        value2.style.backgroundColor = "red"
        resultValue.textContent --
        if(resultValue.textContent == -5){
            setTimeout(function(){
                alert("you lose")
                window.location.reload();
            },500)
        }
    }

    stopClick = true;
    showTemperature();
    setTimeout(getData,2000)
})


function showTemperature(){
    leftThirdValue.textContent = temp1
    rigthThirdValue.textContent =temp2
}


getData();

