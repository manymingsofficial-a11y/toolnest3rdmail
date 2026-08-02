/*
# Fix search_path on update_updated_at_column function

## Overview
Sets an explicit search_path on the trigger function to prevent search_path injection attacks.

## Changes
- Recreates `update_updated_at_column` with `SET search_path = ''` for security.
*/

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
