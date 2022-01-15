export interface PlayerType {
  id?: string;
  firstName?: string;
  secondName?: string;
  profileImg?: string;
}

export interface GameType {
  service: string;
  pt1: number;
  pt2: number;
  s1t1: number;
  s1t2: number;
  s2t1: number;
  s2t2: number;
  s3t1: number;
  s3t2: number;
}
