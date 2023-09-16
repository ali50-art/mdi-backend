import { ErrorHandler } from '../../utils/errorHandler';
import offerCategory from '../../database/mongodb/repositories/offerCategory.repo';
import { HttpCode } from '../../utils/httpCode';
import UserRepository from '../../database/mongodb/repositories/user.repository';
import { Types } from 'mongoose';
import IOfferCategory from '../../database/mongodb/models/offerCategory.model';

const getAll = async (name: string, page: number, pageSize: number) => {
  // create options object to filter data
  const options = {
    page: page,
    limit: pageSize,
  };

  // get docs and meta
  const { docs, ...meta } = await offerCategory.getAll({}, options, { name });

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
  const todo = await offerCategory.getOneByQuery(options);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // return data
  return todo;
};

const create = async (item: IOfferCategory) => {
  

  // create item
  const createdOfferCategory = await offerCategory.create(item);

  // return data
  return createdOfferCategory;
};

const edit = async (userId: Types.ObjectId, id: Types.ObjectId, item: IOfferCategory) => {
  // create options object to filter data
  const options = {
    _id: id,
  };

  // get item by options
  const todo = await offerCategory.getOneByQuery(options);
  
  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('offer category not found!', HttpCode.NOT_FOUND);
  }

  // edit item
  const updatedTodo = await offerCategory.edit(id, item);

  // return data
  return updatedTodo;
};

const remove = async (userId: Types.ObjectId, id: Types.ObjectId) => {
  // create options object to filter data
  const options = {
    _id: id,
  };

  // get item by options
  const todo = await offerCategory.getOneByQuery(options);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // remove item
  await offerCategory.remove(id);

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
  const { docs, ...meta } = await offerCategory.getAll({}, options, { name });

  // return data
  return { docs, meta };
};

const getByIdAdmin = async (id: Types.ObjectId) => {
  // get item by his id
  const todo = await offerCategory.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // return data
  return todo;
};

const editAdmin = async (id: Types.ObjectId, item: IOfferCategory) => {
  // get item by his id
  const todo = await offerCategory.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // update item
  const updatedTodo = await offerCategory.edit(id, item);

  // return data
  return updatedTodo;
};

const removeAdmin = async (id: Types.ObjectId) => {
  // get item by his id
  const todo = await offerCategory.getById(id);

  // throw error if item not found
  if (!todo) {
    throw new ErrorHandler('todo not found!', HttpCode.NOT_FOUND);
  }

  // delete item
  await offerCategory.remove(id);

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
  const { docs, ...meta } = await offerCategory.getAll({ user: userId }, options, { name });

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
