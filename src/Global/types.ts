export interface PlayerType {
  id?: string;
  firstName: string;
  birthDate?: string;
  coach?: string[];
  category: number;
  phone: string;
  secondName: string;
  profileImg?: string;
  team?: string;
}

export interface UserType {
  id?: string;
  email?: string;
  firstName?: string;
  secondName: string;
  coachId: string;
  coachEmail: string;
  gender?: 'male' | 'female';
  municipio?: string;
  phone?: string;
  photoURL?: string;
  profileImg?: string;
  provincia?: string;
  role?: Roles;
  token?: string;
  loggedIn: boolean;
}

export interface SessionType {
  id: string;
  club: string;
  coachId: string;
  color: 'red' | 'blue' | 'yellow';
  date: number;
  description: string;
  endTime: number;
  playersEmail: string[];
  players: PlayerType[];
  internalId: string;
  notes: string;
  startTime: number;
  title: string;
  weeK: number[];
}

export interface MatchType {
  id: string;
  category: number;
  club: number;
  coachId: string;
  date: string;
  owner: string;
  game: GameType;
  round: number;
  statistics: any;
  playersEmail: string[];
  playersId: string[];
  sex: 'male' | 'female';
  state: 'finished' | 'live';
  tournamentName: string;
  t1: any;
  t2: any;
}

interface PlayersStats {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
}

export interface MatchStatistic {
  t1Br: number;
  t2Br: number;
  t1GP: number;
  t2GP: number;
  t1Tw: number;
  t2Tw: number;
  t1Tnf: number;
  t2Tnf: number;
  t1Tef: number;
  t2Tef: number;
  t1Tv: number;
  t2Tv: number;
  t1Tf: number;
  t2Tf: number;
  t1TBp: number;
  t2TBp: number;
  t1TBj: number;
  t2TBj: number;
  t1Tsm: number;
  t2Tsm: number;
  t1Tgl: number;
  t2Tgl: number;
  t1Tx3: number;
  t2Tx3: number;
  t1Tx4: number;
  t2Tx4: number;
  totalPoints: number;
  totalGoldPoints: number;
  totalWPerPlayer: PlayersStats;
  totalEFPerPlayer: PlayersStats;
  totalNFPerPlayer: PlayersStats;
  totalT1ConsecutiveWon: number;
  totalT2ConsecutiveWon: number;
  totalT1PointsWins: number;
  totalT2PointsWins: number;
}

export interface GameType {
  breakpoint: string;
  service: string;
  set: number;
  team1: number;
  team2: number;
  s1t1: number;
  s1t2: number;
  s2t1: number;
  s2t2: number;
  s3t1: number;
  s3t2: number;
  winSetTeam1: number;
  winSetTeam2: number;
}

export enum Roles {
  COACH = 'coach',
  PLAYER = 'player',
  ADMIN = 'admin',
}
