import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  messages, type Message, type InsertMessage,
  projectApplications, type ProjectApplication, type InsertProjectApplication,
  investors, type Investor, type InsertInvestor,
  contributions, type Contribution, type InsertContribution,
  resources, type Resource, type InsertResource,
  feedback as feedbackTable, type Feedback, type InsertFeedback,
  agreements, type Agreement, type InsertAgreement,
  timeEntries, type TimeEntry, type InsertTimeEntry,
 //*feature/timesheet-mileage-tracker
  mileageEntries, type MileageEntry, type InsertMileageEntry,
  tasks, type Task, type InsertTask,
  subtasks, type Subtask, type InsertSubtask,
  achievements, type Achievement

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
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const newUser = {
      ...insertUser,
      password: hashedPassword,
    };
    const [user] = await db.insert(users).values(newUser).returning();
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
  
  // SIM Investor methods
  async getInvestor(id: number): Promise<Investor | undefined> {
    const [investor] = await db
      .select()
      .from(investors)
      .where(eq(investors.id, id));
    return investor;
  }
  
  async getInvestorsByUser(userId: number): Promise<Investor[]> {
    return await db
      .select()
      .from(investors)
      .where(eq(investors.userId, userId));
  }
  
  async getInvestorsByProject(projectId: number): Promise<Investor[]> {
    return await db
      .select()
      .from(investors)
      .where(eq(investors.projectId, projectId));
  }
  
  async createInvestor(insertInvestor: InsertInvestor): Promise<Investor> {
    const [investor] = await db
      .insert(investors)
      .values(insertInvestor)
      .returning();
    return investor;
  }
  
  async updateInvestorReimbursement(id: number, amount: number): Promise<Investor | undefined> {
    // First get the current investor to calculate the new reimbursed amount
    const [currentInvestor] = await db
      .select()
      .from(investors)
      .where(eq(investors.id, id));
    
    if (!currentInvestor) return undefined;
    
    // Calculate new reimbursed amount and update
    const currentReimbursed = parseFloat(currentInvestor.reimbursed.toString() || '0');
    const newReimbursed = currentReimbursed + amount;
    
    const [updatedInvestor] = await db
      .update(investors)
      .set({ 
        reimbursed: newReimbursed.toString(),
        lastPaymentDate: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
      })
      .where(eq(investors.id, id))
      .returning();
    
    return updatedInvestor;
  }
  
  // Contribution/Time Log methods
  async getContribution(id: number): Promise<Contribution | undefined> {
    const [contribution] = await db
      .select()
      .from(contributions)
      .where(eq(contributions.id, id));
    return contribution;
  }
  
  async getContributionsByUser(userId: number): Promise<Contribution[]> {
    return await db
      .select()
      .from(contributions)
      .where(eq(contributions.userId, userId));
  }
  
  async getContributionsByProject(projectId: number): Promise<Contribution[]> {
    return await db
      .select()
      .from(contributions)
      .where(eq(contributions.projectId, projectId));
  }
  
  async createContribution(insertContribution: InsertContribution): Promise<Contribution> {
    const [contribution] = await db
      .insert(contributions)
      .values(insertContribution)
      .returning();
    return contribution;
  }
  
  // Resource methods
  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db
      .select()
      .from(resources)
      .where(eq(resources.id, id));
    return resource;
  }
  
  async getAllResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }
  
  async getResourcesByLocation(location: string): Promise<Resource[]> {
    return await db
      .select()
      .from(resources)
      .where(eq(resources.location, location));
  }
  
  async getResourcesByType(type: string): Promise<Resource[]> {
    return await db
      .select()
      .from(resources)
      .where(eq(resources.type, type));
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db
      .insert(resources)
      .values(insertResource)
      .returning();
    return resource;
  }
  
  async updateResource(id: number, resourceData: Partial<InsertResource>): Promise<Resource | undefined> {
    const [resource] = await db
      .update(resources)
      .set(resourceData)
      .where(eq(resources.id, id))
      .returning();
    return resource;
  }
  
  // Feedback methods
  async getFeedback(id: number): Promise<Feedback | undefined> {
    const [feedbackItem] = await db
      .select()
      .from(feedbackTable)
      .where(eq(feedbackTable.id, id));
    return feedbackItem;
  }
  
  async getFeedbackByUser(userId: number): Promise<Feedback[]> {
    return await db
      .select()
      .from(feedbackTable)
      .where(eq(feedbackTable.userId, userId));
  }
  
  async getFeedbackByProject(projectId: number): Promise<Feedback[]> {
    return await db
      .select()
      .from(feedbackTable)
      .where(eq(feedbackTable.projectId, projectId));
  }
  
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [feedbackEntry] = await db
      .insert(feedbackTable)
      .values(insertFeedback)
      .returning();
    return feedbackEntry;
  }

  // Agreement methods
  async getAgreement(id: number): Promise<Agreement | undefined> {
    const [agreement] = await db
      .select()
      .from(agreements)
      .where(eq(agreements.id, id));
    return agreement;
  }
  
  async getAgreementsByUser(userId: number): Promise<Agreement[]> {
    return await db
      .select()
      .from(agreements)
      .where(eq(agreements.userId, userId));
  }
  
  async getAgreementsByProject(projectId: number): Promise<Agreement[]> {
    return await db
      .select()
      .from(agreements)
      .where(eq(agreements.projectId, projectId));
  }
  
  async createAgreement(insertAgreement: InsertAgreement): Promise<Agreement> {
    const [agreement] = await db
      .insert(agreements)
      .values(insertAgreement)
      .returning();
    return agreement;
  }
  
  async updateAgreementStatus(id: number, status: string): Promise<Agreement | undefined> {
    const [agreement] = await db
      .update(agreements)
      .set({ status })
      .where(eq(agreements.id, id))
      .returning();
    return agreement;
  }

  // Timesheet methods
  async getTimeEntry(id: number): Promise<TimeEntry | undefined> {
    const [timeEntry] = await db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.id, id));
    return timeEntry;
  }

  async getTimeEntriesByUser(userId: number): Promise<TimeEntry[]> {
    return await db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.userId, userId));
  }

  async createTimeEntry(insertTimeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const [timeEntry] = await db
      .insert(timeEntries)
      .values(insertTimeEntry)
      .returning();
    return timeEntry;
  }

  async deleteTimeEntry(id: number): Promise<boolean> {
    const result = await db
      .delete(timeEntries)
      .where(eq(timeEntries.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Mileage methods
  async getMileageEntry(id: number): Promise<MileageEntry | undefined> {
    const [mileageEntry] = await db
      .select()
      .from(mileageEntries)
      .where(eq(mileageEntries.id, id));
    return mileageEntry;
  }

  async getMileageEntriesByUser(userId: number): Promise<MileageEntry[]> {
    return await db
      .select()
      .from(mileageEntries)
      .where(eq(mileageEntries.userId, userId));
  }

  async createMileageEntry(insertMileageEntry: InsertMileageEntry): Promise<MileageEntry> {
    const [mileageEntry] = await db
      .insert(mileageEntries)
      .values(insertMileageEntry)
      .returning();
    return mileageEntry;
  }

  async deleteMileageEntry(id: number): Promise<boolean> {
    const result = await db
      .delete(mileageEntries)
      .where(eq(mileageEntries.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
//* feature/timesheet-mileage-tracker

  // Task Automation methods
  async getTasksByProject(projectId: number): Promise<Task[]> {
    return await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, projectId));
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db
      .insert(tasks)
      .values(insertTask)
      .returning();
    return task;
  }

  async updateTask(id: number, taskData: Partial<InsertTask>): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set(taskData)
      .where(eq(tasks.id, id))
      .returning();
    return task;
  }

  async updateSubtask(id: number, subtaskData: Partial<InsertSubtask>): Promise<Subtask | undefined> {
    const [subtask] = await db
      .update(subtasks)
      .set(subtaskData)
      .where(eq(subtasks.id, id))
      .returning();
    return subtask;
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }
}