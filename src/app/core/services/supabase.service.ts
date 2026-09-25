import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private client: SupabaseClient | null = null;

  readonly configured = Boolean(environment.supabaseUrl && environment.supabaseAnonKey);
  readonly signedIn = signal(false);
  readonly ready = signal(!this.browser || !this.configured);

  constructor() {
    if (!this.browser || !this.configured) return;

    this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    this.client.auth.onAuthStateChange((_event, session) => {
      this.signedIn.set(Boolean(session));
      this.ready.set(true);
    });
  }

  get db(): SupabaseClient {
    if (!this.client) {
      throw new Error('Supabase is not configured');
    }
    return this.client;
  }

  async signIn(email: string, password: string): Promise<string | null> {
    if (!this.configured) return 'Supabase is not configured yet. Add the URL and anon key in the environment file.';
    const { error } = await this.db.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  }

  async signOut(): Promise<void> {
    await this.db.auth.signOut();
  }
}
