import {
  BaseModel, column,
} from '@ioc:Adonis/Lucid/Orm'
import {DateTime} from "luxon";

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string;

  @column()
  public target: string;

  @column({columnName: 'visit_count'})
  public visitCount: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
