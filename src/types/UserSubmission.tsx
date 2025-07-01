export interface UserSubmission {
  id: string;
  type: 'article' | 'project' | 'dissertation';
  title: string;
  description: string;
  submittedBy: string;
  email: string;
  fileUrl?: string;
  createdAt: Date;
}
