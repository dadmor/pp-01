export interface Therapist {
    id: string;
    slug: string;
    name: string;
    title: string;
    specializations: string[];
    description: string;
    short_description: string;
    image_url?: string;
    price_per_hour: number;
    location: {
      city: string;
      district?: string;
      address?: string;
    };
    contact: {
      phone?: string;
      email: string;
      linkedin?: string;
      instagram?: string;
      facebook?: string;
    };
    availability?: {
      days: string[];
      hours: string;
    };
    created_at: string;
    updated_at: string;
    is_active: boolean;
    meta_title?: string;
    meta_description?: string;
  }
  
  export interface Booking {
    id: string;
    therapist_id: string;
    patient_name: string;
    patient_email: string;
    patient_phone: string;
    date: string;
    time: string;
    duration: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    notes?: string;
    created_at: string;
  }