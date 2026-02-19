
-- Create table for logging blocked/suspicious requests
CREATE TABLE public.security_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'bot_detected', 'rate_limited', 'invalid_input', 'suspicious_prompt'
  ip_address TEXT,
  user_agent TEXT,
  details TEXT,
  request_path TEXT,
  blocked BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- No public read/write access - only service role can insert (from edge functions)
-- No SELECT policy for anon/authenticated means the table is not readable from the client

-- Create index for querying by time and event type
CREATE INDEX idx_security_logs_created_at ON public.security_logs (created_at DESC);
CREATE INDEX idx_security_logs_event_type ON public.security_logs (event_type);
CREATE INDEX idx_security_logs_ip ON public.security_logs (ip_address);
