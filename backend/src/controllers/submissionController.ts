import { Request, Response } from 'express';
import { ApiResponse, CreateSubmissionResponse } from '../types/api';
import { CreateSubmissionPayload, SubmissionsQueryResponse } from '../types/submission';
import { createSubmission, getSubmissions } from '../services/submissionService';
import { getFormSchema } from '../services/formService';
import { createFormSubmissionSchema, QueryParamsSchema } from '../validators/formValidation';

export const createSubmissionController = async (
  req: Request<any, any, CreateSubmissionPayload>,
  res: Response<ApiResponse<CreateSubmissionResponse>>
): Promise<void> => {
  try {
    const { formId, data } = req.body;

    // Get form schema for validation
    const formSchema = await getFormSchema();

    // Create Zod schema based on form definition
    const validationSchema = createFormSubmissionSchema(formSchema);

    // Validate submission data
    const validatedData = validationSchema.parse(data);

    // Create submission
    const result = await createSubmission({
      formId,
      data: validatedData
    });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    throw error;
  }
};

export const getSubmissionsController = async (
  req: Request,
  res: Response<ApiResponse<SubmissionsQueryResponse>>
): Promise<void> => {
  try {
    const queryParams = QueryParamsSchema.parse(req.query);
    const { page, limit, sortOrder } = queryParams;

    const { submissions, total } = await getSubmissions(page, limit, sortOrder);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        submissions,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      }
    });
  } catch (error) {
    throw error;
  }
};
