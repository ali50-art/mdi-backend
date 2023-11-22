import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../utils/apiFeatures';
import IOrder, { Order} from '../models/order.model';

const getAll = async (condition: object, paging: pagingObj, query: object) => {
  let findAllQuery = Order.find({ ...condition });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search(['category']);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  const res = (await Order.paginate(options)) as PaginationModel<IOrder>;
  return res;
};

const getById = async (id: Types.ObjectId, select: string = '', populate: string = '') =>
  await Order.findById(id).select(select).populate(populate);

const getByQuery = async (options: object, select: string = '', populate: string = '') =>
  await Order.find(options).select(select).populate(populate);

const getOneByQuery = async (options: object, select: string = '', populate: string = '') =>
  await Order.findOne(options).select(select).populate(populate);

const create = async (item: object) => await Order.create(item);

const edit = async (id: Types.ObjectId, item: object) =>
  await Order.findByIdAndUpdate(id, item, { new: true });

const remove = async (id: Types.ObjectId) => await Order.findByIdAndDelete(id);

export default {
  getAll,
  getById,
  getByQuery,
  getOneByQuery,
  create,
  edit,
  remove,
};
