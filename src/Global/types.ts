export interface PlayerType {
  id?: string;
  firstName: string;
  birthDate?: string;
  coach?: string[];
  category: number;
  phone: string;
  secondName?: string;
  profileImg?: string;
  team?: string;
}

export interface UserType {
  id?: string;
  email?: string;
  firstName?: string;
  secondName: string;
  gender?: 'male' | 'female';
  municipio?: string;
  phone?: string;
  photoURL?: string;
  profileImg?: string;
  provincia?: string;
  role?: 'player' | 'coach';
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
