import type {
  AdminTool,
  AdminCategory,
  AdminBlogPost,
  AdminSeoSettings,
  AdminHomepageSettings,
  AdminAdSettings,
  AdminAffiliateSettings,
  AdminNewsletterSettings,
  AdminSettings,
  AdminSystemInfo,
  AdminLogEntry,
  AdminDashboardStats,
} from './types';

export interface DataProvider {
  // Dashboard
  getDashboardStats(): Promise<AdminDashboardStats>;

  // Tools
  getTools(): Promise<AdminTool[]>;
  getTool(slug: string): Promise<AdminTool | null>;
  createTool(tool: AdminTool): Promise<AdminTool>;
  updateTool(slug: string, tool: Partial<AdminTool>): Promise<AdminTool>;
  deleteTool(slug: string): Promise<void>;
  duplicateTool(slug: string): Promise<AdminTool>;
  bulkDeleteTools(slugs: string[]): Promise<void>;
  bulkUpdateToolCategory(slugs: string[], category: string): Promise<void>;
  bulkUpdateToolStatus(slugs: string[], status: 'published' | 'draft'): Promise<void>;

  // Categories
  getCategories(): Promise<AdminCategory[]>;
  getCategory(slug: string): Promise<AdminCategory | null>;
  createCategory(category: AdminCategory): Promise<AdminCategory>;
  updateCategory(slug: string, category: Partial<AdminCategory>): Promise<AdminCategory>;
  deleteCategory(slug: string): Promise<void>;
  reorderCategories(slugs: string[]): Promise<void>;

  // Blog
  getBlogPosts(): Promise<AdminBlogPost[]>;
  getBlogPost(slug: string): Promise<AdminBlogPost | null>;
  createBlogPost(post: AdminBlogPost): Promise<AdminBlogPost>;
  updateBlogPost(slug: string, post: Partial<AdminBlogPost>): Promise<AdminBlogPost>;
  deleteBlogPost(slug: string): Promise<void>;

  // SEO
  getSeoSettings(): Promise<AdminSeoSettings>;
  updateSeoSettings(settings: Partial<AdminSeoSettings>): Promise<AdminSeoSettings>;

  // Homepage
  getHomepageSettings(): Promise<AdminHomepageSettings>;
  updateHomepageSettings(settings: Partial<AdminHomepageSettings>): Promise<AdminHomepageSettings>;

  // Ads
  getAdSettings(): Promise<AdminAdSettings>;
  updateAdSettings(settings: Partial<AdminAdSettings>): Promise<AdminAdSettings>;

  // Affiliates
  getAffiliateSettings(): Promise<AdminAffiliateSettings>;
  updateAffiliateSettings(settings: Partial<AdminAffiliateSettings>): Promise<AdminAffiliateSettings>;

  // Newsletter
  getNewsletterSettings(): Promise<AdminNewsletterSettings>;
  updateNewsletterSettings(settings: Partial<AdminNewsletterSettings>): Promise<AdminNewsletterSettings>;

  // Settings
  getSettings(): Promise<AdminSettings>;
  updateSettings(settings: Partial<AdminSettings>): Promise<AdminSettings>;

  // System
  getSystemInfo(): Promise<AdminSystemInfo>;
  getLogs(): Promise<AdminLogEntry[]>;
  clearCache(): Promise<void>;
  createBackup(): Promise<{ filename: string; size: string }>;
  restoreBackup(filename: string): Promise<void>;
}
