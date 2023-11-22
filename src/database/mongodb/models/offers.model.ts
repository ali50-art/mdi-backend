import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const USER_DOCUMENT_NAME = 'Offer';
export const USER_COLLECTION_NAME = 'offers';

export default interface IOffer extends Document {
  name: string;
  price:number;
  category:Schema.Types.String;
  offerDetails:[string];
  nbHoures:number;
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
    price:{
      type: Schema.Types.Number
    },
    offerDetails:[{
      type:Schema.Types.String
    }],
    category: {
      type: Schema.Types.String,
    },
    nbHoures:{
      type:Schema.Types.Number
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
