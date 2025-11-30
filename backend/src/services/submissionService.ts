import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Submission, CreateSubmissionPayload } from '../types/submission';

const SUBMISSIONS_PATH = path.join(process.cwd(), 'data', 'submissions.json');

const readSubmissions = async (): Promise<Submission[]> => {
  try {
    const fileContent = await fs.readFile(SUBMISSIONS_PATH, 'utf-8');
    return JSON.parse(fileContent) as Submission[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeSubmissions = async (submissions: Submission[]): Promise<void> => {
  await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
};

export const createSubmission = async (
  payload: CreateSubmissionPayload
): Promise<{ id: string; createdAt: string }> => {
  try {
    const submissions = await readSubmissions();

    const now = new Date().toISOString();
    const submission: Submission = {
      id: `sub_${uuidv4()}`,
      formId: payload.formId,
      data: payload.data,
      createdAt: now,
      updatedAt: now
    };

    submissions.push(submission);
    await writeSubmissions(submissions);

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
    const submissions = await readSubmissions();

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
