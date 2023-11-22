import { ErrorHandler } from '../../utils/errorHandler';
import order from '../../database/mongodb/repositories/order.repo';
import { HttpCode } from '../../utils/httpCode';
import UserRepository from '../../database/mongodb/repositories/user.repository';
import { Types } from 'mongoose';
import IOrder from '../../database/mongodb/models/order.model'

const getAll = async (category: string, page: number, pageSize: number) => {
  // create options object to filter data
  const options = {
    page: page,
    limit: pageSize,
  };

  // get docs and meta
  const { docs, ...meta } = await order.getAll({}, options, { category });

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
  const todo = await order.getOneByQuery(options);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // return data
  return todo;
};

const create = async (item: IOrder) => {
  
  
  // create item
  const createdoffer = await order.create(item);

  // return data
  return createdoffer;
};

const edit = async (userId: Types.ObjectId, id: Types.ObjectId, item: IOrder) => {
  // create options object to filter data
  const options = {
    _id: id,
  };

  // get item by options
  const todo = await order.getOneByQuery(options);
  
  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('offer category not found!', HttpCode.NOT_FOUND);
  }

  // edit item
  const updatedTodo = await order.edit(id, item);

  // return data
  return updatedTodo;
};

const remove = async (userId: Types.ObjectId, id: Types.ObjectId) => {
  // create options object to filter data
  const options = {
    _id: id,
  };

  // get item by options
  const todo = await order.getOneByQuery(options);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // remove item
  await order.remove(id);

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
  const { docs, ...meta } = await order.getAll({}, options, { name });

  // return data
  return { docs, meta };
};

const getByIdAdmin = async (id: Types.ObjectId) => {
  // get item by his id
  const todo = await order.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // return data
  return todo;
};




export default {
  getAll,
  getById,
  create,
  edit,
  remove,
  getAllAdmin,
  getByIdAdmin
};
