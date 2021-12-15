import axios from "axios";

class WeatherApi {
  
  baseUrl = "https://api.openweathermap.org/data/2.5"

  getTemperature(city) {
    let url = `${ this.baseUrl }/weather`
    return axios.get(url, {
      params: {
        appId: "9cff733aee57cb05b63dd4f731c46bc4",
        q: city,
        units: "metric"
      }
    }).then(r => r.data).then(r => {
      return { temp: r?.main?.temp || 0 };
    }).catch(err => {
      return { err };
    })
  }
}

export default new WeatherApi();