import { formatDate, slugify } from '@/utils/helpers';
import type { Article, Match, Team, Player, Category, Poll } from '@/types';

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Raja Casablanca Secures Dramatic Win in Moroccan Derby',
    slug: 'raja-casablanca-secures-dramatic-win-in-moroccan-derby',
    content: `Raja Casablanca secured a dramatic 2-1 victory against arch-rivals Wydad AC in the latest edition of the Moroccan derby at Stade Mohammed V on Sunday evening.

In a match filled with intensity and passion, Raja came from behind to claim all three points thanks to a stoppage-time winner from captain Mohsine Moutaouali.

Wydad had taken the lead in the 34th minute through Ayoub El Kaabi, who headed home from close range following a well-delivered corner. The first half ended with Wydad in control, but Raja came out fighting after the break.

The Green Eagles equalized in the 67th minute when Soufiane Rahimi converted from the penalty spot after a handball in the box. As the match seemed headed for a draw, Moutaouali struck in the 93rd minute with a spectacular long-range effort that sent the Raja fans into ecstasy.

"This victory means everything to our fans," said Raja coach Jamal Sellami after the match. "The players showed incredible character to come back and win in such a dramatic fashion."

The win moves Raja to within two points of league leaders RS Berkane, while Wydad remains in third place, five points off the pace.`,
    excerpt: 'Raja Casablanca secured a dramatic 2-1 victory against arch-rivals Wydad AC in the latest edition of the Moroccan derby.',
    author: 'Mohammed Alami',
    publishDate: '2025-03-15T18:30:00Z',
    categories: ['Moroccan Football', 'Botola Pro'],
    tags: ['Raja Casablanca', 'Wydad AC', 'Moroccan Derby'],
    featuredImage: 'https://example.com/images/raja-wydad-derby.jpg',
    isFeatured: true,
    viewCount: 3450
  },
  {
    id: '2',
    title: 'Morocco\'s Atlas Lions Announce Squad for World Cup Qualifiers',
    slug: 'morocco-atlas-lions-announce-squad-for-world-cup-qualifiers',
    content: `Morocco national team coach Walid Regragui has announced a 26-man squad for the upcoming 2026 FIFA World Cup qualifiers against Tanzania and Congo.

The Atlas Lions, who made history by reaching the semi-finals of the 2022 World Cup in Qatar, will begin their qualification campaign for the 2026 tournament with these two crucial matches.

The squad features established stars including PSG's Achraf Hakimi, Bayern Munich's Noussair Mazraoui, and Manchester United's Sofyan Amrabat. There are also call-ups for in-form Sevilla striker Youssef En-Nesyri and Chelsea's Hakim Ziyech.

Regragui has included three uncapped players: Eintracht Frankfurt midfielder Ilias Akhomach, Lens defender Abdelkader Abqar, and Monaco goalkeeper Salim Ben Seghir.

"We have a good mix of experience and young talent," said Regragui at the press conference in Rabat. "Our goal is clear - we want to qualify for the World Cup and build on our success in Qatar."

Morocco will face Tanzania on March 20 in Dar es Salaam before hosting Congo on March 24 at the Stade Mohammed V in Casablanca.`,
    excerpt: 'Morocco national team coach Walid Regragui has announced a 26-man squad for the upcoming 2026 FIFA World Cup qualifiers.',
    author: 'Fatima Zahra',
    publishDate: '2025-03-12T14:15:00Z',
    categories: ['Moroccan Football', 'International'],
    tags: ['Morocco', 'World Cup Qualifiers', 'Walid Regragui'],
    featuredImage: 'https://example.com/images/morocco-national-team.jpg',
    isFeatured: true,
    viewCount: 5230
  },
  {
    id: '3',
    title: 'Achraf Hakimi Named African Footballer of the Year',
    slug: 'achraf-hakimi-named-african-footballer-of-the-year',
    content: `Paris Saint-Germain and Morocco star Achraf Hakimi has been named African Footballer of the Year at the CAF Awards ceremony held in Marrakech on Tuesday night.

The 26-year-old right-back beat fellow nominees Victor Osimhen of Nigeria and Mohamed Salah of Egypt to claim the prestigious award for the first time in his career.

Hakimi enjoyed an outstanding year, helping PSG win the Ligue 1 title and reach the Champions League semi-finals. For the national team, he was instrumental in Morocco's successful qualification for the Africa Cup of Nations, where they are among the favorites.

"This award is a dream come true," said an emotional Hakimi during his acceptance speech. "I want to thank my family, my teammates at PSG and the national team, and all Moroccans around the world who have supported me."

The ceremony also saw Morocco's Walid Regragui named Coach of the Year, while Moroccan club RS Berkane was recognized as Club of the Year after winning the CAF Confederation Cup.

Morocco's Yasmine Zouhir won the Women's Player of the Year award, completing a clean sweep of the major awards for Moroccan football.`,
    excerpt: 'Paris Saint-Germain and Morocco star Achraf Hakimi has been named African Footballer of the Year at the CAF Awards ceremony.',
    author: 'Omar Benali',
    publishDate: '2025-03-10T22:45:00Z',
    categories: ['Moroccan Football', 'International'],
    tags: ['Achraf Hakimi', 'CAF Awards', 'PSG'],
    featuredImage: 'https://example.com/images/hakimi-award.jpg',
    isFeatured: true,
    viewCount: 6120
  },
  {
    id: '4',
    title: 'RS Berkane Extends Lead in Botola Pro with Convincing Win',
    slug: 'rs-berkane-extends-lead-in-botola-pro-with-convincing-win',
    content: `RS Berkane extended their lead at the top of the Botola Pro table with a convincing 3-0 win over FUS Rabat on Saturday evening.

The Orange Boys dominated from start to finish at the Stade Municipal de Berkane, with goals from Bakr El Helali, Hamza El Moussaoui, and Larbi Naji securing all three points.

El Helali opened the scoring in the 23rd minute with a powerful header from a corner, before El Moussaoui doubled the advantage just before halftime with a well-placed shot from the edge of the box. Naji completed the scoring in the 75th minute, converting from the penalty spot after a foul on Youssef Zghoudi.

The win gives RS Berkane a five-point cushion at the top of the table over second-placed Raja Casablanca, who have a game in hand.

"We're not getting carried away," said RS Berkane coach Florent Ibenge. "There's still a long way to go in the season, but we're pleased with our consistency so far."

FUS Rabat remains in mid-table, now without a win in their last four matches.`,
    excerpt: 'RS Berkane extended their lead at the top of the Botola Pro table with a convincing 3-0 win over FUS Rabat.',
    author: 'Karim Bencherki',
    publishDate: '2025-03-08T21:00:00Z',
    categories: ['Moroccan Football', 'Botola Pro'],
    tags: ['RS Berkane', 'FUS Rabat', 'Botola Pro'],
    featuredImage: 'https://example.com/images/rs-berkane-match.jpg',
    isFeatured: false,
    viewCount: 2180
  },
  {
    id: '5',
    title: 'Moroccan Youngster Signs for Borussia Dortmund',
    slug: 'moroccan-youngster-signs-for-borussia-dortmund',
    content: `Moroccan teenage sensation Ilias Akhomach has completed a move to Borussia Dortmund from Sevilla for a reported fee of €15 million.

The 19-year-old winger, who has been compared to his compatriot Hakim Ziyech, has signed a five-year contract with the German giants after impressing scouts with his performances in La Liga.

Akhomach, who was born in Tangier but moved to Spain at a young age, developed through Sevilla's youth academy before making his first-team debut last season. He scored seven goals and provided nine assists in 28 appearances for the Andalusian club.

"Joining Borussia Dortmund is an incredible opportunity for me," said Akhomach at his unveiling. "The club has a great history of developing young players, and I hope to follow in the footsteps of players like Jadon Sancho and Jude Bellingham."

Dortmund's Sporting Director Sebastian Kehl expressed his delight at securing the Moroccan talent: "Ilias is one of the most exciting young players in Europe. He has exceptional technical ability, pace, and creativity. We believe he has a bright future ahead of him."

Akhomach is expected to join up with his new teammates for pre-season training next month.`,
    excerpt: 'Moroccan teenage sensation Ilias Akhomach has completed a move to Borussia Dortmund from Sevilla for a reported fee of €15 million.',
    author: 'Nadia Tazi',
    publishDate: '2025-03-05T16:20:00Z',
    categories: ['Moroccan Football', 'Transfers', 'International'],
    tags: ['Ilias Akhomach', 'Borussia Dortmund', 'Transfers'],
    featuredImage: 'https://example.com/images/akhomach-dortmund.jpg',
    isFeatured: false,
    viewCount: 4750
  },
  {
    id: '6',
    title: 'Wydad AC Appoints New Technical Director',
    slug: 'wydad-ac-appoints-new-technical-director',
    content: `Wydad Athletic Club has appointed former Morocco international Noureddine Naybet as the club's new Technical Director, the Casablanca giants announced on Monday.

Naybet, who enjoyed a distinguished playing career with Deportivo La Coruña in Spain and Tottenham Hotspur in England, joins Wydad after serving as an assistant coach with the Moroccan national team.

The 50-year-old will oversee all technical aspects of the club, including first-team affairs, youth development, and recruitment strategy.

"Wydad is one of the greatest clubs in Africa, and I'm honored to take on this responsibility," said Naybet at a press conference held at the club's headquarters. "My goal is to help build a sustainable model that will ensure continued success both domestically and in continental competitions."

Wydad President Said Naciri expressed his satisfaction with the appointment: "Noureddine brings a wealth of experience and knowledge to our club. His vision aligns perfectly with our ambitions to remain at the forefront of African football."

Naybet's first task will be to work with head coach Mehdi Nafti to strengthen the squad during the upcoming transfer window.`,
    excerpt: 'Wydad Athletic Club has appointed former Morocco international Noureddine Naybet as the club\'s new Technical Director.',
    author: 'Hassan Elbaz',
    publishDate: '2025-03-03T11:30:00Z',
    categories: ['Moroccan Football', 'Botola Pro'],
    tags: ['Wydad AC', 'Noureddine Naybet', 'Technical Director'],
    featuredImage: 'https://example.com/images/naybet-wydad.jpg',
    isFeatured: false,
    viewCount: 1890
  }
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Raja Casablanca',
    shortName: 'RCA',
    logo: 'https://example.com/logos/raja.png',
    country: 'Morocco',
    founded: 1949,
    stadium: 'Stade Mohammed V',
    coach: 'Jamal Sellami'
  },
  {
    id: '2',
    name: 'Wydad AC',
    shortName: 'WAC',
    logo: 'https://example.com/logos/wydad.png',
    country: 'Morocco',
    founded: 1937,
    stadium: 'Stade Mohammed V',
    coach: 'Mehdi Nafti'
  },
  {
    id: '3',
    name: 'RS Berkane',
    shortName: 'RSB',
    logo: 'https://example.com/logos/berkane.png',
    country: 'Morocco',
    founded: 1938,
    stadium: 'Stade Municipal de Berkane',
    coach: 'Florent Ibenge'
  },
  {
    id: '4',
    name: 'FUS Rabat',
    shortName: 'FUS',
    logo: 'https://example.com/logos/fus.png',
    country: 'Morocco',
    founded: 1946,
    stadium: 'Stade de FUS',
    coach: 'Jamal Sellami'
  },
  {
    id: '5',
    name: 'AS FAR',
    shortName: 'FAR',
    logo: 'https://example.com/logos/far.png',
    country: 'Morocco',
    founded: 1958,
    stadium: 'Prince Moulay Abdellah Stadium',
    coach: 'Fernando Da Cruz'
  }
];

