import { Injectable } from '@angular/core'
import axios from 'axios'
import { environment } from '../../../../environments/environment'
import { ICreateUser, IUpdateUser } from '../../../core/model/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private axiosInstance = axios.create({
    baseURL: `${environment.apiUrl}/users`
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

  async getList(query: any, limit: any, offset: any) {
    const url = `?query=${query}&limit=${limit}&offset=${offset}`
    return await this.axiosInstance.get(url)
  }

  async info(id: any) {
    const url = `${id}/info`
    return await this.axiosInstance.get(url)
  }

  async save(user: ICreateUser) {
    return await this.axiosInstance.post('/', user)
  }

  async update(id: any, user: IUpdateUser) {
    return await this.axiosInstance.put(`${id}/update`, user)
  }

  async delete(id: any) {
    return await this.axiosInstance.delete(`${id}/delete`)
  }

  async toggleStatus(id: any, enabled: string) {
    return await this.axiosInstance.put(`${id}/toggle-status`, { enabled })
  }

  async changePassword(id: any, password: any) {
    return await this.axiosInstance.put(`${id}/change-password`, {
      password
    })
  }

}
