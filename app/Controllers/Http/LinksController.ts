import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import LinkValidator from "App/Validators/LinkValidator";
import Link from "App/Models/Link";
import Redis from "@ioc:Adonis/Addons/Redis";

export default class LinksController {

  public async getLink ({request, response}: HttpContextContract) {
    const code = request.ctx?.params
    const link = await Link.findBy('code', code)

    //Check if code exists
    if (link) {
      const ip = request.ip()
      let getVisitCountFromRedis = await Number(Redis.get(`artclick/routes/${link.code}/visits`))
      const getIpFromRedis = await Redis.get(`artclick/ip/${ip}/${link.code}`)

      if (!getVisitCountFromRedis) {
        getVisitCountFromRedis = link.visitCount || 0;
      }

      //Check if ip is set in cache to not spam incrementation
      if (!getIpFromRedis) {
        getVisitCountFromRedis++
        await Redis.set(`artclick/ip/${ip}/${link.code}`, Date.now(), 'ex', 3600)
        await Redis.set(`artclick/routes/${link.code}/visits`, getVisitCountFromRedis)
        await link.merge({
          visitCount: getVisitCountFromRedis++
        }).save()
      }

      return response.redirect(link.target)
    }
    return response.badRequest(`Code does not exist ! (${code}`)
  }

  public async getAllLinks({response}: HttpContextContract) {
    const links = await Link.all()
    return response.ok(links);
  }

  public async getVisitCount({request}: HttpContextContract) {
    const code = request.ctx?.params
    const link = await Link.query().where('code', code).firstOrFail()

    //Check if code exists
    if (link) {
      return {
        count: link.visitCount
      }
    }
    return {
      message: `Code does not exist ! (${code}`
    }
  }

  public async createLink({request}: HttpContextContract) {
    const link = await Link.create(await request.validate(LinkValidator))
    return {
      message: `Link successfully created : ${link.code} + ${link.target}`
    }
  }

  public async updateLink ({params, response}: HttpContextContract) {
    //Update link & reset to 0 the visit count
    const link = await Link.query().where('code', params.code).firstOrFail()
    if (link) {
      await Link.query().update({target: params.target, visitCount: 0})
    }
    return response.badRequest(`Cannot updated Link : ${link} ! `)
  }

}
