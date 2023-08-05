import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private axiosInstance = axios.create({
    baseURL: `${environment.apiUrl}/settings`
  })

  constructor () {
    this.axiosInstance.interceptors.request.use(config => {
      const token = sessionStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    });

    this.axiosInstance.interceptors.response.use(response => {
      return response
    }, error => {
      return Promise.reject(error)
    })
  }

  async getSettingInfo() {
    return await this.axiosInstance.get(`/info`)
  }

  async saveInfo(lineNotifyToken: any, lineSecretToken: any) {
    return await this.axiosInstance.post(`/save`, {
      lineNotifyToken, lineSecretToken
    })
  }

}
