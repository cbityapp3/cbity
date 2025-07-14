import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'school_admin' | 'teacher' | 'student';
  school?: string;
  school_id?: string;
  avatar?: string;
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  useDatabase: boolean;
  setUseDatabase: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useDatabase, setUseDatabase] = useState(false);

  useEffect(() => {
    // Check database preference
    const dbPreference = localStorage.getItem('cbt_use_database');
    if (dbPreference) {
      setUseDatabase(JSON.parse(dbPreference));
    }

    // Initialize auth
    initializeAuth();
  }, []);

  useEffect(() => {
    localStorage.setItem('cbt_use_database', JSON.stringify(useDatabase));
  }, [useDatabase]);

  const initializeAuth = async () => {
    try {
      if (useDatabase) {
        // Check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserProfile(session.user);
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            await loadUserProfile(session.user);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        });

        return () => subscription.unsubscribe();
      } else {
        // Check for stored demo user data
        const storedUser = localStorage.getItem('cbt_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select(`
          *,
          school:schools(*)
        `)
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return;
      }

      if (userProfile) {
        const user: User = {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role,
          school: userProfile.school?.name,
          school_id: userProfile.school_id,
          avatar: userProfile.avatar,
          profile: {
            phone: userProfile.phone,
            address: userProfile.address,
            joinDate: userProfile.created_at?.split('T')[0],
            ...userProfile.metadata
          }
        };
        setUser(user);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (useDatabase) {
        // Supabase authentication
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          console.error('Supabase login error:', error);
          setIsLoading(false);
          return false;
        }

        if (data.user) {
          await loadUserProfile(data.user);
          setIsLoading(false);
          return true;
        }
      } else {
        // Demo users (local mode)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const demoUsers = {
          'superadmin@gmail.com': {
            id: 'super_admin_1',
            email: 'superadmin@gmail.com',
            name: 'Super Administrator',
            role: 'super_admin' as const,
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            profile: {
              phone: '+234 806 946 2143',
              address: 'Lagos, Nigeria',
              joinDate: '2024-01-01',
              permissions: ['all']
            }
          },
          'admin@lagosmodel.edu.ng': {
            id: 'school_admin_1',
            email: 'admin@lagosmodel.edu.ng',
            name: 'Dr. Adebayo Olumide',
            role: 'school_admin' as const,
            school: 'Lagos State Model College',
            avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            profile: {
              phone: '+234 802 123 4567',
              address: 'Ikeja, Lagos State',
              joinDate: '2024-02-01',
              permissions: ['school_management']
            }
          },
          'teacher@lagosmodel.edu.ng': {
            id: 'teacher_1',
            email: 'teacher@lagosmodel.edu.ng',
            name: 'Mrs. Adunni Fashola',
            role: 'teacher' as const,
            school: 'Lagos State Model College',
            avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            profile: {
              phone: '+234 811 123 4567',
              address: 'Lekki, Lagos',
              joinDate: '2024-03-01',
              subjects: ['Mathematics', 'Physics'],
              permissions: ['exam_management']
            }
          },
          'student@lagosmodel.edu.ng': {
            id: 'student_1',
            email: 'student@lagosmodel.edu.ng',
            name: 'Adebayo Oluwaseun',
            role: 'student' as const,
            school: 'Lagos State Model College',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            profile: {
              phone: '+234 801 123 4567',
              address: 'Ikeja, Lagos',
              joinDate: '2024-09-01',
              class: 'SS3A',
              studentId: 'STD001',
              permissions: ['exam_taking']
            }
          }
        };

        // Check credentials
        const userData = demoUsers[email as keyof typeof demoUsers];
        if (userData && password === 'password123') {
          setUser(userData);
          localStorage.setItem('cbt_user', JSON.stringify(userData));
          setIsLoading(false);
          return true;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    if (useDatabase) {
      supabase.auth.signOut();
    } else {
      setUser(null);
      localStorage.removeItem('cbt_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, useDatabase, setUseDatabase }}>
      {children}
    </AuthContext.Provider>
  );
};