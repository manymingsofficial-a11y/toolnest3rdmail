-- RPC functions for analytics time series aggregation

-- Page view time series
CREATE OR REPLACE FUNCTION get_page_view_timeseries(start_date timestamptz, interval_unit text)
RETURNS TABLE (bucket text, count bigint) AS $$
BEGIN
  IF interval_unit = 'day' THEN
    RETURN QUERY
      SELECT date_trunc('day', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_page_views
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'week' THEN
    RETURN QUERY
      SELECT date_trunc('week', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_page_views
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'month' THEN
    RETURN QUERY
      SELECT date_trunc('month', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_page_views
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'year' THEN
    RETURN QUERY
      SELECT date_trunc('year', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_page_views
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  END IF;
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Search time series
CREATE OR REPLACE FUNCTION get_search_timeseries(start_date timestamptz, interval_unit text)
RETURNS TABLE (bucket text, count bigint) AS $$
BEGIN
  IF interval_unit = 'day' THEN
    RETURN QUERY
      SELECT date_trunc('day', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_search_events
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'week' THEN
    RETURN QUERY
      SELECT date_trunc('week', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_search_events
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'month' THEN
    RETURN QUERY
      SELECT date_trunc('month', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_search_events
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  ELSIF interval_unit = 'year' THEN
    RETURN QUERY
      SELECT date_trunc('year', created_at)::text AS bucket, count(*)::bigint
      FROM analytics_search_events
      WHERE created_at >= start_date
      GROUP BY 1 ORDER BY 1;
  END IF;
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to anon (for server-side calls with anon key)
GRANT EXECUTE ON FUNCTION get_page_view_timeseries TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_search_timeseries TO anon, authenticated;
