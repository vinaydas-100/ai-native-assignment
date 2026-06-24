export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SafetyCategory {
  id: string;
  name: string;
  tips: SafetyTip[];
}

export const SAFETY_CATEGORIES: SafetyCategory[] = [
  {
    id: '1',
    name: 'Travel Safety',
    tips: [
      {
        id: 't1',
        title: 'Share your itinerary',
        description:
          'Always share your travel plans with a trusted contact.',
        icon: 'map',
      },
      {
        id: 't2',
        title: 'Stay aware of surroundings',
        description:
          'Keep an eye on your environment, especially in unfamiliar places.',
        icon: 'eye',
      },
      {
        id: 't3',
        title: 'Use verified transport',
        description:
          'Only use verified and trusted transportation services.',
        icon: 'car',
      },
    ],
  },
  {
    id: '2',
    name: 'Workplace Safety',
    tips: [
      {
        id: 'w1',
        title: 'Know your rights',
        description:
          'Understand workplace harassment policies and reporting procedures.',
        icon: 'briefcase',
      },
      {
        id: 'w2',
        title: 'Document incidents',
        description:
          'Keep records of any inappropriate behavior or harassment.',
        icon: 'document',
      },
      {
        id: 'w3',
        title: 'Build a support network',
        description:
          'Connect with trusted colleagues and HR representatives.',
        icon: 'people',
      },
    ],
  },
  {
    id: '3',
    name: 'Online Safety',
    tips: [
      {
        id: 'o1',
        title: 'Protect personal information',
        description:
          'Never share personal details with strangers online.',
        icon: 'lock',
      },
      {
        id: 'o2',
        title: 'Use strong passwords',
        description:
          'Create unique passwords for different accounts and enable 2FA.',
        icon: 'key',
      },
      {
        id: 'o3',
        title: 'Be cautious with links',
        description:
          'Avoid clicking suspicious links from unknown senders.',
        icon: 'shield',
      },
    ],
  },
];
