import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules, schema} from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    code: schema.string({}, [
      rules.unique({table: 'links', column: 'code' }),
      rules.maxLength(10)
    ]),
    target: schema.string({}),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'code.unique': 'The code already exist !',
    'code.maxLength': 'The code is too long ! (max 10 caracteres)'
  }
}
