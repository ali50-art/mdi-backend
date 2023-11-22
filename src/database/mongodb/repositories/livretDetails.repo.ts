import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../utils/apiFeatures';
import ILivretDetail, { LivretDetailModel} from '../models/livretDetails';

const getAll = async (condition: object, paging: pagingObj, query: object) => {
  let findAllQuery = LivretDetailModel.find({ ...condition });

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

  const res = (await LivretDetailModel.paginate(options)) as PaginationModel<ILivretDetail>;
  return res;
};

const getById = async (id: Types.ObjectId, select: string = '', populate: string = '') =>
  await LivretDetailModel.findById(id).select(select).populate(populate);

const getByQuery = async (options: object, select: string = '', populate: string = '') =>
  await LivretDetailModel.find(options).select(select).populate(populate);

const getOneByQuery = async (options: object, select: string = '', populate: string = '') =>
  await LivretDetailModel.findOne(options).select(select).populate(populate);

const create = async (item: object) => await LivretDetailModel.create(item);

const edit = async (id: Types.ObjectId, item: object) =>
  await LivretDetailModel.findByIdAndUpdate(id, item, { new: true });

const remove = async (id: Types.ObjectId) => await LivretDetailModel.findByIdAndDelete(id);

export default {
  getAll,
  getById,
  getByQuery,
  getOneByQuery,
  create,
  edit,
  remove,
};
