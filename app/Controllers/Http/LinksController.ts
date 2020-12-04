import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from "App/Validators/StoreValidator";
import Link from "App/Models/Link";
import Redis from "@ioc:Adonis/Addons/Redis";
import UpdateValidator from "App/Validators/UpdateValidator";

export default class LinksController {

  public async getLink ({request, params, response}: HttpContextContract) {
    const code = params.id
    const link = await Link.findByOrFail('code', code)

    if (link.code === code) {
      const ip = request.ip()
      let visitCount = link.visitCount

      const getIpFromRedis = await Redis.get(`artclick/ip/${ip}/${link.code}`)

      if (!getIpFromRedis) {
        await Redis.set(`artclick/ip/${ip}/${link.code}`, Date.now(), 'ex', 3600)
        await link.merge({
          visitCount: visitCount++
        }).save()
      }
      return response.redirect(link.target)
    }
    return response.badRequest(`Code does not exist ! (/${code})`)
  }

  public async getAllLinks ({response}: HttpContextContract) {
    const links = await Link.all()
    return response.ok(links);
  }

  public async getVisitCount ({params}: HttpContextContract) {
    const code = params.id
    const link = await Link.findByOrFail('code', code)

    //Check if code exists
    if (link.code === code) {
      return {
        count: link.visitCount
      }
    }
    return {
      message: `Code does not exist ! (${code}`
    }
  }

  public async createLink ({request}: HttpContextContract) {
    const link = await Link.create(await request.validate(StoreValidator))
    return {
      message: `Link successfully created : ${link.code} + ${link.target}`
    }
  }

  public async updateLink ({request}: HttpContextContract) {
    const link = await Link.findByOrFail('code', request.input('link'))
    const data = await request.validate(UpdateValidator)
    await link.merge(data).save()
    return link
  }

  public async deleteLink ({request}: HttpContextContract) {
    const code = request.input('code')
    const link = await Link.findByOrFail('code', code)
    await link.delete()
  }

}
