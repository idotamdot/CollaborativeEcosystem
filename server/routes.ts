import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertProjectSchema, 
  insertMessageSchema, 
  insertProjectApplicationSchema,
  insertResourceSchema,
  insertAgreementSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // ===== User Routes =====
  
  // Get all users
  app.get("/api/users", async (_req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users.map(user => {
        // Don't send passwords to client
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }));
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });
  
  // Get user by ID
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password to client
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  });
  
  // Create user
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating user" });
    }
  });
  
  // Update user
  app.put("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const userData = req.body;
      const updatedUser = await storage.updateUser(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Error updating user" });
    }
  });

  // ===== Project Routes =====
  
  // Get all projects
  app.get("/api/projects", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
    }
  });
  
  // Get project by ID
  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  });
  
  // Create project
  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const newProject = await storage.createProject(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating project" });
    }
  });
  
  // Update project
  app.put("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const projectData = req.body;
      const updatedProject = await storage.updateProject(id, projectData);
      
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(updatedProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Error updating project" });
    }
  });
  
  // Delete project
  app.delete("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const success = await storage.deleteProject(id);
      if (!success) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting project" });
    }
  });
  
  // Get projects by user
  app.get("/api/users/:id/projects", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const projects = await storage.getProjectsByUser(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user projects" });
    }
  });

  // ===== Message Routes =====
  
  // Get messages by user
  app.get("/api/users/:id/messages", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const messages = await storage.getMessagesByUser(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user messages" });
    }
  });
  
  // Create message
  app.post("/api/messages", async (req: Request, res: Response) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const newMessage = await storage.createMessage(messageData);
      res.status(201).json(newMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating message" });
    }
  });
  
  // Mark message as read
  app.put("/api/messages/:id/read", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid message ID" });
      }
      
      const updatedMessage = await storage.markMessageAsRead(id);
      if (!updatedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.json(updatedMessage);
    } catch (error) {
      res.status(500).json({ message: "Error updating message" });
    }
  });

  // ===== Project Application Routes =====
  
  // Get applications by project
  app.get("/api/projects/:id/applications", async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const applications = await storage.getProjectApplicationsByProject(projectId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project applications" });
    }
  });
  
  // Get applications by user
  app.get("/api/users/:id/applications", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const applications = await storage.getProjectApplicationsByUser(userId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user applications" });
    }
  });
  
  // Create application
  app.post("/api/applications", async (req: Request, res: Response) => {
    try {
      const applicationData = insertProjectApplicationSchema.parse(req.body);
      const newApplication = await storage.createProjectApplication(applicationData);
      res.status(201).json(newApplication);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid application data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating application" });
    }
  });
  
  // Update application status
  app.put("/api/applications/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedApplication = await storage.updateProjectApplicationStatus(id, status);
      if (!updatedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      res.json(updatedApplication);
    } catch (error) {
      res.status(500).json({ message: "Error updating application status" });
    }
  });

  // ===== Matching Algorithm API =====
  
  // Get matches for a user
  app.get("/api/users/:id/matches", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Get all users except the current one
      const allUsers = await storage.getAllUsers();
      const otherUsers = allUsers.filter(u => u.id !== id);
      
      // Simple matching algorithm based on complementary skills and resources
      const matches = otherUsers.map(otherUser => {
        const userSkills = new Set(user.skills as string[]);
        const otherUserSkills = new Set(otherUser.skills as string[]);
        
        const userResources = new Set(user.resources as string[]);
        const otherUserResources = new Set(otherUser.resources as string[]);
        
        const userValues = new Set(user.values as string[]);
        const otherUserValues = new Set(otherUser.values as string[]);
        
        // Calculate match scores
        const complementarySkillsScore = Array.from(otherUserSkills).filter(skill => !userSkills.has(skill)).length;
        const complementaryResourcesScore = Array.from(otherUserResources).filter(resource => !userResources.has(resource)).length;
        
        // Calculate shared values score
        const sharedValuesScore = Array.from(userValues).filter(value => otherUserValues.has(value)).length;
        
        // Total score with weighting
        const totalScore = (complementarySkillsScore * 2) + (complementaryResourcesScore * 3) + (sharedValuesScore * 1.5);
        
        // Don't send password to client
        const { password, ...matchUserWithoutPassword } = otherUser;
        
        return {
          user: matchUserWithoutPassword,
          matchScore: totalScore,
          complementarySkills: Array.from(otherUserSkills).filter(skill => !userSkills.has(skill)),
          complementaryResources: Array.from(otherUserResources).filter(resource => !userResources.has(resource)),
          sharedValues: Array.from(userValues).filter(value => otherUserValues.has(value)),
        };
      });
      
      // Sort by match score (highest first)
      matches.sort((a, b) => b.matchScore - a.matchScore);
      
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Error finding matches" });
    }
  });

  // ===== Resources Routes =====
  
  // Get all resources
  app.get("/api/resources", async (_req: Request, res: Response) => {
    try {
      const resources = await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Error fetching resources" });
    }
  });
  
  // Get resource by ID
  app.get("/api/resources/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      
      const resource = await storage.getResource(id);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Error fetching resource" });
    }
  });
  
  // Create resource
  app.post("/api/resources", async (req: Request, res: Response) => {
    try {
      const resourceData = insertResourceSchema.parse(req.body);
      const newResource = await storage.createResource(resourceData);
      res.status(201).json(newResource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid resource data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating resource" });
    }
  });
  
  // Update resource
  app.put("/api/resources/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      
      const resourceData = req.body;
      const updatedResource = await storage.updateResource(id, resourceData);
      
      if (!updatedResource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(updatedResource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid resource data", errors: error.errors });
      }
      res.status(500).json({ message: "Error updating resource" });
    }
  });
  
  // Get resources by location
  app.get("/api/resources/location/:location", async (req: Request, res: Response) => {
    try {
      const location = req.params.location;
      const resources = await storage.getResourcesByLocation(location);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Error fetching resources by location" });
    }
  });
  
  // Get resources by type
  app.get("/api/resources/type/:type", async (req: Request, res: Response) => {
    try {
      const type = req.params.type;
      const resources = await storage.getResourcesByType(type);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Error fetching resources by type" });
    }
  });

  // ===== Participation Agreement Routes =====
  
  // Get agreement by ID
  app.get("/api/agreements/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid agreement ID" });
      }
      
      const agreement = await storage.getAgreement(id);
      if (!agreement) {
        return res.status(404).json({ message: "Agreement not found" });
      }
      
      res.json(agreement);
    } catch (error) {
      res.status(500).json({ message: "Error fetching agreement" });
    }
  });
  
  // Get agreements by user
  app.get("/api/users/:id/agreements", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const agreements = await storage.getAgreementsByUser(userId);
      res.json(agreements);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user agreements" });
    }
  });
  
  // Get agreements by project
  app.get("/api/projects/:id/agreements", async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const agreements = await storage.getAgreementsByProject(projectId);
      res.json(agreements);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project agreements" });
    }
  });
  
  // Create agreement (sign participation agreement)
  app.post("/api/agreements", async (req: Request, res: Response) => {
    try {
      const agreementData = insertAgreementSchema.parse(req.body);
      
      // Get IP address for signature verification
      const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const agreementWithIp = {
        ...agreementData,
        ipAddress: ipAddress as string
      };
      
      const newAgreement = await storage.createAgreement(agreementWithIp);
      res.status(201).json(newAgreement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid agreement data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating agreement" });
    }
  });
  
  // Update agreement status (e.g., to inactive if someone leaves)
  app.put("/api/agreements/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid agreement ID" });
      }
      
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedAgreement = await storage.updateAgreementStatus(id, status);
      if (!updatedAgreement) {
        return res.status(404).json({ message: "Agreement not found" });
      }
      
      res.json(updatedAgreement);
    } catch (error) {
      res.status(500).json({ message: "Error updating agreement status" });
    }
  });

  return httpServer;
}
