import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Factor from './Factor'

export default class Survey extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @column()
  public customerIdentification: string

  @column()
  public carModel: string

  @column()
  public factorsTakenIntoAccountWhenPurchasing: number

  @column()
  public testDriveRating: number

  @column()
  public satisfactionRating: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Factor, {
    foreignKey: 'factorsTakenIntoAccountWhenPurchasing',
  })
  public factor: BelongsTo<typeof Factor>
  
}
