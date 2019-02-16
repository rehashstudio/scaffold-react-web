import apisauce, { ApiResponse, ApisauceInstance } from 'apisauce'
import env from '../Config/Env'

interface IGenericSauceCall {
  func(...args: any[]): Promise<ApiResponse<{}>>
}

export interface IApi {
  [key: string]: IGenericSauceCall
}

export default class ApiCreator {
  public api: ApisauceInstance
  constructor() {
    this.api = apisauce.create({
      baseURL: env.API_URL,
      headers: {
        'Cache-Control': 'no-cache',
        'client-id': 'xzy',
      },
      timeout: 15000,
    })
  }

  public login = (username: string, password: string) => {
    const dummyToken = {
      expiresIn: 435346457,
      value: 'asdnbaskbfdghdfhgdfkljg',
    }
    return {
      data: {
        tokens: [dummyToken],
      },
      ok: true,
    }
    return this.api.post(
      'auth',
      {},
      {
        auth: {
          password,
          username,
        },
      },
    )
  }
}
