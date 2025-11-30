import { Request, Response } from 'express';
import { ApiResponse } from '../types/api';
import { FormSchema } from '../types/form';
import { getFormSchema } from '../services/formService';

export const getFormSchemaController = async (
  req: Request,
  res: Response<ApiResponse<FormSchema>>
): Promise<void> => {
  try {
    const schema = await getFormSchema();
    res.status(200).json({
      success: true,
      data: schema
    });
  } catch (error) {
    console.error('Form schema endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load form schema'
    });
  }
};