// Mock Players
export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Mohsine Moutaouali',
    position: 'Midfielder',
    nationality: 'Morocco',
    birthDate: '1986-04-06',
    height: 176,
    weight: 72,
    teamId: '1', // Raja Casablanca
    jerseyNumber: 10,
    image: 'https://example.com/players/moutaouali.jpg'
  },
  {
    id: '2',
    name: 'Soufiane Rahimi',
    position: 'Forward',
    nationality: 'Morocco',
    birthDate: '1996-06-02',
    height: 178,
    weight: 70,
    teamId: '1', // Raja Casablanca
    jerseyNumber: 7,
    image: 'https://example.com/players/rahimi.jpg'
  },
  {
    id: '3',
    name: 'Ayoub El Kaabi',
    position: 'Forward',
    nationality: 'Morocco',
    birthDate: '1993-06-25',
    height: 182,
    weight: 76,
    teamId: '2', // Wydad AC
    jerseyNumber: 9,
    image: 'https://example.com/players/elkaabi.jpg'
  },
  {
    id: '4',
    name: 'Yahya Jabrane',
    position: 'Midfielder',
    nationality: 'Morocco',
    birthDate: '1991-06-18',
    height: 187,
    weight: 80,
    teamId: '2', // Wydad AC
    jerseyNumber: 8,
    image: 'https://example.com/players/jabrane.jpg'
  },
  {
    id: '5',
    name: 'Bakr El Helali',
    position: 'Forward',
    nationality: 'Morocco',
    birthDate: '1997-08-12',
    height: 175,
    weight: 68,
    teamId: '3', // RS Berkane
    jerseyNumber: 11,
    image: 'https://example.com/players/elhelali.jpg'
  }
];

