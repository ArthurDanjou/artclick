import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules, schema} from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    code: schema.string.optional({}, [
      rules.unique({table: 'links', column: 'code' }),
      rules.maxLength(10)
    ]),
    target: schema.string.optional({}),
    visit_count: schema.number.optional()
  })


  public cacheKey = this.ctx.routeKey


  public messages = {}
}
