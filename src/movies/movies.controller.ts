import { Observable } from 'rxjs';
import { MoviesService } from './movies.service';
import { MovieI } from './models/movie.interface';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('popular')
  async getPopular(
    @Query('page') page: string,
    @Query('sort_by') sort_by: string,
    @Query('filter_by') filter_by: string,
  ): Promise<MovieI[]> {
    return await this.moviesService.getPopular(page, sort_by, filter_by);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(@Query('query') query: string): Promise<MovieI[]> {
    return await this.moviesService.search(query);
  }
}
