const container = document.querySelector('.container')
const search = document.querySelector('.search button')
const weatherdetails = document.querySelector('.weatherdetails')
const  weather= document.querySelector('.weather')
const error404 = document.querySelector('.notFound')



search.addEventListener('click', ()=> {
    const APIkey = '357a476beb3cf99a77968d6f116c0885'
    const city = document.querySelector(".search input").value
    if (city === "")
        return
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).
        then(response => response.json()).
        then(json => {
            if (json.cod === '404'){
                container.style.height = '400px'
                weather.style.display = 'none'
                weatherdetails.style.display = 'none'
                error404.style.display = 'block'
                error404.classList.add('fadeIn')
                return 
            } 
            error404.style.display = 'none'
            error404.classList.remove('fadeIn')

            const image = document.querySelector('.weather img')
            const temperature = document.querySelector('.weather .temperature')
            const desc = document.querySelector('.weather .description')
            const humidity = document.querySelector('.weatherdetails .humidity span')
            const wind = document.querySelector('.weatherdetails .wind span')
            switch (json.weather[0].main){
                case 'Clear':
                    image.src= 'images/clear.png'
                    break

                case 'Rain':
                        image.src= 'images/rain.png'
                        break
                case 'Clouds':
                    image.src= 'images/cloud.png'
                    break
                case 'Snow':
                    image.src= 'images/snow.png'
                    break
                case 'Haze':
                    image.src= 'images/mist.png'
                    break
                default:
                    image.src = ''
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            desc.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML = `${json.main.humidity}%`
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

            weather.style.display = ""
            weatherdetails.style.display = ""
            weather.classList.add('fadeIn')
            weatherdetails.classList.add('fadeIn')
            container.style.height = '590px'
        })
})