import React from 'react';
const apiKey = process.env.REACT_APP_WEATHERAPI;

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            info: null,
            error: null,
            advice: null,
        }
    }

    async componentDidMount() {
        if(this.props && this.props.location) {
            this.getWeather(this.props.location)
        }
    }

    adviceClothes = (temp) => {
        if (temp < 0) return "На улице холодно, одевайтесь теплее"
        if (temp < 10) return "На улице прохладно"
        if (temp < 20) return "На улице нежарко, нужна кофта или легкая куртка"
        if (temp < 30) return "На улице жарко, наденьте что-нибудь легкое, избегайте темных цветов"
        if (temp < 40) return "На улице очень жарко, избегайте длительного нахождения под открытым солнцем"
    }

    getWeather = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json()
        if (data.cod === 200) {
            this.setState({
                city,
                info: {
                    temp: data.main.temp,
                    feels_like: data.main.feels_like,
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
                    icon: data.weather[0].icon,
                    advice: this.adviceClothes(data.main.temp) 
                },
                error: null,
            })
        } else {
            this.setState({
                info: null,
                error: "Город не найден"
            })
        }
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps && nextProps.location !== this.state.city) {
            this.getWeather(nextProps.location);
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div>
                {this.state.info && 
                <div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Температура: {this.state.info.temp} °C</li>
                        <li class="list-group-item">Ощущается как {this.state.info.feels_like} °C</li>
                        <li class="list-group-item">Атмосферное давление: {this.state.info.pressure}</li>
                        <li class="list-group-item">Ветер: {this.state.info.wind} м/с</li>
                        <li class="list-group-item">{this.state.info.advice}</li>
                    </ul>
                    <img alt="weatherPhoto" src={`http://openweathermap.org/img/wn/${this.state.info.icon}@2x.png`}
                    class="content_img" />
                </div>}
                {this.state.error && this.state.error}
                
            </div>
        )
    }
}

export default Result;