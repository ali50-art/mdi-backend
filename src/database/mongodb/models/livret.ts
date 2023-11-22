import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const LIVRET_DOCUMENT_NAME = 'Livret';
export const LIVRET_COLLECTION_NAME = 'livrets';

export default interface ILivret extends Document {
  categoryName: string;
  details:[string];
  teacherId:Schema.Types.ObjectId,
  studentId:Schema.Types.ObjectId,
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ILivret>(
  {
    categoryName: {
      type: Schema.Types.String,
    },
    details:[
        {
            type:Schema.Types.ObjectId,
            ref:'LivretDetail'
        }
    ],
    teacherId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    studentId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const Livret = model<ILivret, Pagination<ILivret>>(
  LIVRET_DOCUMENT_NAME,
  schema,
  LIVRET_COLLECTION_NAME,
);
