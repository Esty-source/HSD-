-- Create messages table
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    consultation_id UUID NOT NULL,
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
    file_url TEXT,
    FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own messages"
ON messages FOR SELECT
TO authenticated
USING (
    auth.uid() IN (sender_id, receiver_id)
);

CREATE POLICY "Users can insert their own messages"
ON messages FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = sender_id
);

-- Create index for faster queries
CREATE INDEX messages_consultation_id_idx ON messages(consultation_id);
CREATE INDEX messages_sender_receiver_idx ON messages(sender_id, receiver_id);
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE messages; 