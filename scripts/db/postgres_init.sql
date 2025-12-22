-- Create table (if you want DB init outside EF; optional)
-- But we will use EF migrations for schema.
-- Stored procedure/function for counts by status:

-- Reporting function: counts by status (stored procedure equivalent)
-- Returns: status (int), count (bigint)

CREATE OR REPLACE FUNCTION sp_request_counts_by_status()
RETURNS TABLE(status int, count bigint)
LANGUAGE sql
AS $$
  SELECT "Status" as status, COUNT(*) as count
  FROM "ServiceRequests"
  GROUP BY "Status"
  ORDER BY "Status";
$$;
