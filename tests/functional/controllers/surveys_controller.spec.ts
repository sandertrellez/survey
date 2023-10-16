import { test } from '@japa/runner'

import User from 'App/Models/User'

let user: User;
let surveyId;
test.group('Controlador de encuestas', (group) => {

  group.setup( async () => {
    user = await User.find(1)
  })

  test('POST /survey - Crear encuesta', async ({ client }) => {
    const response = await client.post('/survey')
    .json(
      {
        "clientId": 1,
        "customerIdentification" : "12345",
        "carModel" : "2024",
        "factorsTakenIntoAccountWhenPurchasing" : 1,
        "testDriveRating" : 1,
        "satisfactionRating" :1
      }
    ).loginAs(user)

    surveyId = response.response.body.data.id;

    response.assertStatus(201)//Se valida status correcto

    response.assertBodyContains({
      "data":
        {
          "client_id":1,
          "customer_identification":"12345",
          "car_model":"2024",
          "factors_taken_into_account_when_purchasing":1,
          "test_drive_rating":1,
          "satisfaction_rating":1,
        }
      }
    )//Se valida json devuelto correcto
  })


  test('GET /survey - Consultar todas las encuestas correctamente con token', async ({ client }) => {
    
    const response = await client.get('/survey').loginAs(user)
    response.assertStatus(200)
    
  })
  
  test('GET /survey - Validación de permisos incorrectos', async ({ client }) => {
    const response = await client.get('/survey')
    response.assertStatus(401)
  })

  
  
  
  test('GET /survey - Consultar una encuesta', async ({ client }) => {   

    const response = await client.get(`/survey/${surveyId}`).loginAs(user)

    response.assertStatus(200)//Se valida status correcto
    response.assertBodyContains({
      "data":
        {
          "client_id":1,
          "customer_identification":"12345",
          "car_model":"2024",
          "factors_taken_into_account_when_purchasing":1,
          "test_drive_rating":1,
          "satisfaction_rating":1,
        }
      }
    )//Se valida json devuelto correcto
  })


  test('PUT /survey - Editar encuesta', async ({ client }) => {
    

    const response = await client.put(`/survey/${surveyId}`)
    .json(
      {
        "clientId": 1,
        "customerIdentification" : "12345678",
        "carModel" : "2000",
        "factorsTakenIntoAccountWhenPurchasing" : 1,
        "testDriveRating" : 2,
        "satisfactionRating" :3
      }
    ).loginAs(user)

    response.assertStatus(200)//Se valida status correcto
    response.assertBody({
      "data":"La encuesta se editó correctamente"
    })//Se valida json devuelto correcto 
  })

  test('DELETE /survey - Elimminar encuesta',async ({ client }) => {
    
    const response = await client.delete(`/survey/${surveyId}`)
    .loginAs(user)

    response.assertStatus(200)
    response.assertBody({
      "data": "La encuesta se eliminó correctamente"
    })
  })


})


