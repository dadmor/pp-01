import { useQuery } from '@tanstack/react-query';
import { getTherapists, getTherapistBySlug } from '../lib/supabase';

export const useTherapists = () => {
  return useQuery({
    queryKey: ['therapists'],
    queryFn: getTherapists,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useTherapist = (slug: string) => {
  return useQuery({
    queryKey: ['therapist', slug],
    queryFn: () => getTherapistBySlug(slug),
    enabled: !!slug,
  });
};