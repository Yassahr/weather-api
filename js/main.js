// News API https://newsapi.org/    https://newsapi.org/v2/everything?q=tesla&from=2023-10-13&sortBy=publishedAt&apiKey=API_KEY      api key = 94d8926122ad411ca0eb2a3d9cc885d6

//Open weather https://openweathermap.org/api/one-call-3 https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}  apit key = 9b079665ec2ba64c3d32e36e63f8094b
//geocoding api http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//geocoding api through zip http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
//ApiNinja Zip code Api  https://api.api-ninjas.com/v1/zipcode?city=${}&state=${}&X-Api-Key=${}  apiKey = Lh6J8lT5GvTcIpE0cv9YFA==sFMdMVZhPlWAfxZh




// document.querySelector('button').addEventListener('click', idkYet)



//  //Obj for open weather Api
// function idkYet(){ //establishing variables
//     //variables for Zip Code api
//     let city = document.querySelector('input').value
//        city= city[0].toUpperCase() + city.slice(1).toLowerCase() //unsure how I could combine with variable declaration
//     let state = document.querySelector('select').value 
//     const apiKey = "Lh6J8lT5GvTcIpE0cv9YFA==sFMdMVZhPlWAfxZh"
//     const zipCodeUrl = `https://api.api-ninjas.com/v1/zipcode?city=${city}&state=${state}&X-Api-Key=${apiKey}`

   
//     //Zip Code api call
//     fetch(zipCodeUrl)
//     .then(data => data.json())
//     .then(data =>{
//         //Variables for open weather Api
//         long = data[0].lon
//         lat = data[0].lat
        

//     //Open Weather API
//         const apiKeyOW ='9b079665ec2ba64c3d32e36e63f8094b'

//         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKeyOW}&units=imperial&lang=en`) //&exclude=${part} query for type of information
//         .then(data => data.json())
//         .then(data =>{
//             console.log(data)
//             //Variables for open weather Api
//             document.querySelector('#city').innerText =` Weather in ${city}, ${state}`
//             let temp = Math.floor(data.main.temp)+'°F'
//                 document.querySelector('#temp').innerText =`${temp}`
//             //if i make the ID = the name is the object I can us a for of loop to cycle through and add the %/F in the temporate literal
//             let feels = Math.floor(data.main.feels_like) +'°F'
//                 document.querySelector('#feels').innerText =`Feels like ${feels}`
//             let high = Math.floor(data.main.temp_max) +'°F'
//                 document.querySelector('#high').innerText =`High:${high}`
//             let low = Math.floor(data.main.temp_min) +'°F'
//                  document.querySelector('#low').innerText =`Low:${low}`
//             let humid =  Math.floor(data.main.humidity) +'%'
//                 document.querySelector('#humid').innerText =`Humidity:${humid}`
//             //let wind = 
//             let description = data.weather[0].description
//                      document.querySelector('#description').innerText=description
//             let rise =  getTime(data.sys.sunrise)+`am`
//                  document.querySelector('#rise').innerText =`Sunrise: ${rise}`
//             let sSet = getTime(data.sys.sunset)+`pm`
//                 document.querySelector('#sSet').innerText =`Sunset: ${sSet}`
//             let weatherIcon = data.weather[0].icon
//             console.log(weatherIcon)
//                  document.querySelector('#weather-icon').src =`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
                 
//         })

//     })
//     //News Api - pivoting to newcatcher api(applied via google forms for a free plan)
//     //  const apiKeyNews ='94d8926122ad411ca0eb2a3d9cc885d6'
//     //  let startDate = new Date().toISOString().slice(0, 10)
//     //  let fromDate = new Date(Date.now()-12096e5).toISOString().slice(0, 10)
     
//     //  fetch(`https://newsapi.org/v2/everything?q=${city}&from=${fromDate}&to=${startDate}&apiKey=${apiKeyNews}`) 
//     //  .then(data => data.json())
//     //  .then(data =>{
//     //      console.log(data)
         
//     //  })
//     // })

//     .catch(err =>{
//         console.log(`error ${err}`)
//     })

document.querySelector('button').addEventListener('click', fetchData);

