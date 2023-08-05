import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor (private http: HttpClient) { }

  getGeoJSON() {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/map_r7.json')
        // this.http.get('https://echarts.apache.org/examples/data/asset/geo/USA.json')
        .subscribe((data: any) => {
          resolve(data);
        });
    })
  }


}
