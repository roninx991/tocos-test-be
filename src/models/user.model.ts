import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
} from '@typegoose/typegoose';
import {TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({schemaOptions: {collection: 'users'}})
export class User extends TimeStamps {
  @prop()
  public _id!: string;

  @prop()
  public username!: string;

  @prop()
  public balance!: string;
}

export default getModelForClass(User, {
  existingMongoose: mongoose,
  schemaOptions: {collection: 'users'},
});