async function fetchData() {
    document.querySelector('#loader').classList.add('loader')
    try {
        let city = document.querySelector('input').value;
        city = city[0].toUpperCase() + city.slice(1).toLowerCase();
        let state = document.querySelector('select').value;
        const apiKey = "Lh6J8lT5GvTcIpE0cv9YFA==sFMdMVZhPlWAfxZh";
        const zipCodeUrl = `https://api.api-ninjas.com/v1/zipcode?city=${city}&state=${state}&X-Api-Key=${apiKey}`;

        const zipCodeData = await fetch(zipCodeUrl);
        const zipCodeJson = await zipCodeData.json();

        const long = zipCodeJson[0].lon;
        const lat = zipCodeJson[0].lat;

        const apiKeyOW ='9b079665ec2ba64c3d32e36e63f8094b';
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKeyOW}&units=imperial&lang=en`);
        const weatherJson = await weatherData.json();

        console.log(weatherJson);

        document.querySelector('#city').innerText = ` Weather in ${city}, ${state}`;
        const temp = Math.floor(weatherJson.main.temp) + '°F';
        document.querySelector('#temp').innerText = `${temp}`;
         // if i make the ID = the name is the object I can us a for of loop to cycle through and add the %/F in the temporate literal
            let feels = Math.floor(weatherJson.main.feels_like) +'°F'
                document.querySelector('#feels').innerText =`Feels like ${feels}`
            let high = Math.floor(weatherJson.main.temp_max) +'°F'
                document.querySelector('#high').innerText =`High:${high}`
            let low = Math.floor(weatherJson.main.temp_min) +'°F'
                 document.querySelector('#low').innerText =`Low:${low}`
            let humid =  Math.floor(weatherJson.main.humidity) +'%'
                document.querySelector('#humid').innerText =`Humidity:${humid}`
            let wind = weatherJson.wind
            let windDir = getWindDirection(wind.deg)
            console.log(windDir, wind.deg)
                document.querySelector('#wind').innerText =`Wind: ${wind.speed} ${windDir}`
            
            let description = weatherJson.weather[0].description
                     document.querySelector('#description').innerText=description
            let rise =  getTime(weatherJson.sys.sunrise)+`am`
                 document.querySelector('#rise').innerText =`Sunrise: ${rise}`
            let sSet = getTime(weatherJson.sys.sunset)+`pm`
                document.querySelector('#sSet').innerText =`Sunset: ${sSet}`
            let weatherIcon = weatherJson.weather[0].icon
            console.log(weatherIcon)
                 document.querySelector('weather-icon').src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`


        // Continue updating other elements...

    } catch (err) {
        console.log(`error ${err}`);
    }finally{
        document.querySelector('#loader').classList.remove('loader')
         document.querySelector('#main').classList.remove('hidden');    
     }
     
    
  
}

   
   
  


// helper function
function getTime(unix){
    let date = new Date(unix * 1000)
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ( "0" + date.getMinutes()).slice(-2);
return hours > 12 ?`${hours-12}:${minutes}` : `${hours}:${minutes}`
}

function getWindDirection(wind){


    if(wind.deg  >= 340){
        return  `N`;
    }else if(wind.deg  >= 330){
        return  `N/NW`;
    }else if( wind.deg  >= 310){
        return  `NW`;
    }else if(wind.deg  >= 290){
        return  `W/NW`;
    }else if(wind.deg  >= 260){
        return  `W`;
 
    }else if(wind.deg >= 240){
        return  `W/SW`;

    }else if( wind.deg  >= 220){
        return  `SW`;
 
    }else if (wind.deg  >= 200){
        return  `S/SW`;
    
    }else if (wind.deg  >= 170){
    return  `S`;
    
    }else if(wind.deg  >= 150){
    return  `S/SE`;

    }else if(wind.deg  >= 130){
    return  `SE`;
   
    }else if(wind.deg  >= 170){
    return  `S`;
   
    }else if( wind.deg  >= 150){
    return  `E/SE`;
    
    }else if( wind.deg  >= 130){
    return  `E`;
    
    }else if(wind.deg  >= 60){
    return  'E/NE';
   
     }else if(wind.deg  >= 40){
    return  `NE`;
  
    }else if(wind.deg  >= 20){
    return  `NE/E`;
    
    }else{
    return  `N`;}
    
   


}





