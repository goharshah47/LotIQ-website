export interface PropertyData {
  name: string;
  type: string;
  address: string;
  country: string;
  timezone: string;
  zones: string[];
}

export interface SignupState {
  step: number;
  account: {
    firstName: string;
    lastName: string;
    company: string;
    role: string;
    email: string;
    phone: string;
  };
  property: PropertyData;
  monitoring: {
    parking: boolean;
    safety: boolean;
    maintenance: boolean;
  };
  towPartner: string | null;
  plan: 'monthly' | 'quarterly' | 'yearly';
  installationDate: string | null;
  installationTime: string | null;
}

export const INITIAL_STATE: SignupState = {
  step: 1,
  account: {
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    email: '',
    phone: '',
  },
  property: {
    name: '',
    type: 'Commercial',
    address: '',
    country: 'United States',
    timezone: 'UTC-5 (EST)',
    zones: [],
  },
  monitoring: {
    parking: true,
    safety: true,
    maintenance: false,
  },
  towPartner: null,
  plan: 'yearly',
  installationDate: null,
  installationTime: null,
};
