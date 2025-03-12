export type CVStatus =
  | "planned"
  | "pending"
  | "declined"
  | "interview"
  | "practical interview"
  | "accepted";

export type CV = {
  id: string;
  company: string;
  position: string;
  status: CVStatus;
  appliedDate: string;
  notes?: string;
  fileUrl: string;
  categoryId?: string;
  website?: string;
};
