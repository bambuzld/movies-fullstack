import { PostFavouriteDto } from './dto/post-favourite.dto';
import { MovieI } from './../movies/models/movie.interface';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { FavouriteService } from './favourite.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';

@Controller('favourites')
export class FavouriteController {
  constructor(private favouriteService: FavouriteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async add(@Body() movie: PostFavouriteDto): Promise<any> {
    return await this.favouriteService.add(movie);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(): Promise<MovieI[]> {
    return await this.favouriteService.findAll();
  }

  @Delete('delete/:movieId')
  @UseGuards(JwtAuthGuard)
  async remove(@Param() params: any): Promise<any> {
    return await this.favouriteService.remove(Number(params.movieId));
  }
}
