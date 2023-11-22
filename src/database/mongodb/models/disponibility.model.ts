import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const DISPONIBILITY_DOCUMENT_NAME = 'Disponibility';
export const DISPONIBILITY_COLLECTION_NAME = 'disponibilities';

export default interface IDisponibility extends Document {
  title: string;
  allDay:boolean;
  description:string;
  end:Date;
  start:Date;
  calendar:string;
  status:boolean;
  userId:Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IDisponibility>(
  {
    title: {
      type: Schema.Types.String,
      default:'disponible'
    },
    allDay:{
      type: Schema.Types.Boolean
    },
    description:{
      type:Schema.Types.String,
      default:''
    },
    end:{
      type:Schema.Types.Date
    },
    start:{
      type:Schema.Types.Date
    },
    calendar:{
      type:Schema.Types.String,
      default:'Personal'
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    status:{
      type:Schema.Types.Boolean,
      default:true
    },
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const Disponibility = model<IDisponibility, Pagination<IDisponibility>>(
  DISPONIBILITY_DOCUMENT_NAME,
  schema,
  DISPONIBILITY_COLLECTION_NAME,
);
