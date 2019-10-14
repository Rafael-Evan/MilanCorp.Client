import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimaTempoService {

  constructor(private http: HttpClient) { }

  ListarClimaTempo() {
    return this.http.get('https://api.hgbrasil.com/weather?array_limit=4&fields=only_results,temp,city_name,forecast,max,min,date&key=f3b68e0d');
  }
}
