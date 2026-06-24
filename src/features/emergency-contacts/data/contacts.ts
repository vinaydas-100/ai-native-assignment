export interface EmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  description: string;
  icon: string;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    name: 'Police',
    phoneNumber: '100',
    description: 'Emergency police helpline',
    icon: 'shield',
  },
  {
    id: '2',
    name: 'Women Helpline',
    phoneNumber: '1091',
    description: 'National Commission for Women',
    icon: 'phone',
  },
  {
    id: '3',
    name: 'Ambulance',
    phoneNumber: '102',
    description: 'Medical emergency services',
    icon: 'ambulance',
  },
  {
    id: '4',
    name: 'Fire Brigade',
    phoneNumber: '101',
    description: 'Fire emergency services',
    icon: 'fire',
  },
];
