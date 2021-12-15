import { MovieEntity } from './../movies/models/movie.entity';
import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [FavouriteService],
  controllers: [FavouriteController],
})
export class FavouriteModule {}
