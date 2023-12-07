import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const COMMENT_DOCUMENT_NAME = 'Comment';
export const COMMENT_COLLECTION_NAME = 'comments';

export default interface ICOMMENT extends Document {
  content: string;
  studentId:Schema.Types.ObjectId;
  teacherId:Schema.Types.ObjectId;
  reservationId:Schema.Types.ObjectId;
  status:boolean;
  comments:string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ICOMMENT>(
  {
    content: {
      type: Schema.Types.String,
    },
    studentId:{
        type:Schema.Types.ObjectId
    },
    teacherId:{
        type:Schema.Types.ObjectId
    },
    reservationId:{
        type:Schema.Types.ObjectId,
    },
    status:{
        type:Schema.Types.Boolean
    }
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const CommentModel = model<ICOMMENT, Pagination<ICOMMENT>>(
  COMMENT_DOCUMENT_NAME,
  schema,
  COMMENT_COLLECTION_NAME,
);
