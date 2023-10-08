import { Response, Request, RequestHandler } from 'express';
import AsyncHandler from 'express-async-handler';
import { Types } from 'mongoose';
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants/constants';
import Offer from '../../services/v1/offer.service';
import { HttpCode } from '../../utils/httpCode';

// @desc    Get All
// @route   GET /api/todos
// @access  Private
const getAll: RequestHandler = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { category, page, pageSize } = req?.query;
  
  const result = await Offer.getAll(
    String(category || ''),
    Number(page || DEFAULT_CURRENT_PAGE),
    Number(pageSize || DEFAULT_PAGE_SIZE),
  );
  res.status(HttpCode.OK).json({ success: true, message: '', data: result });
});

// @desc    Get By Id
// @route   GET /api/todos/:id
// @access  Private
const getById: RequestHandler = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req?.params;
  const result = await Offer.getById(req?.user?.id, new Types.ObjectId(id));
  res.status(HttpCode.OK).json({ success: true, message: '', data: result });
});

// @desc    Create
// @route   POST /api/offerCategory
// @access  Private
const create: RequestHandler = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const result = await Offer.create(req?.body);
  res.status(HttpCode.CREATED).json({
    success: true,
    message: 'Offer created successfully',
    data: result,
  });
});

// @desc    Update
// @route   PUT /api/todos/:id
// @access  Private
const edit: RequestHandler = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req?.params;
  const result = await Offer.edit(req?.user?.id, new Types.ObjectId(id), req?.body);
  res.status(HttpCode.OK).json({
    success: true,
    message: 'Offer updated successfully',
    data: result,
  });
});

// @desc    Delete
// @route   DELETE /api/todos/:id
// @access  Private
const remove: RequestHandler = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req?.params;
  const result = await Offer.remove(req?.user?.id, new Types.ObjectId(id));
  res.status(HttpCode.OK).json({
    success: true,
    message: 'Offer deleted successfully',
    data: result,
  });
});

export default {
  getAll,
  getById,
  create,
  edit,
  remove
};
