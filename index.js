window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            if (position) {
                setTimeout(() => {
                    weathermothed.currentweather(long, lat);

                }, 1000, () => {
                    UI.getlocalweather();
                }, 100);
            }
        }, () => {
            console.log('denid');
            alert('access location denied please activate location');
            document.querySelector('#access_nif').style.display = 'inline';
        })


    }
})


//for local temeperature varibales 
function varables(temp, humidity, country_name, description, icon, cuntryname) {
    const name = document.querySelector('.descriptioninfo #name');
    const descrip = document.querySelector('.descriptioninfo #description');
    const hum = document.querySelector('.descriptioninfo #humidity');
    const mainname = document.querySelector('.tempinfo #name');
    const tempriture = document.querySelector('.tempinfo #temp');
    const iconimg = document.querySelector('.tempinfo #icon');


    name.textContent = `  ${country_name}`;
    descrip.textContent += `  ${description}`;
    hum.textContent += `  ${humidity}`;
    mainname.textContent = `  ${cuntryname}`;
    tempriture.textContent += `  ${temp} c`;
    iconimg.innerHTML = `
     <img src="${icon}" class="weather_icon" alt="" srcset=""> 

    `;

}
//local time
function gettime() {
    const hours = document.querySelector('.time #hour');
    const histroy = document.querySelector('.time #history');
    let d = new Date();
    //console.log([, d.getMinutes(), d.getDate(), d.getMonth(), d.getFullYear()]);
    hours.textContent = `  ${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`;
    histroy.textContent = d.toLocaleDateString();
}
setInterval(() => {
    gettime();
}, 1000);

class UI {

    //for local weather info
    static getlocalweather(temp, humidity, country_name, description, id, cuntryname) {
        // console.log([temp, humidity, country_name, description, icon]);
        let src = '';
        if (id < 250) {
            src = './icons/storm.svg';
        } else if (id < 350 && id > 250) {
            src = './icons/drizzle.svg';
        } else if (id < 550 && id > 350) {
            src = './icons/rain.svg';
        } else if (id < 650 && id > 550) {
            src = './icons/snow.svg';
        } else if (id < 800 && id > 650) {
            src = './icons/atmosphere.svg';
        } else if (id === 800) {
            src = './icons/sun.svg';
        } else if (id > 800) {
            src = './icons/clouds.svg';
        }

        varables(temp, humidity, country_name, description, src, cuntryname);
    }


    //for searsh
    static addstemptpui(temp, humidity, name, description, id) {
        const mycontainer = document.querySelector('.timecontainer');
        const wdeve = document.createElement('div');
        let src = '';
        wdeve.className = 'col-lg-4 col-md-6 col-sm-12';

        if (id < 250) {
            src = './icons/storm.svg';
        } else if (id < 350 && id > 250) {
            src = './icons/drizzle.svg';
        } else if (id < 550 && id > 350) {
            src = './icons/rain.svg';
        } else if (id < 650 && id > 550) {
            src = './icons/snow.svg';
        } else if (id < 800 && id > 650) {
            src = './icons/atmosphere.svg';
        } else if (id === 800) {
            src = './icons/sun.svg';
        } else if (id > 800) {
            src = './icons/clouds.svg';
        }

        const new_weather_tab = `
        <div class="card">
            <div class="card-body">
                <h1>${name} </h1>
                <h2>
                    description:&nbsp; ${description}
                </h2>
                <h2>
                    temperature:&nbsp;  ${temp}
                </h2>
                <h2>
                    humidity:&nbsp; ${humidity}
                </h2>
                <h2>
                <img src="${src}" class="weather_icon" alt="">

                </h2>

            </div>
        </div>
        `;
        wdeve.innerHTML = new_weather_tab;
        mycontainer.append(wdeve);
    }




}

var city = document.querySelector('.cityinput')


class weathermothed {

    static currentweather(long, lat) {

        // console.log('current weather script');

        const apiKey = "76e75ebd5072b47ff9930695eb11a2a7";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { name, sys, weather, main } = data;
                let iconid = "";
                weather.forEach(element => {
                    const { description, icon } = element;
                    iconid = element.id;
                    UI.getlocalweather(
                        main.temp, main.humidity, name, description, iconid, sys.country);

                });

            })
    }

    static searshweather(city) {

        const apiKey = "76e75ebd5072b47ff9930695eb11a2a7";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather } = data;
                // console.log(typeof(data));
                // console.log([sys, name, main, weather]);
                let desc;
                let myiconid;
                setTimeout(() => {
                    weather.forEach(element => {
                        console.log(element);
                        const { description, icon } = element;
                        desc = description;
                        myiconid = element.id;
                    })
                    UI.addstemptpui(main.temp, main.humidity, name, desc, myiconid);
                }, 400);
            }).catch(error => {
                alert('please enter vaild cuntry name');
            });

    }

}
document.querySelector('#myform').addEventListener('click', (e) => {
    let Scuntryname = document.querySelector('input').value;
    if (Scuntryname != "") {
        if (e.target.classList.contains('btn')) {
            weathermothed.searshweather(Scuntryname);
        }
    }
})