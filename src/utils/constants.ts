export const WEDDING_DATA = {
  bride: {
    name: 'Hani',
    fullName: 'Hani Rahman',
    family: 'Daughter of Mr. & Mrs. Ahmed Rahman',
  },
  groom: {
    name: 'Saqib',
    fullName: 'Saqib Al-Mansoor',
    family: 'Son of Mr. & Mrs. Khalid Al-Mansoor',
  },
  weddingDate: new Date('2026-07-03T17:00:00'),
  nikahVenue: {
    name: 'A and A Convention Center',
    address: 'SH47, Shankar Pura, Mandya, Karnataka 571403',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.2555669046246!2d76.879634!3d12.5349927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bafa1e49bd2bad3%3A0xeff569098011dd61!2sA%20and%20A%20convention%20center!5e1!3m2!1sen!2sin!4v1780708056331!5m2!1sen!2sin',
    googleMapsLink: 'https://maps.app.goo.gl/F5L9W8gnBmn6EzfP8',
     date: '3 July 2026',
    phone: '+1234567890',
     time: '5:00 PM',
  },
   walimaVenue: {
    name: 'Royal function hall Kunigal',
    address: 'Nademavinapura, Kunigal, Karnataka 572130',
    googleMapsLink: 'https://maps.app.goo.gl/q6UZTQwXEYQAMmpq6',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.0588281670407!2d76.96035387321041!3d13.005574414136252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bafc555246904e3%3A0x81e7e628b2eb8b4d!2sRoyal%20function%20hall%20Kunigal!5e1!3m2!1sen!2sin!4v1781072520299!5m2!1sen!2sin',
    phone: '+1234567890',
    date: '5 July 2026',
    time: '1:00 PM',
  },
  events: [
    {
      id: 'haldi',
      title: 'Haldi Ceremony',
      arabic: 'الحناء',
      time: '7:00 PM',
      date: '2 July 2026',
      description:
        'A vibrant celebration where henna is applied to the bride, filled with joy, music, and blessings from loved ones.',
      icon: 'star',
    },
    {
      id: 'shukrana',
      title: 'Shukrana',
      arabic: 'شكرانة',
      time: '2:00 PM',
      date: '3 July 2026',
      description:
        'A moment of gratitude and prayers, celebrating the blessings bestowed upon the couple.',
      icon: 'hands',
    },
    {
      id: 'nikah',
      title: 'Nikah Ceremony',
      arabic: 'عقد النكاح',
      time: '5:00 PM',
      date: '3 July 2026',
      description:
        'The sacred Islamic marriage contract, binding two souls in the presence of family and Allah.',
      icon: 'moon',
    },
    {
      id: 'walimah',
      title: 'Walimah',
      arabic: 'وليمة العرس',
      time: '1:00 PM',
      date: '5 July 2026',
      description:
        'The blessed Walimah feast — a Sunnah celebration of joy, gratitude, and togetherness.',
      icon: 'heart',
    },
  ],
  quote: {
    arabic:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
    translation:
      'And of His signs is that He created for you from yourselves mates that you may find tranquility in them.',
    reference: '— Quran 30:21',
  },
} as const;

export const COLORS = {
  gold: '#D4AF37',
  goldLight: '#F0D060',
  goldDark: '#A8860A',
  champagne: '#F5E6C8',
  ivory: '#FFF8F0',
  black: '#0D0D0D',
} as const;
