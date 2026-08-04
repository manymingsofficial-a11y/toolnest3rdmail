-- Click tracking table for ads, affiliates, and newsletter
CREATE TABLE IF NOT EXISTS admin_click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('ad', 'affiliate', 'newsletter')),
  placement text NOT NULL DEFAULT '',
  target_id text NOT NULL DEFAULT '',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_click_events_type_created ON admin_click_events (type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_click_events_placement ON admin_click_events (placement, created_at DESC);

-- RLS
ALTER TABLE admin_click_events ENABLE ROW LEVEL SECURITY;

-- Anon can INSERT clicks (tracking happens from the browser)
CREATE POLICY "insert_click_events_anon" ON admin_click_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only authenticated (admin) can read clicks
CREATE POLICY "select_click_events_authenticated" ON admin_click_events
  FOR SELECT TO authenticated USING (true);

-- Only authenticated (admin) can delete clicks
CREATE POLICY "delete_click_events_authenticated" ON admin_click_events
  FOR DELETE TO authenticated USING (true);
