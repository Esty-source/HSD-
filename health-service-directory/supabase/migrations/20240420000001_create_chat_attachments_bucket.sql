-- Create a new storage bucket for chat attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-attachments', 'chat-attachments', true);

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'chat-attachments'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to read files they have access to (through consultation)
CREATE POLICY "Allow users to read chat files"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'chat-attachments'
    AND EXISTS (
        SELECT 1 FROM messages m
        WHERE m.file_url LIKE '%' || name
        AND (m.sender_id = auth.uid() OR m.receiver_id = auth.uid())
    )
); 