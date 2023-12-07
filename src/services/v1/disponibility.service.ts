import { ErrorHandler } from '../../utils/errorHandler';
import disponibility from '../../database/mongodb/repositories/disponibility.repo';
import { HttpCode } from '../../utils/httpCode';
import UserRepository from '../../database/mongodb/repositories/user.repository';
import { Types } from 'mongoose';
import IDisponibility from '../../database/mongodb/models/disponibility.model'

const getAll = async (role:string,userId: Types.ObjectId, page: number, pageSize: number) => {
  // create options object to filter data
  const options = {
    page: page,
    limit: pageSize,
  };
  if(role=='student'){
    // get docs and meta
  const { docs, ...meta } = await disponibility.getAll({userId,status:true}, options, {});
  // return data
  return { docs, meta };
  }else{
    // get docs and meta
  const { docs, ...meta } = await disponibility.getAll({userId}, options, {});
  // return data
  return { docs, meta };
  }
  

  

};

const getById = async (userId: Types.ObjectId, id: Types.ObjectId) => {
  // create options object to filter data
  const options = {
    user: userId,
    _id: id,
  };

  // get item by options
  const todo = await disponibility.getOneByQuery(options,"","userId");

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // return data
  return todo;
};
const calculateIntervals = (startDate:any, endDate:any) => {
  const intervalInMinutes = 50;

  // Calculate the difference in milliseconds
  const timeDifference = Math.abs(endDate - startDate);

  // Calculate the number of intervals
  const numberOfIntervals = Math.ceil(timeDifference / (intervalInMinutes * 60 * 1000));

  return numberOfIntervals;
};
const create = async (item: IDisponibility) => {
  // create item
  const date1 = new Date(item.start);
  const date2 = new Date(item.end);

// Calculate the difference in milliseconds
const timeDifference = date2.getTime() - date1.getTime();

// Calculate the difference in days
const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
let createdoffer:any
if(dayDifference==0){
    createdoffer=await disponibility.create(item);
    return createdoffer
  }
  for(let i=0;i<dayDifference;i++){
    const startDate = new Date(item.start);

    // Add the specified number of days to the date
    
    startDate.setDate(startDate.getDate() + i);
    
    
    const endDate=new Date(item.start)
    endDate.setDate(endDate.getDate() + i);
    const end=new Date(item.end)
    endDate.setHours(end.getHours());
    endDate.setMinutes(end.getMinutes());
    endDate.setSeconds(end.getSeconds());
    const numberOfIntervals = calculateIntervals(startDate, endDate);
    for(let j=0;j<numberOfIntervals;j++){
      const newStart=new Date(startDate)
      newStart.setMinutes(startDate.getMinutes() + j * 50);
      const newEndDate=new Date(startDate)
      newEndDate.setMinutes(newEndDate.getMinutes() + (j+1) * 50);

      const el={
        title:item.title,
        allDay:false,
        description:'',
        userId:item.userId,
        start:newStart,
        end:newEndDate
      }
      createdoffer=await disponibility.create(el);
    }
    
  }
  
  // return data
  return createdoffer;
};

const edit = async (userId: Types.ObjectId, id: Types.ObjectId, item: IDisponibility) => {
  // create options object to filter data
  const options = {
    _id: id,
  };

  // get item by options
  const todo = await disponibility.getOneByQuery(options);
  
  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('offer category not found!', HttpCode.NOT_FOUND);
  }

  // edit item
  const updatedTodo = await disponibility.edit(id, item);

  // return data
  return updatedTodo;
};

const remove = async (userId: Types.ObjectId, id: Types.ObjectId) => {
  // create options object to filter data
  const options = {
    _id: id,
  };

  // get item by options
  const todo = await disponibility.getOneByQuery(options);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // remove item
  await disponibility.remove(id);

  // return data
  return todo;
};

const getAllAdmin = async (name: string, page: number, pageSize: number) => {
  // create options object to filter data
  const options = {
    page: page,
    limit: pageSize,
  };

  // get docs and meta
  const { docs, ...meta } = await disponibility.getAll({}, options, { name });

  // return data
  return { docs, meta };
};

const getByIdAdmin = async (id: Types.ObjectId) => {
  // get item by his id
  const todo = await disponibility.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // return data
  return todo;
};

const editAdmin = async (id: Types.ObjectId, item: IDisponibility) => {
  // get item by his id
  const todo = await disponibility.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // update item
  const updatedTodo = await disponibility.edit(id, item);

  // return data
  return updatedTodo;
};

const removeAdmin = async (id: Types.ObjectId) => {
  // get item by his id
  const todo = await disponibility.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // delete item
  await disponibility.remove(id);

  // return data
  return todo;
};

const getAllUserTodosAdmin = async (
  userId: Types.ObjectId,
  name: string,
  page: number,
  pageSize: number,
) => {
  // get user by his id
  const user = await UserRepository.getById(userId);

  // throw error if user not found
  if (!user) {
    throw new ErrorHandler('user not found!', HttpCode.NOT_FOUND);
  }

  // create options object to filter data
  const options = {
    page: page,
    limit: pageSize,
  };

  // get docs and meta
  const { docs, ...meta } = await disponibility.getAll({ user: userId }, options, { name });

  // return data
  return { docs, meta };
};

export default {
  getAll,
  getById,
  create,
  edit,
  remove,
  getAllAdmin,
  getByIdAdmin,
  editAdmin,
  removeAdmin,
  getAllUserTodosAdmin,
};
