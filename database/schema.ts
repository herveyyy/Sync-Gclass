import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

// ─── Users ───────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  googleId: varchar("google_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  image: varchar("image", { length: 512 }),
  isOnboarded: boolean("is_onboarded").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Classrooms ──────────────────────────────────────────
export const classrooms = pgTable("classrooms", {
  id: uuid("id").defaultRandom().primaryKey(),
  googleClassroomId: varchar("google_classroom_id", { length: 255 })
    .notNull()
    .unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  section: varchar("section", { length: 255 }),
  room: varchar("room", { length: 255 }),
  subject: varchar("subject", { length: 255 }),
  courseState: varchar("course_state", { length: 50 }),
  alternateLink: varchar("alternate_link", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Subjects ────────────────────────────────────────────
export const subjects = pgTable("subjects", {
  id: uuid("id").defaultRandom().primaryKey(),
  googleSubjectName: varchar("google_subject_name", { length: 255 })
    .notNull()
    .unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Activities (announcements + coursework) ─────────────
export const activities = pgTable("activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  googleActivityId: varchar("google_activity_id", { length: 255 })
    .notNull()
    .unique(),
  classroomId: uuid("classroom_id")
    .notNull()
    .references(() => classrooms.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // 'announcement' | 'coursework'
  title: varchar("title", { length: 500 }),
  description: text("description"),
  dueDate: timestamp("due_date"),
  state: varchar("state", { length: 50 }),
  alternateLink: varchar("alternate_link", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
