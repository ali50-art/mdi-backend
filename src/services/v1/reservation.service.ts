import { ErrorHandler } from '../../utils/errorHandler';
import reservation from '../../database/mongodb/repositories/reservation.repo';
import { HttpCode } from '../../utils/httpCode';
import UserRepository from '../../database/mongodb/repositories/user.repository';
import { Types } from 'mongoose';
import IReservation from '../../database/mongodb/models/reservation.model'
import { Order } from '../../database/mongodb/models/order.model';

const getAll = async (category: string, page: number, pageSize: number) => {
  // create options object to filter data
  const options = {
    page: page,
    limit: pageSize,
  };

  // get docs and meta
  const { docs, ...meta } = await reservation.getAll({$or: [
    { studentId: category },
    { teacherId: category },
  ],}, options, {});

  // return data
  return { docs, meta };
};

const getById = async (userId: Types.ObjectId, id: Types.ObjectId) => {
  // create options object to filter data
  const options = {
    user: userId,
    _id: id,
  };

  // get item by options
  const todo = await reservation.getOneByQuery(options);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // return data
  return todo;
};

const create = async (item: IReservation) => {
  

  // create item
  const createdoffer = await reservation.create(item);
  const lastOrder:any=await Order.find({ studentId:item.studentId })
  .sort({ timestamp: -1 }) 
  .limit(1)

  await Order.findByIdAndUpdate(lastOrder[0]._id,{nbHoures:lastOrder[0].nbHoures-1},{ new: true })
  // return data
  return createdoffer;
};

const edit = async (userId: Types.ObjectId, id: Types.ObjectId, item: IReservation) => {
  // create options object to filter data
  const options = {
    _id: id,
  };

  // get item by options
  const todo:any = await reservation.getOneByQuery(options);
  
  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('offer category not found!', HttpCode.NOT_FOUND);
  }
  
  // edit item
  const updatedTodo = await reservation.edit(id, item);

  // return data
  return updatedTodo;
};

const remove = async (userId: Types.ObjectId, id: Types.ObjectId) => {
  // create options object to filter data
  const options = {
    _id: id,
  };

  // get item by options
  const todo:any = await reservation.getOneByQuery(options);
  
  const lastOrder:any=await Order.find({ studentId:todo.studentId })
  .sort({ timestamp: -1 }) 
  .limit(1)
  console.log('lastOrder : ',lastOrder);
  

  await Order.findByIdAndUpdate(lastOrder[0]._id,{nbHoures:lastOrder[0].nbHoures+1},{ new: true })
  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // remove item
  await reservation.remove(id);

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
  const { docs, ...meta } = await reservation.getAll({}, options, { name });

  // return data
  return { docs, meta };
};

const getByIdAdmin = async (id: Types.ObjectId) => {
  // get item by his id
  const todo = await reservation.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // return data
  return todo;
};

const editAdmin = async (id: Types.ObjectId, item: IReservation) => {
  // get item by his id
  const todo = await reservation.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // update item
  const updatedTodo = await reservation.edit(id, item);

  // return data
  return updatedTodo;
};

const removeAdmin = async (id: Types.ObjectId) => {
  // get item by his id
  const todo = await reservation.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // delete item
  await reservation.remove(id);

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
  const { docs, ...meta } = await reservation.getAll({ user: userId }, options, { name });

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
