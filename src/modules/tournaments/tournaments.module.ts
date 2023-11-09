import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { tournamentsProviders } from './tournaments.providers';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService, ...tournamentsProviders],
  exports: [TournamentsService, ...tournamentsProviders],
})
export class TournamentsModule {}
