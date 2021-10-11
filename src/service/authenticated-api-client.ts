import axios, { AxiosResponse } from "axios"

export default class AuthenticatedApiClient {
  private static instance: AuthenticatedApiClient

  private constructor() {
    //EMPTY
  }

  public static getInstance(): AuthenticatedApiClient {
    if (!AuthenticatedApiClient.instance) {
      AuthenticatedApiClient.instance = new AuthenticatedApiClient()
    }

    return AuthenticatedApiClient.instance
  }

  async head(
    url: string,
    token: string,
    options: Record<string, any> = {}
  ): Promise<AxiosResponse> {
    const authorization = this.getCurrentUserAuthorization(token)
    const data = await axios.head(url, {
      headers: {
        Authorization: authorization,
      },
      params: {
        ...(options != null ? options : {}),
      },
    })
    return data
  }

  async get<T>(url: string, token: string, options: Record<string, any> = {}): Promise<T> {
    const authorization = this.getCurrentUserAuthorization(token)
    const data = await axios.get(url, {
      headers: {
        Authorization: authorization,
      },
      params: {
        ...(options != null ? options : {}),
      },
    })
    return data.data as T
  }

  async post<T>(
    url: string,
    token: string,
    body?: Record<string, any>,
    options?: Record<string, any>
  ): Promise<T> {
    const authorization = this.getCurrentUserAuthorization(token)

    return (
      await axios.post(url, body, {
        headers: {
          Authorization: authorization,
        },
        params: {
          ...(options != null ? options : {}),
        },
      })
    ).data as T
  }

  async put<T>(
    url: string,
    token: string,
    body?: Record<string, any>,
    options?: Record<string, any>
  ): Promise<T> {
    const authorization = this.getCurrentUserAuthorization(token)

    return (
      await axios.put(url, body, {
        headers: {
          Authorization: authorization,
        },
        params: {
          ...(options != null ? options : {}),
        },
      })
    ).data as T
  }

  async putFormData<T>(
    url: string,
    token: string,
    body?: FormData,
    options?: Record<string, any>
  ): Promise<T> {
    const authorization = this.getCurrentUserAuthorization(token)

    return (
      await axios.put(url, body, {
        headers: {
          Authorization: authorization,
          "Content-Type": "multipart/form-data",
        },
        params: {
          ...(options != null ? options : {}),
        },
      })
    ).data as T
  }

  async postFormData<T>(
    url: string,
    token: string,
    body?: FormData,
    options?: Record<string, any>
  ): Promise<T> {
    const authorization = this.getCurrentUserAuthorization(token)

    return (
      await axios.post(url, body, {
        headers: {
          Authorization: authorization,
          "Content-Type": "multipart/form-data",
        },
        params: {
          ...(options != null ? options : {}),
        },
      })
    ).data as T
  }

  async patch<T>(
    url: string,
    token: string,
    body?: Record<string, any>,
    options?: Record<string, any>
  ): Promise<T> {
    const authorization = this.getCurrentUserAuthorization(token)

    return (
      await axios.patch(url, body, {
        headers: {
          Authorization: authorization,
        },
        params: {
          ...(options != null ? options : {}),
        },
      })
    ).data as T
  }

  async delete<T>(
    url: string,
    token: string,
    body?: Record<string, any>,
    options?: Record<string, any>
  ): Promise<T> {
    const authorization = this.getCurrentUserAuthorization(token)
    return (
      await axios.delete(url, {
        headers: {
          Authorization: authorization,
        },
        data: body,
        params: {
          ...(options != null ? options : {}),
        },
      })
    ).data as T
  }

  getCurrentUserAuthorization(token: string) {
    return `RL.Backend ${token}`.trim()
  }
}
