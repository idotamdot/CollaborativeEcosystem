import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  messages, type Message, type InsertMessage,
  projectApplications, type ProjectApplication, type InsertProjectApplication,
  investors, type Investor, type InsertInvestor,
  contributions, type Contribution, type InsertContribution,
  resources, type Resource, type InsertResource,
  feedback, type Feedback, type InsertFeedback,
  agreements, type Agreement, type InsertAgreement,
  timeEntries, type TimeEntry, type InsertTimeEntry,
  mileageEntries, type MileageEntry, type InsertMileageEntry,
  tasks, type Task, type InsertTask,
  subtasks, type Subtask, type InsertSubtask,
  achievements, type Achievement, type InsertAchievement
} from "@shared/schema";
import { DatabaseStorage } from "./database-storage";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Project methods
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  getProjectsByUser(userId: number): Promise<Project[]>;
  
  // Message methods
  getMessage(id: number): Promise<Message | undefined>;
  getMessagesByUser(userId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  
  // Project Application methods
  getProjectApplication(id: number): Promise<ProjectApplication | undefined>;
  getProjectApplicationsByUser(userId: number): Promise<ProjectApplication[]>;
  getProjectApplicationsByProject(projectId: number): Promise<ProjectApplication[]>;
  createProjectApplication(application: InsertProjectApplication): Promise<ProjectApplication>;
  updateProjectApplicationStatus(id: number, status: string): Promise<ProjectApplication | undefined>;
  
  // SIM Investor methods
  getInvestor(id: number): Promise<Investor | undefined>;
  getInvestorsByUser(userId: number): Promise<Investor[]>;
  getInvestorsByProject(projectId: number): Promise<Investor[]>;
  createInvestor(investor: InsertInvestor): Promise<Investor>;
  updateInvestorReimbursement(id: number, amount: number): Promise<Investor | undefined>;
  
  // Contribution/Time Log methods
  getContribution(id: number): Promise<Contribution | undefined>;
  getContributionsByUser(userId: number): Promise<Contribution[]>;
  getContributionsByProject(projectId: number): Promise<Contribution[]>;
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  
  // Resource methods
  getResource(id: number): Promise<Resource | undefined>;
  getAllResources(): Promise<Resource[]>;
  getResourcesByLocation(location: string): Promise<Resource[]>;
  getResourcesByType(type: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, resourceData: Partial<InsertResource>): Promise<Resource | undefined>;
  
  // Feedback methods
  getFeedback(id: number): Promise<Feedback | undefined>;
  getFeedbackByUser(userId: number): Promise<Feedback[]>;
  getFeedbackByProject(projectId: number): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  
  // Agreement methods
  getAgreement(id: number): Promise<Agreement | undefined>;
  getAgreementsByUser(userId: number): Promise<Agreement[]>;
  getAgreementsByProject(projectId: number): Promise<Agreement[]>;
  createAgreement(agreement: InsertAgreement): Promise<Agreement>;
  updateAgreementStatus(id: number, status: string): Promise<Agreement | undefined>;

  // Timesheet methods
  getTimeEntry(id: number): Promise<TimeEntry | undefined>;
  getTimeEntriesByUser(userId: number): Promise<TimeEntry[]>;
  createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry>;
  deleteTimeEntry(id: number): Promise<boolean>;

  // Mileage methods
  getMileageEntry(id: number): Promise<MileageEntry | undefined>;
  getMileageEntriesByUser(userId: number): Promise<MileageEntry[]>;
  createMileageEntry(mileageEntry: InsertMileageEntry): Promise<MileageEntry>;
  deleteMileageEntry(id: number): Promise<boolean>;

  // Task Automation methods
  getTasksByProject(projectId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, taskData: Partial<InsertTask>): Promise<Task | undefined>;
  updateSubtask(id: number, subtaskData: Partial<InsertSubtask>): Promise<Subtask | undefined>;
  getAllAchievements(): Promise<Achievement[]>;
}

/* Keeping this for reference but we're now using DatabaseStorage
export class MemStorage implements IStorage {
  // Implementation details omitted
}
*/

// We've transitioned from MemStorage to DatabaseStorage
export const storage = new DatabaseStorage();