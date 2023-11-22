import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const Order_DOCUMENT_NAME = 'Order';
export const Orders_COLLECTION_NAME = 'orders';

export default interface IOrder extends Document {
  offerId:  Schema.Types.ObjectId;
  studentId:  Schema.Types.ObjectId;
  nbHoures:number;
  status:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IOrder>(
  {
    offerId: {
        type: Schema.Types.ObjectId,
        ref:'Offer'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref:'User'
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

export const Order = model<IOrder, Pagination<IOrder>>(
  Order_DOCUMENT_NAME,
  schema,
  Orders_COLLECTION_NAME,
);
