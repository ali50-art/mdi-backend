import { Schema, model, Document } from 'mongoose';
import { RolesEnum } from '../../../constants/constants';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const USER_DOCUMENT_NAME = 'User';
export const USER_COLLECTION_NAME = 'users';

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  phone:string;
  coverImg:string;
  location:string;
  codePostal:string;
  city:string;
  age:number;
  googleId:string;
  role: string
  status:boolean;
  hasOffer:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IUser>(
  {
    name: {
      type: Schema.Types.String,
      
    },
    email: {
      type: Schema.Types.String,
      
    },
    phone:{
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
      
    },
    avatar: {
      type: Schema.Types.String,
      default: 'default-user.png',
    },
    coverImg:{
      type: Schema.Types.String,
      default: 'default-cover.png',
    },
    location:{
      type: Schema.Types.String,
    },
    codePostal:{
      type: Schema.Types.String,
    },
    city:{
      type: Schema.Types.String,
    },
    age:{
      type: Schema.Types.Number,
    },
    googleId:{
      type: Schema.Types.String,
    },
    role: {
      type: Schema.Types.String,
      required: true,
      enum: [RolesEnum.superAdmin,RolesEnum.admin, RolesEnum.teacher,RolesEnum.student],
      default: RolesEnum.student,
    },
    status:{
      type:Schema.Types.Boolean,
      default:true
    },
    hasOffer:{
      type:Schema.Types.Boolean,
      default:false
    }
  },
  { timestamps: true, versionKey: false },
);

schema.plugin(mongoosePagination);

export const User = model<IUser, Pagination<IUser>>(
  USER_DOCUMENT_NAME,
  schema,
  USER_COLLECTION_NAME,
);
