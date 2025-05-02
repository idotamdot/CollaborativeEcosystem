import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  messages, type Message, type InsertMessage,
  projectApplications, type ProjectApplication, type InsertProjectApplication
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
}

/* Keeping this for reference but we're now using DatabaseStorage
export class MemStorage implements IStorage {
  // Implementation details omitted
}
*/

// We've transitioned from MemStorage to DatabaseStorage
export const storage = new DatabaseStorage();