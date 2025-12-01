import { Submission, CreateSubmissionPayload } from '../types/submission';
import { getSubmissions as getSubmissionsData, addSubmission } from '../data/submissions';
import { randomUUID } from 'crypto';

export const createSubmission = async (
  payload: CreateSubmissionPayload
): Promise<{ id: string; createdAt: string }> => {
  try {
    const now = new Date().toISOString();
    const submission: Submission = {
      id: `sub_${randomUUID()}`,
      formId: payload.formId,
      data: payload.data,
      createdAt: now,
      updatedAt: now
    };

    addSubmission(submission);

    return {
      id: submission.id,
      createdAt: submission.createdAt
    };
  } catch (error) {
    console.error('Error creating submission:', error);
    throw new Error('Failed to save submission');
  }
};

export const getSubmissions = async (
  page: number,
  limit: number,
  sortOrder: 'asc' | 'desc' = 'desc'
): Promise<{ submissions: Submission[]; total: number }> => {
  try {
    const submissions = getSubmissionsData();

    // Sort by createdAt
    const sorted = [...submissions].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Paginate
    const skip = (page - 1) * limit;
    const paginated = sorted.slice(skip, skip + limit);

    return {
      submissions: paginated,
      total: sorted.length
    };
  } catch (error) {
    console.error('Error getting submissions:', error);
    throw new Error('Failed to retrieve submissions');
  }
};
