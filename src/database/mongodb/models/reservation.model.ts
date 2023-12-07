import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { Type } from 'typescript';

export const RESERVATION_DOCUMENT_NAME = 'Reservation';
export const RESERVATION_COLLECTION_NAME = 'reservations';

export default interface IReservation extends Document {
  teacherId: Schema.Types.ObjectId;
  studentId:Schema.Types.ObjectId;
  start:Date;
  end:Date;
  calendar:string;
  title:string;
  description:string;
  isCancel:boolean;
  isCommended:boolean;
  commentId:Schema.Types.ObjectId;
  status:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IReservation>(
  {
    title: {
      type: Schema.Types.String,
      default:'disponible'
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    studentId:{
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    start:{
        type:Schema.Types.Date
    },
    end:{
        type:Schema.Types.Date
    },
    description:{
        type:Schema.Types.String
    },
    calendar:{
        type:Schema.Types.String,
        default:'Holiday'
    },
    isCancel:{
      type:Schema.Types.Boolean,
      default:false
    },
    isCommended:{
      type:Schema.Types.Boolean,
      default:false
    },
    commentId:{
      type:Schema.Types.ObjectId
    },
    status:{
      type:Schema.Types.Boolean,
      default:true
    },
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const ReservationModel = model<IReservation, Pagination<IReservation>>(
  RESERVATION_DOCUMENT_NAME,
  schema,
  RESERVATION_COLLECTION_NAME,
);
