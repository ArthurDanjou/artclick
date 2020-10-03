import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

  public async login ({ params, auth, response }: HttpContextContract) {
    await auth.use('web').attempt(params.email, params.password)
    return response.ok('Successfuly logged in !')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.ok('Successfuly logged out !')
  }

}
