import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentDto } from './dto/tournament.dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  async create(@Body() tournamentDto: TournamentDto) {
    return this.tournamentsService.create(tournamentDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('searchTerm') searchTerm: string = '',
  ) {
    return this.tournamentsService.findAll(
      Number(page),
      Number(pageSize),
      searchTerm,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @Get(':id/participants')
  async findOneAndParticipants(@Param('id') id: string) {
    return this.tournamentsService.findOneAndParticipants(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() tournamentDto: TournamentDto) {
    return this.tournamentsService.update(Number(id), tournamentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }

  @Get('status/:status')
  async findTournamentsByStatus(
    @Param('status') status: 'Open' | 'Closed' | 'Finished',
  ) {
    return this.tournamentsService.findTournamentsByStatus(status);
  }

  @Get('game/:game')
  async findTournamentsByGame(@Param('game') game: string) {
    return this.tournamentsService.findTournamentsByGame(game);
  }

  @Get('search')
  async searchTournamentsByTerm(@Query('searchTerm') searchTerm: string) {
    return this.tournamentsService.searchTournamentsByTerm(searchTerm);
  }
}
