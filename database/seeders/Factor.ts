import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Factor from 'App/Models/Factor'

export default class extends BaseSeeder {
  public async run () {
    await Factor.createMany([
      {
        description: 'La reputación de la marca',
      },
      {
        description: 'Las opciones de financiamiento',
      },
      {
        description: 'El desempeño al manejarlo',
      },
      {
        description: 'Recomendaciones de amigos o familiares',
      },
      {
        description: 'Otros',
      }
    ])
  }
}
