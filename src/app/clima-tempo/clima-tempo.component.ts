import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clima-tempo',
  templateUrl: './clima-tempo.component.html',
  styleUrls: ['./clima-tempo.component.css']
})
export class ClimaTempoComponent implements OnInit {

  private appId: string;
  private appCode: string;

  public weather: any;

  public  constructor(private http: HttpClient) {
    this.appId = 'gg3O4bl8lYtpCKslO0YB';
    this.appCode = 'UtLIk18ukEsWTILM8eYQlw';
  }

  ngOnInit() {
    // this.getWeather({ latitude: -23.5489, longitude: -46.6388 });
    this.getClima();
  }

  getClima() {
    this.http.get('https://api.hgbrasil.com/weather?woeid=f3b68e0d')
       .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
       .subscribe(result => {
         this.weather = result.forecast;
       }, error => {
         console.error(error);
       });
  }


  // public getWeather(coordinates: any) {
  //   let params = new HttpParams({
  //     fromObject: {
  //       "product": "forecast_7days_simple",
  //       "latitude": coordinates.latitude,
  //       "longitude": coordinates.longitude,
  //       "app_id": this.appId,
  //       "app_code": this.appCode
  //     }
  //   });
  //   this.http.get("https://weather.cit.api.here.com/weather/1.0/report.json", { params: params })
  //     .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
  //     .subscribe(result => {
  //       this.weather = result.forecast;
  //     }, error => {
  //       console.error(error);
  //     });
  // }

}
