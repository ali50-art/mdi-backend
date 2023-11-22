import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const LIVRET_DOCUMENT_NAME = 'LivretDetail';
export const LIVRET_COLLECTION_NAME = 'LivretDetails';

export default interface ILivretDetail extends Document {
  content: string;
  status:boolean;
  comments:string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ILivretDetail>(
  {
    content: {
      type: Schema.Types.String,
    },
    status:{
        type:Schema.Types.Boolean
    },
    comments:{
        type:Schema.Types.String
    },
    
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const LivretDetailModel = model<ILivretDetail, Pagination<ILivretDetail>>(
  LIVRET_DOCUMENT_NAME,
  schema,
  LIVRET_COLLECTION_NAME,
);
