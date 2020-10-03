import {
  BaseModel, column,
} from '@ioc:Adonis/Lucid/Orm'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string;

  @column()
  public target: string;

  @column()
  public visitCount: number;
}
