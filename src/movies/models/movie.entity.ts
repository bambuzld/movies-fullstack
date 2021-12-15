import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @Column()
  adult: boolean;
  @Column()
  backdrop_path: string;
  @Column('int', { array: true, default: {} })
  genre_ids: number[];
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  original_language: string;
  @Column()
  original_title: string;
  @Column()
  overview: string;
  @Column('decimal')
  popularity: number;
  @Column()
  poster_path: string;
  @Column()
  release_date: string;
  @Column()
  title: string;
  @Column()
  video: boolean;
  @Column('decimal')
  vote_average: number;
  @Column()
  vote_count: number;
}
