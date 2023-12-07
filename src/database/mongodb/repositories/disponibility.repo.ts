import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../utils/apiFeatures';
import IDisponibility, { Disponibility} from '../models/disponibility.model';

const getAll = async (condition: object, paging: pagingObj, query: object) => {
  let findAllQuery = Disponibility.find({ ...condition }).populate({path:'userId'})

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

  const res = (await Disponibility.paginate(options)) as PaginationModel<IDisponibility>;
  return res;
};

const getById = async (id: Types.ObjectId, select: string = '', populate: string = '') =>
  await Disponibility.findById(id).select(select).populate(populate);

const getByQuery = async (options: object, select: string = '', populate: string = '') =>
  await Disponibility.find(options).select(select).populate(populate);

const getOneByQuery = async (options: object, select: string = '', populate: string = '') =>
  await Disponibility.findOne(options).select(select).populate(populate);

const create = async (item: object) => await Disponibility.create(item);

const edit = async (id: Types.ObjectId, item: object) =>
  await Disponibility.findByIdAndUpdate(id, item, { new: true });

const remove = async (id: Types.ObjectId) => await Disponibility.findByIdAndDelete(id);

export default {
  getAll,
  getById,
  getByQuery,
  getOneByQuery,
  create,
  edit,
  remove,
};
