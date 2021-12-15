import { MovieEntity } from './../movies/models/movie.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieI } from 'src/movies/models/movie.interface';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(MovieEntity)
    private favouritesRepository: Repository<MovieEntity>,
  ) {}

  async add(movie: MovieI): Promise<MovieI> {
    return await this.favouritesRepository.save(movie);
  }

  async findAll(): Promise<MovieI[]> {
    return await this.favouritesRepository.find();
  }

  async remove(movieId: number): Promise<any> {
    return await this.favouritesRepository.delete({ id: movieId });
  }
}
