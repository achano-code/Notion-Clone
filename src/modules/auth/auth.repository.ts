import { supabase } from '@/lib/supabase';

export const authRepository = {
  async signup(name: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error != null || data.user == null) throw new Error(error?.message);

    return {
      ...data.user,
      userName: data.user.user_metadata.name,
    };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error != null || data.user == null) throw new Error(error?.message);

    return {
      ...data.user,
      userName: data.user.user_metadata.name,
    };
  },

  async signout() {
    const { error } = await supabase.auth.signOut();
    if (error != null) throw new Error(error.message);
    return true;
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    if (error != null || data.session == null) return;
    return {
      ...data.session,
      userName: data.session.user.user_metadata.name,
    };
  },
};
