import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const USER_DOCUMENT_NAME = 'Offer';
export const USER_COLLECTION_NAME = 'offers';

export default interface IOffer extends Document {
  name: string;
  categoryId:Schema.Types.ObjectId;
  photo: string;
  status:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IOffer>(
  {
    name: {
      type: Schema.Types.String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'OfferCategory',
    },
    status:{
      type:Schema.Types.Boolean,
      default:true
    },
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const Offer = model<IOffer, Pagination<IOffer>>(
  USER_DOCUMENT_NAME,
  schema,
  USER_COLLECTION_NAME,
);
