import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../utils/apiFeatures';
import IOfferCategory, { Offer} from '../models/offers.model';

const getAll = async (condition: object, paging: pagingObj, query: object) => {
  let findAllQuery = Offer.find({ ...condition })

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

  const res = (await Offer.paginate(options)) as PaginationModel<IOfferCategory>;
  return res;
};

const getById = async (id: Types.ObjectId, select: string = '', populate: string = '') =>
  await Offer.findById(id).select(select).populate(populate);

const getByQuery = async (options: object, select: string = '', populate: string = '') =>
  await Offer.find(options).select(select).populate(populate);

const getOneByQuery = async (options: object, select: string = '', populate: string = '') =>
  await Offer.findOne(options).select(select).populate(populate);

const create = async (item: object) => await Offer.create(item);

const edit = async (id: Types.ObjectId, item: object) =>
  await Offer.findByIdAndUpdate(id, item, { new: true });

const remove = async (id: Types.ObjectId) => await Offer.findByIdAndDelete(id);

export default {
  getAll,
  getById,
  getByQuery,
  getOneByQuery,
  create,
  edit,
  remove,
};