// Mock Matches
export const mockMatches: Match[] = [
  {
    id: '1',
    date: '2025-03-15',
    time: '19:00',
    competition: 'Botola Pro',
    matchWeek: 22,
    homeTeam: {
      id: '1',
      name: 'Raja Casablanca',
      logo: 'https://example.com/logos/raja.png'
    },
    awayTeam: {
      id: '2',
      name: 'Wydad AC',
      logo: 'https://example.com/logos/wydad.png'
    },
    venue: 'Stade Mohammed V',
    status: 'completed',
    homeScore: 2,
    awayScore: 1,
    stats: {
      possession: {
        home: 48,
        away: 52
      },
      shots: {
        home: 14,
        away: 11
      },
      shotsOnTarget: {
        home: 6,
        away: 4
      },
      corners: {
        home: 5,
        away: 7
      },
      fouls: {
        home: 12,
        away: 14
      }
    }
  },
  {
    id: '2',
    date: '2025-03-08',
    time: '20:00',
    competition: 'Botola Pro',
    matchWeek: 21,
    homeTeam: {
      id: '3',
      name: 'RS Berkane',
      logo: 'https://example.com/logos/berkane.png'
    },
    awayTeam: {
      id: '4',
      name: 'FUS Rabat',
      logo: 'https://example.com/logos/fus.png'
    },
    venue: 'Stade Municipal de Berkane',
    status: 'completed',
    homeScore: 3,
    awayScore: 0,
    stats: {
      possession: {
        home: 60,
        away: 40
      },
      shots: {
        home: 18,
        away: 7
      },
      shotsOnTarget: {
        home: 9,
        away: 2
      },
      corners: {
        home: 8,
        away: 3
      },
      fouls: {
        home: 10,
        away: 15
      }
    }
  },
  {
    id: '3',
    date: '2025-03-22',
    time: '17:00',
    competition: 'Botola Pro',
    matchWeek: 23,
    homeTeam: {
      id: '5',
      name: 'AS FAR',
      logo: 'https://example.com/logos/far.png'
    },
    awayTeam: {
      id: '1',
      name: 'Raja Casablanca',
      logo: 'https://example.com/logos/raja.png'
    },
    venue: 'Prince Moulay Abdellah Stadium',
    status: 'scheduled',
  },
  {
    id: '4',
    date: '2025-03-22',
    time: '19:30',
    competition: 'Botola Pro',
    matchWeek: 23,
    homeTeam: {
      id: '2',
      name: 'Wydad AC',
      logo: 'https://example.com/logos/wydad.png'
    },
    awayTeam: {
      id: '3',
      name: 'RS Berkane',
      logo: 'https://example.com/logos/berkane.png'
    },
    venue: 'Stade Mohammed V',
    status: 'scheduled',
  },
  {
    id: '5',
    date: '2025-03-20',
    time: '16:00',
    competition: 'World Cup Qualifier',
    homeTeam: {
      id: '101',
      name: 'Tanzania',
      logo: 'https://example.com/logos/tanzania.png'
    },
    awayTeam: {
      id: '100',
      name: 'Morocco',
      logo: 'https://example.com/logos/morocco.png'
    },
    venue: 'Benjamin Mkapa Stadium',
    status: 'scheduled',
  },
  {
    id: '6',
    date: '2025-03-24',
    time: '20:00',
    competition: 'World Cup Qualifier',
    homeTeam: {
      id: '100',
      name: 'Morocco',
      logo: 'https://example.com/logos/morocco.png'
    },
    awayTeam: {
      id: '102',
      name: 'Congo',
      logo: 'https://example.com/logos/congo.png'
    },
    venue: 'Stade Mohammed V',
    status: 'scheduled',
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Moroccan Football',
    slug: 'moroccan-football',
    description: 'News and updates about Moroccan football leagues, teams, and players'
  },
  {
    id: '2',
    name: 'Botola Pro',
    slug: 'botola-pro',
    description: 'Coverage of the Moroccan Botola Pro league'
  },
  {
    id: '3',
    name: 'International',
    slug: 'international',
    description: 'International football news with a focus on Moroccan players abroad'
  },
  {
    id: '4',
    name: 'Transfers',
    slug: 'transfers',
    description: 'Transfer news and rumors'
  },
  {
    id: '5',
    name: 'Analysis',
    slug: 'analysis',
    description: 'In-depth analysis and tactical breakdowns'
  }
];

