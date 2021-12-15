import { MovieI } from './models/movie.interface';
import { Injectable, Logger, Param } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { AppController } from 'src/app.controller';
import { sortObjectsByProp } from 'src/utils/sortObjectsByProp';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(AppController.name);
  constructor(private httpService: HttpService) {}

  async getPopular(
    page: string,
    sort_by?: string,
    filter_by?: string,
  ): Promise<MovieI[]> {
    const response = await this.httpService.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=e293003a661a448ecfffc6780d32608a&page=${page}`,
    );

    const results = response.data.results;
    let sorted = results;
    if (sort_by === 'name_asc') {
      sorted = sortObjectsByProp(results, 'title');
    } else if (sort_by === 'name_desc') {
      sorted = sortObjectsByProp(results, 'title', false);
    } else if (sort_by === 'year_asc') {
      sorted = sortObjectsByProp(results, 'release_date');
    } else if (sort_by === 'year_desc') {
      sorted = sortObjectsByProp(results, 'release_date', false);
    }
    if (filter_by && filter_by !== '') {
      const filterType = filter_by.split('_')[0];
      const filterValue = filter_by.split('_')[1];
      let filtered = sorted;
      if (filterType === 'genre') {
        filtered = sorted.filter((movie) =>
          movie.genre_ids.includes(Number(filterValue)),
        );
      } else {
        filtered = sorted.filter((movie) => movie.release_date === filterValue);
      }
      sorted = filtered;
    }
    return { ...response.data, results: sorted, sortBy: sort_by };
  }

  async search(query: string): Promise<MovieI[]> {
    const response = await this.httpService.get(
      `https://api.themoviedb.org/3/search/movie?api_key=e293003a661a448ecfffc6780d32608a&query=${query}`,
    );
    return response.data;
  }
}
