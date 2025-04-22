import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  location: text("location"),
  profileImage: text("profile_image"),
  bio: text("bio"),
  skills: jsonb("skills").notNull().default([]),
  resources: jsonb("resources").notNull().default([]),
  values: jsonb("values").notNull().default([]),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  location: true,
  profileImage: true,
  bio: true,
  skills: true,
  resources: true,
  values: true,
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  createdById: integer("created_by_id").notNull(),
  createdAt: text("created_at").notNull(), // Simplified without actual timestamp
  neededSkills: jsonb("needed_skills").notNull().default([]),
  neededResources: jsonb("needed_resources").notNull().default([]),
  members: jsonb("members").notNull().default([]),
  membersNeeded: integer("members_needed").notNull().default(0),
  values: jsonb("values").notNull().default([]),
  status: text("status").notNull().default("open"),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  image: true,
  createdById: true,
  neededSkills: true,
  neededResources: true,
  members: true,
  membersNeeded: true,
  values: true,
  status: true,
});

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  recipientId: integer("recipient_id").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(), // Simplified without actual timestamp
  read: boolean("read").notNull().default(false),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  senderId: true,
  recipientId: true,
  content: true,
  read: true,
});

// Project Applications table
export const projectApplications = pgTable("project_applications", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  userId: integer("user_id").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(), // Simplified without actual timestamp
});

export const insertProjectApplicationSchema = createInsertSchema(projectApplications).pick({
  projectId: true,
  userId: true,
  message: true,
  status: true,
});

// Types for use in the application
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type ProjectApplication = typeof projectApplications.$inferSelect;
export type InsertProjectApplication = z.infer<typeof insertProjectApplicationSchema>;
