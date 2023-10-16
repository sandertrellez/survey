import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Factor from 'App/Models/Factor'

export default class FactorsController {

    public async index({ response }: HttpContextContract) {
        try {
          const suerveys = await Factor.all()
          response.ok({data:suerveys})
    
        } catch (error) {
          response.badRequest("Ocurrió un error y no se pudo obtener los factores a tener en cuenta al comprar el automóvil.")
        }
      }
}
