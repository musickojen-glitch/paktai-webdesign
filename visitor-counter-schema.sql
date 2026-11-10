-- Optional manual initialization; the function also creates tables when permitted.
CREATE TABLE IF NOT EXISTS visitor_sessions (id TEXT PRIMARY KEY, first_seen INTEGER NOT NULL, last_seen INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS visitor_last_seen ON visitor_sessions(last_seen);
