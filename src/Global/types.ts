export interface PlayerType {
  id?: string;
  firstName: string;
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

export interface GameType {
  service: string;
  team1: number;
  team2: number;
  s1t1: number;
  s1t2: number;
  s2t1: number;
  s2t2: number;
  s3t1: number;
  s3t2: number;
}
