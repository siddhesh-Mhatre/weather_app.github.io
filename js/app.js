// creates variable
let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");




// by user search input

searchButton.addEventListener('click', (e)=>
{

e.preventDefault();
getWeather(searchInput.value);
searchInput.value='';


});



const getWeather=async (city)=>
{
    try{    // in tha try block we try to get the cordinates using location name 

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dab3af44de7d24ae7ff86549334e45bd`,{mode: 'cors'}); //fetch data from API

        const weatherData= await response.json();  // store  data in weatherData 
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);
                         if (id < 300 && id > 200) {
                            tempicon.src = "./img/thunder.svg";
                        } else if (id < 400 && id > 300) {
                            tempicon.src = "./img/cloud-computing.svg";
                        } else if (id < 600 && id > 500) {
                            tempicon.src = "./img/rain.svg";
                        } else if (id < 700 && id > 600) {
                            tempicon.src = "./img/snowing.svg";
                        } else if (id < 800 && id > 700) {
                            tempicon.src = "./img/cloudy.svg";
                        } else if (id == 800) {
                            tempicon.src = "./img/sun.svg";
                        }



   
    }
catch(error)  // if co-ordinates are wrong 
{
    alert('city not found');
}





};





window.addEventListener("load", () => { //get permission from the user for allow the get location

    let long;
    let lat;


    if (navigator.geolocation) {  //if allow

        navigator.geolocation.getCurrentPosition((position) => {

                long = position.coords.longitude;
                lat = position.coords.latitude;
                const proxy = "https://cors-anywhere.herokuapp.com/";

                const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=824b6868e8ccd4602f83331e29df60b5`
                fetch(api).then((response) => { //fetch the data from the api
                        return response.json();  //return the data in the json

                    })
                    .then(data => {   //accsessing the data
                        const { name } = data;
                        const { feels_like } = data.main;
                        const { id, main } = data.weather[0];

                        loc.textContent = name;
                        climate.textContent = main;
                        tempvalue.textContent = Math.round(feels_like - 273);

                        //change weather icon using id 
                        if (id < 300 && id > 200) {
                            tempicon.src = "./img/thunder.svg";
                        } else if (id < 400 && id > 300) {
                            tempicon.src = "./img/cloud-computing.svg";
                        } else if (id < 600 && id > 500) {
                            tempicon.src = "./img/rain.svg";
                        } else if (id < 700 && id > 600) {
                            tempicon.src = "./img/snowing.svg";
                        } else if (id < 800 && id > 700) {
                            tempicon.src = "./img/cloudy.svg";
                        } else if (id == 800) {
                            tempicon.src = "./img/sun.svg";
                        }


                        // console.log(data);
                    })

            }

        )
    }


})