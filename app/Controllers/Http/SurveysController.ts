import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Survey from 'App/Models/Survey'
import { schema, rules } from "@ioc:Adonis/Core/Validator"


export default class SurveysController {
  public async index({ response }: HttpContextContract) {
    try {
      //const suerveys = await Survey.all()
      const suerveys = await Survey.query()
      .preload('factor', (query) => {
        query.select('description');
      })

      response.ok({data:suerveys})

    } catch (error) {
      console.log(error)
      response.badRequest("Ocurrió un error y no se pudo obtener las encuestas:"+error.messages)
    }
  }

  //public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const surveyData = request.all()
      // Se valida los datos de entrada
      const validationSchema = schema.create({
        customerIdentification: schema.string({}, []),                
        carModel: schema.string({}, []),                
        factorsTakenIntoAccountWhenPurchasing: schema.number([]),
        testDriveRating: schema.number([]),
        satisfactionRating: schema.number([]),              
      })

      const messages = {
          'required': 'El campo {{ field }} es obligatorio',
          'email': 'Introduzca un email válido',
          'unique': 'Ya hay un registro con ese {{field}}',
          'minLength': 'El campo {{ field }} debe tener mínimo {{ options.minLength }} caracteres',
      }

      // Se captura la excepción de validación para personalizar la respuesta de error
      try {
          await request.validate({ schema: validationSchema, messages })
      } catch (error) {
          console.log(error)
          return response.status(400).json({ message: error.messages.errors })
      }

            
      const survey = await Survey.create(surveyData)

      response.created({ data: survey })
    } catch (e) {
      console.log(e)
      response.badRequest('Ocurrió un error y no se pudo guardar la encuesta: ' + e.message)
    }
  }

  public async show({params, response}: HttpContextContract) {
    try {
      const survey = await Survey.findOrFail(params.id);
      response.ok({data:survey});

    } catch (error) {
      response.badRequest("No se pudo obtener la encuesta.");
    }
  }

  //public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    try {

      // Se valida los datos de entrada
      const validationSchema = schema.create({
        customerIdentification: schema.string({}, []),                
        carModel: schema.string({}, []),                
        factorsTakenIntoAccountWhenPurchasing: schema.number([]),
        testDriveRating: schema.number([]),
        satisfactionRating: schema.number([]),              
      })

      const messages = {
          'required': 'El campo {{ field }} es obligatorio',
          'email': 'Introduzca un email válido',
          'unique': 'Ya hay un registro con ese {{field}}',
          'minLength': 'El campo {{ field }} debe tener mínimo {{ options.minLength }} caracteres',
      }

      // Se captura la excepción de validación para personalizar la respuesta de error
      try {
          await request.validate({ schema: validationSchema, messages })
      } catch (error) {
          console.log(error)
          return response.status(400).json({ message: error.messages.errors })
      }

      const survey = await Survey.findOrFail(params.id);
      survey.customerIdentification = request.input('customerIdentification')
      survey.carModel = request.input('carModel')
      survey.factorsTakenIntoAccountWhenPurchasing = request.input('factorsTakenIntoAccountWhenPurchasing')
      survey.testDriveRating = request.input('testDriveRating')
      survey.satisfactionRating = request.input('satisfactionRating')
      survey.save();

      response.ok({"data":'La encuesta se editó correctamente'});

    } catch (error) {
      response.badRequest("No se pudo editar la encuesta.");
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try {
      const survey = await Survey.findOrFail(params.id);
      survey.delete();
      survey.save();
      response.ok({"data":'La encuesta se eliminó correctamente'});

    } catch (error) {
      response.badRequest("No se pudo eliminar la encuesta.");
    }
  }
}
