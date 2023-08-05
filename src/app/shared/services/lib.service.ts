import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibService {

  private axiosInstance = axios.create({
    baseURL: `${environment.apiUrl}/libs`
  });

  constructor () {
    this.axiosInstance.interceptors.request.use(config => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(response => {
      return response;
    }, error => {
      return Promise.reject(error);
    })
  }

  async getCompanies() {
    const url = `/companies`;
    return this.axiosInstance.get(url);
  }

  async getDistrict(province_code: any) {
    const url = `/districts?province_code=${province_code}`;
    return this.axiosInstance.get(url);
  }

  async getSubDistrict(district_code: any) {
    const url = `/sub-districts?district_code=${district_code}`;
    return this.axiosInstance.get(url);
  }

}
