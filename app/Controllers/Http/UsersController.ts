import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

  public async login ({ request, auth, response }: HttpContextContract) {
    await auth.use('web').attempt(request.input('email'), request.input('password'))
    return response.ok('Successfuly logged in !')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.ok('Successfuly logged out !')
  }

}
