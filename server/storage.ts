import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  messages, type Message, type InsertMessage,
  projectApplications, type ProjectApplication, type InsertProjectApplication
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private messages: Map<number, Message>;
  private projectApplications: Map<number, ProjectApplication>;
  
  private userIdCounter: number;
  private projectIdCounter: number;
  private messageIdCounter: number;
  private projectApplicationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.messages = new Map();
    this.projectApplications = new Map();
    
    this.userIdCounter = 1;
    this.projectIdCounter = 1;
    this.messageIdCounter = 1;
    this.projectApplicationIdCounter = 1;
    
    // Initialize with some sample data for development
    this.initSampleData();
  }

  private initSampleData() {
    // Create sample users
    const user1: InsertUser = {
      username: "emma_johnson",
      password: "password123",
      name: "Emma Johnson",
      location: "Portland, OR",
      profileImage: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
      bio: "Sustainable design expert and project manager with a passion for ecological solutions.",
      skills: ["Sustainable Design", "Project Management", "Marketing"],
      resources: ["Workshop Space", "Equipment"],
      values: ["Ecological Restoration", "Shared Leadership", "Equitable Economics"]
    };
    
    const user2: InsertUser = {
      username: "michael_chen",
      password: "password123",
      name: "Michael Chen",
      location: "Seattle, WA",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      bio: "Web developer and marketing specialist looking to create technology for sustainable businesses.",
      skills: ["Web Development", "Marketing", "Design"],
      resources: ["Capital", "Network"],
      values: ["Innovation", "Community Focus", "Circular Economy"]
    };
    
    this.createUser(user1);
    this.createUser(user2);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const project: Project = { 
      ...insertProject, 
      id,
      createdAt: new Date().toISOString() 
    };
    this.projects.set(id, project);
    return project;
  }
  
  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...projectData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
  
  async getProjectsByUser(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.createdById === userId || 
                 (project.members as number[]).includes(userId)
    );
  }
  
  // Message methods
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }
  
  async getMessagesByUser(userId: number): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      message => message.senderId === userId || message.recipientId === userId
    );
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const message: Message = { 
      ...insertMessage, 
      id,
      createdAt: new Date().toISOString() 
    };
    this.messages.set(id, message);
    return message;
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, read: true };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  // Project Application methods
  async getProjectApplication(id: number): Promise<ProjectApplication | undefined> {
    return this.projectApplications.get(id);
  }
  
  async getProjectApplicationsByUser(userId: number): Promise<ProjectApplication[]> {
    return Array.from(this.projectApplications.values()).filter(
      application => application.userId === userId
    );
  }
  
  async getProjectApplicationsByProject(projectId: number): Promise<ProjectApplication[]> {
    return Array.from(this.projectApplications.values()).filter(
      application => application.projectId === projectId
    );
  }
  
  async createProjectApplication(insertApplication: InsertProjectApplication): Promise<ProjectApplication> {
    const id = this.projectApplicationIdCounter++;
    const application: ProjectApplication = { 
      ...insertApplication, 
      id,
      createdAt: new Date().toISOString() 
    };
    this.projectApplications.set(id, application);
    return application;
  }
  
  async updateProjectApplicationStatus(id: number, status: string): Promise<ProjectApplication | undefined> {
    const application = this.projectApplications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, status };
    this.projectApplications.set(id, updatedApplication);
    return updatedApplication;
  }
}

export const storage = new MemStorage();