// Mock Polls
export const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'Who will win the Botola Pro this season?',
    options: [
      {
        id: '1',
        text: 'Raja Casablanca',
        votes: 1245
      },
      {
        id: '2',
        text: 'Wydad AC',
        votes: 1087
      },
      {
        id: '3',
        text: 'RS Berkane',
        votes: 1532
      },
      {
        id: '4',
        text: 'AS FAR',
        votes: 876
      },
      {
        id: '5',
        text: 'Other',
        votes: 324
      }
    ],
    totalVotes: 5064,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-04-01T00:00:00Z',
    isActive: true
  },
  {
    id: '2',
    question: 'Who is the best Moroccan player currently?',
    options: [
      {
        id: '1',
        text: 'Achraf Hakimi',
        votes: 2341
      },
      {
        id: '2',
        text: 'Hakim Ziyech',
        votes: 1876
      },
      {
        id: '3',
        text: 'Youssef En-Nesyri',
        votes: 1543
      },
      {
        id: '4',
        text: 'Sofyan Amrabat',
        votes: 1298
      },
      {
        id: '5',
        text: 'Noussair Mazraoui',
        votes: 987
      }
    ],
    totalVotes: 8045,
    startDate: '2025-02-15T00:00:00Z',
    endDate: '2025-03-15T00:00:00Z',
    isActive: false
  }
];
