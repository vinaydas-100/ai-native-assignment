export interface SpeedDialAction {
  id: string;
  label: string;
  phoneNumber: string;
  icon: string;
}

export const SPEED_DIAL_ACTIONS: SpeedDialAction[] = [
  { id: '1', label: 'Police', phoneNumber: '100', icon: 'shield' },
  { id: '2', label: 'Women Helpline', phoneNumber: '1091', icon: 'phone' },
  { id: '3', label: 'Custom Emergency', phoneNumber: '', icon: 'star' },
];
