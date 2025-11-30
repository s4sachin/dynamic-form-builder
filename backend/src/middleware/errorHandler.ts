import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiResponse } from '../types/api';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ApiResponse<any>>,
  next: NextFunction
): void => {
  console.error('Error:', err.message);

  if (err instanceof ZodError) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const path = issue.path.join('.');
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }
      fieldErrors[path].push(issue.message);
    }

    res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: fieldErrors
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};
