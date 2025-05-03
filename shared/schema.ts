import { pgTable, text, serial, integer, boolean, jsonb, numeric, timestamp, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
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
  // Added fields from Eco CoLab guide
  passions: jsonb("passions").default([]),
  availability: text("availability"),
  preferredRoles: jsonb("preferred_roles").default([]),
  languages: jsonb("languages").default([]),
  workStyle: text("work_style"),
  learningGoals: jsonb("learning_goals").default([]),
  createdAt: timestamp("created_at").defaultNow(),
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
  passions: true,
  availability: true,
  preferredRoles: true,
  languages: true,
  workStyle: true,
  learningGoals: true,
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  createdById: integer("created_by_id").notNull(),
  createdAt: text("created_at").notNull(), // Keep original field as text
  createdAtTimestamp: timestamp("created_at_timestamp").defaultNow(), // Add new timestamp field
  neededSkills: jsonb("needed_skills").notNull().default([]),
  neededResources: jsonb("needed_resources").notNull().default([]),
  members: jsonb("members").notNull().default([]),
  membersNeeded: integer("members_needed").notNull().default(0),
  values: jsonb("values").notNull().default([]),
  status: text("status").notNull().default("open"),
  // Added fields from Eco CoLab guide
  scope: text("scope"),
  deliverables: jsonb("deliverables").default([]),
  openRoles: jsonb("open_roles").default([]),
  schedule: text("schedule"),
  revenueModel: text("revenue_model"),
  category: text("category"),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  image: true,
  createdById: true,
  createdAt: true,
  neededSkills: true,
  neededResources: true,
  members: true,
  membersNeeded: true,
  values: true,
  status: true,
  scope: true,
  deliverables: true,
  openRoles: true,
  schedule: true,
  revenueModel: true,
  category: true,
});

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  recipientId: integer("recipient_id").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(), // Keep original field as text
  createdAtTimestamp: timestamp("created_at_timestamp").defaultNow(), // Add new timestamp field
  read: boolean("read").notNull().default(false),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  senderId: true,
  recipientId: true,
  content: true,
  createdAt: true,
  read: true,
});

// Project Applications (Bids) table
export const projectApplications = pgTable("project_applications", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  userId: integer("user_id").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(), // Keep original field as text
  createdAtTimestamp: timestamp("created_at_timestamp").defaultNow(), // Add new timestamp field
  // Added fields from Eco CoLab guide
  roleApplied: text("role_applied"),
  hoursRequested: integer("hours_requested"),
});

export const insertProjectApplicationSchema = createInsertSchema(projectApplications).pick({
  projectId: true,
  userId: true,
  message: true,
  status: true,
  createdAt: true,
  roleApplied: true,
  hoursRequested: true,
});

// Types for use in the application
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Investors table for SIM
export const investors = pgTable("investors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id").notNull(),
  amount: numeric("amount").notNull(),
  reimbursed: numeric("reimbursed").notNull().default('0'),
  interestRate: numeric("interest_rate").default('0.01'),
  lastPaymentDate: date("last_payment_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInvestorSchema = createInsertSchema(investors).pick({
  userId: true,
  projectId: true,
  amount: true,
  interestRate: true,
});

// Contributions/Time Logs
export const contributions = pgTable("contributions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id").notNull(),
  hoursWorked: numeric("hours_worked").notNull(),
  dateWorked: date("date_worked").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContributionSchema = createInsertSchema(contributions).pick({
  userId: true,
  projectId: true,
  hoursWorked: true,
  dateWorked: true,
  notes: true,
});

// Resources (map-linked)
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(), // For simplicity, using text instead of GEOGRAPHY type
  status: text("status").notNull().default("active"),
  accessMethod: text("access_method"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  type: true,
  description: true,
  location: true,
  status: true,
  accessMethod: true,
});

