INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('http-header-viewer', 'HTTP Header Viewer', 'View HTTP response headers for any URL.', 'Web Utilities', 'FileSearch', 'from-cyan-400 to-blue-600', NULL, true, 66, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('cookie-viewer', 'Cookie Viewer', 'Inspect cookies stored by your browser.', 'Web Utilities', 'Eye', 'from-teal-400 to-emerald-600', NULL, true, 63, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('dns-lookup', 'DNS Lookup', 'Look up DNS records for any domain.', 'Web Utilities', 'Network', 'from-blue-400 to-teal-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ssl-checker', 'SSL Checker', 'Check SSL certificate details for any website.', 'Web Utilities', 'Lock', 'from-emerald-400 to-cyan-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('website-screenshot', 'Website Screenshot', 'Capture screenshots of any website URL.', 'Web Utilities', 'Camera', 'from-cyan-400 to-blue-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('open-graph-preview', 'Open Graph Preview', 'Preview how your site looks when shared on social media.', 'Web Utilities', 'Share2', 'from-teal-400 to-blue-600', NULL, true, 71, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('url-preview', 'URL Preview', 'Preview meta tags and content for any URL.', 'Web Utilities', 'Link2', 'from-cyan-400 to-teal-600', NULL, true, 65, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('qr-label-generator', 'QR Label Generator', 'Generate printable QR code labels for products.', 'Web Utilities', 'Barcode', 'from-blue-400 to-cyan-600', NULL, true, 67, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('website-manifest-generator', 'Website Manifest Generator', 'Generate PWA manifest files for your website.', 'Web Utilities', 'FileJson', 'from-teal-400 to-cyan-600', NULL, true, 62, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('notes', 'Notes', 'Take and save notes directly in your browser.', 'Productivity', 'StickyNote', 'from-amber-400 to-yellow-600', NULL, true, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('to-do-list', 'To Do List', 'Create and manage tasks with a clean to-do list.', 'Productivity', 'ListTodo', 'from-orange-400 to-amber-600', NULL, true, 85, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pomodoro-timer', 'Pomodoro Timer', 'Boost focus with a Pomodoro work-break timer.', 'Productivity', 'Timer', 'from-red-400 to-orange-600', NULL, true, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('countdown-timer', 'Countdown Timer', 'Set a countdown to any date or event.', 'Productivity', 'Clock', 'from-amber-400 to-red-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('stopwatch', 'Stopwatch', 'A precise stopwatch with lap timing support.', 'Productivity', 'Timer', 'from-orange-400 to-amber-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('calendar', 'Calendar', 'View and navigate a monthly calendar.', 'Productivity', 'Calendar', 'from-amber-400 to-orange-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('age-timeline', 'Age Timeline', 'Visualize your life timeline in weeks.', 'Productivity', 'CalendarClock', 'from-orange-400 to-red-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('meeting-planner', 'Meeting Planner', 'Find the best meeting time across timezones.', 'Productivity', 'MapPin', 'from-amber-400 to-orange-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('timezone-converter', 'Timezone Converter', 'Convert times between any world timezones.', 'Productivity', 'Globe', 'from-orange-400 to-amber-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('business-day-calculator', 'Business Day Calculator', 'Calculate working days between two dates.', 'Productivity', 'CalendarDays', 'from-amber-400 to-yellow-600', NULL, true, 66, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
