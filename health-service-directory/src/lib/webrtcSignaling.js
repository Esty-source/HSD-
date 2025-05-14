import { supabase } from './supabase';

export class WebRTCSignaling {
  constructor(roomId) {
    this.roomId = roomId;
    this.channel = null;
    this.onSignal = null;
    this.onChat = null;
  }

  async connect() {
    this.channel = supabase.channel(`webrtc-${this.roomId}`);
    this.channel.on('broadcast', { event: 'signal' }, ({ payload }) => {
      if (this.onSignal) this.onSignal(payload);
    });
    this.channel.on('broadcast', { event: 'chat' }, ({ payload }) => {
      if (this.onChat) this.onChat(payload);
    });
    await this.channel.subscribe();
  }

  sendSignal(data) {
    this.channel.send({ type: 'broadcast', event: 'signal', payload: data });
  }

  sendChat(message) {
    this.channel.send({ type: 'broadcast', event: 'chat', payload: message });
  }

  disconnect() {
    if (this.channel) this.channel.unsubscribe();
  }
} 