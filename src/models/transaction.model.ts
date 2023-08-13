import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
} from '@typegoose/typegoose';
import {TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({schemaOptions: {collection: 'transactions'}})
export class Transaction extends TimeStamps {
  @prop()
  public _id!: string;

  @prop()
  public from!: string;

  @prop()
  public to!: string;

  @prop()
  public amount!: string;
}

export default getModelForClass(Transaction, {
  existingMongoose: mongoose,
  schemaOptions: {collection: 'transactions'},
});