// Feedback for learning module
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id").notNull(),
  feedbackText: text("feedback_text").notNull(),
  feedbackDate: date("feedback_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Project participation agreements
export const agreements = pgTable("agreements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id").notNull(),
  role: text("role").notNull(),
  hoursCommitted: integer("hours_committed").notNull(),
  contractText: text("contract_text").notNull(),
  signedOn: timestamp("signed_on").defaultNow(),
  ipAddress: text("ip_address"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFeedbackSchema = createInsertSchema(feedback).pick({
  userId: true,
  projectId: true,
  feedbackText: true,
});

export const insertAgreementSchema = createInsertSchema(agreements).pick({
  userId: true,
  projectId: true,
  role: true,
  hoursCommitted: true,
  contractText: true,
  ipAddress: true,
});

export type ProjectApplication = typeof projectApplications.$inferSelect;
export type InsertProjectApplication = z.infer<typeof insertProjectApplicationSchema>;

export type Investor = typeof investors.$inferSelect;
export type InsertInvestor = z.infer<typeof insertInvestorSchema>;

export type Contribution = typeof contributions.$inferSelect;
export type InsertContribution = z.infer<typeof insertContributionSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

export type Agreement = typeof agreements.$inferSelect;
export type InsertAgreement = z.infer<typeof insertAgreementSchema>;

// Define relationships between tables
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects, { relationName: "userProjects" }),
  applications: many(projectApplications, { relationName: "userApplications" }),
  sentMessages: many(messages, { relationName: "userSentMessages" }),
  receivedMessages: many(messages, { relationName: "userReceivedMessages" }),
  investments: many(investors, { relationName: "userInvestments" }),
  contributions: many(contributions, { relationName: "userContributions" }),
  feedbacks: many(feedback, { relationName: "userFeedbacks" }),
  agreements: many(agreements, { relationName: "userAgreements" }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  creator: one(users, {
    fields: [projects.createdById],
    references: [users.id],
    relationName: "userProjects"
  }),
  applications: many(projectApplications, { relationName: "projectApplications" }),
  investments: many(investors, { relationName: "projectInvestments" }),
  contributions: many(contributions, { relationName: "projectContributions" }),
  feedbacks: many(feedback, { relationName: "projectFeedbacks" }),
  agreements: many(agreements, { relationName: "projectAgreements" }),
}));

export const projectApplicationsRelations = relations(projectApplications, ({ one }) => ({
  project: one(projects, {
    fields: [projectApplications.projectId],
    references: [projects.id],
    relationName: "projectApplications"
  }),
  user: one(users, {
    fields: [projectApplications.userId],
    references: [users.id],
    relationName: "userApplications"
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "userSentMessages"
  }),
  recipient: one(users, {
    fields: [messages.recipientId],
    references: [users.id],
    relationName: "userReceivedMessages"
  }),
}));

export const investorsRelations = relations(investors, ({ one }) => ({
  user: one(users, {
    fields: [investors.userId],
    references: [users.id],
    relationName: "userInvestments"
  }),
  project: one(projects, {
    fields: [investors.projectId],
    references: [projects.id],
    relationName: "projectInvestments"
  }),
}));

export const contributionsRelations = relations(contributions, ({ one }) => ({
  user: one(users, {
    fields: [contributions.userId],
    references: [users.id],
    relationName: "userContributions"
  }),
  project: one(projects, {
    fields: [contributions.projectId],
    references: [projects.id],
    relationName: "projectContributions"
  }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, {
    fields: [feedback.userId],
    references: [users.id],
    relationName: "userFeedbacks"
  }),
  project: one(projects, {
    fields: [feedback.projectId],
    references: [projects.id],
    relationName: "projectFeedbacks"
  }),
}));

export const agreementsRelations = relations(agreements, ({ one }) => ({
  user: one(users, {
    fields: [agreements.userId],
    references: [users.id],
    relationName: "userAgreements"
  }),
  project: one(projects, {
    fields: [agreements.projectId],
    references: [projects.id],
    relationName: "projectAgreements"
  }),
}));
