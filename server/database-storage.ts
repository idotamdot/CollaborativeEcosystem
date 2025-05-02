import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  messages, type Message, type InsertMessage,
  projectApplications, type ProjectApplication, type InsertProjectApplication
} from "@shared/schema";
import { db } from "./db";
import { eq, or, sql } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  constructor() {}

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
  
  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const projectData = {
      ...insertProject,
      createdAt: new Date().toISOString()
    };
    const [project] = await db.insert(projects).values(projectData).returning();
    return project;
  }
  
  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set(projectData)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
  
  async getProjectsByUser(userId: number): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(
        or(
          eq(projects.createdById, userId),
          sql`${projects.members}::jsonb @> ${JSON.stringify([userId])}::jsonb`
        )
      );
  }
  
  // Message methods
  async getMessage(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message;
  }
  
  async getMessagesByUser(userId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
        or(
          eq(messages.senderId, userId),
          eq(messages.recipientId, userId)
        )
      );
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const messageData = {
      ...insertMessage,
      createdAt: new Date().toISOString()
    };
    const [message] = await db.insert(messages).values(messageData).returning();
    return message;
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const [message] = await db
      .update(messages)
      .set({ read: true })
      .where(eq(messages.id, id))
      .returning();
    return message;
  }
  
  // Project Application methods
  async getProjectApplication(id: number): Promise<ProjectApplication | undefined> {
    const [application] = await db
      .select()
      .from(projectApplications)
      .where(eq(projectApplications.id, id));
    return application;
  }
  
  async getProjectApplicationsByUser(userId: number): Promise<ProjectApplication[]> {
    return await db
      .select()
      .from(projectApplications)
      .where(eq(projectApplications.userId, userId));
  }
  
  async getProjectApplicationsByProject(projectId: number): Promise<ProjectApplication[]> {
    return await db
      .select()
      .from(projectApplications)
      .where(eq(projectApplications.projectId, projectId));
  }
  
  async createProjectApplication(insertApplication: InsertProjectApplication): Promise<ProjectApplication> {
    const applicationData = {
      ...insertApplication,
      createdAt: new Date().toISOString()
    };
    const [application] = await db
      .insert(projectApplications)
      .values(applicationData)
      .returning();
    return application;
  }
  
  async updateProjectApplicationStatus(id: number, status: string): Promise<ProjectApplication | undefined> {
    const [application] = await db
      .update(projectApplications)
      .set({ status })
      .where(eq(projectApplications.id, id))
      .returning();
    return application;
  }
}