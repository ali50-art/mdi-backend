import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const USER_DOCUMENT_NAME = 'OfferCategory';
export const USER_COLLECTION_NAME = 'OfferCategories';

export default interface IOfferCategory extends Document {
  name: string;
  photo: string;
  status:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IOfferCategory>(
  {
    name: {
        type: Schema.Types.String,
    },
    photo: {
        type: Schema.Types.String,
        default: 'default.png',
    },
    status:{
        type:Schema.Types.Boolean,
        default:true
    },
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const OfferCategory = model<IOfferCategory, Pagination<IOfferCategory>>(
  USER_DOCUMENT_NAME,
  schema,
  USER_COLLECTION_NAME,
);
