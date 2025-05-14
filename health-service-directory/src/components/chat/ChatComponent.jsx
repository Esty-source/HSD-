import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import {
  PaperAirplaneIcon,
  PhotoIcon,
  DocumentIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function ChatComponent({ consultationId, otherUserId, className = '' }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('consultation_id', consultationId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        setError('Failed to load messages');
        console.error('Error fetching messages:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [consultationId]);

  // Subscribe to new messages
  useEffect(() => {
    const subscription = supabase
      .channel(`messages:consultation_id=eq.${consultationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `consultation_id=eq.${consultationId}`
      }, (payload) => {
        setMessages(current => [...current, payload.new]);
        scrollToBottom();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [consultationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          consultation_id: consultationId,
          sender_id: user.id,
          receiver_id: otherUserId,
          content: newMessage,
          message_type: 'text'
        }]);

      if (error) throw error;
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${consultationId}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('chat-attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('chat-attachments')
        .getPublicUrl(filePath);

      // Send message with file
      const { error: messageError } = await supabase
        .from('messages')
        .insert([{
          consultation_id: consultationId,
          sender_id: user.id,
          receiver_id: otherUserId,
          content: file.name,
          message_type: file.type.startsWith('image/') ? 'image' : 'file',
          file_url: publicUrl
        }]);

      if (messageError) throw messageError;
    } catch (err) {
      setError('Failed to upload file');
      console.error('Error uploading file:', err);
    }
  };

  // Render message content based on type
  const renderMessageContent = (message) => {
    switch (message.message_type) {
      case 'image':
        return (
          <img 
            src={message.file_url} 
            alt={message.content}
            className="max-w-xs rounded-lg cursor-pointer hover:opacity-90"
            onClick={() => window.open(message.file_url, '_blank')}
          />
        );
      case 'file':
        return (
          <a 
            href={message.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <DocumentIcon className="h-5 w-5" />
            <span>{message.content}</span>
          </a>
        );
      default:
        return <p className="text-gray-800">{message.content}</p>;
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender_id === user.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {renderMessageContent(message)}
                <div className={`text-xs mt-1 flex items-center justify-end ${
                  message.sender_id === user.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {format(new Date(message.created_at), 'HH:mm')}
                  {message.is_read && message.sender_id === user.id && (
                    <CheckCircleIcon className="h-4 w-4 ml-1" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="border-t p-4">
        <form onSubmit={sendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <PhotoIcon className="h-6 w-6" />
          </button>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
} 