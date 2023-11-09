import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TournamentParticipantsService } from './tournament-participant.service';
import { RegisterParticipantDto } from './dto/tournament-participant.dto';

@Controller('tournament-participant')
export class TournamentParticipantController {
  constructor(
    private readonly tournamentParticipantsService: TournamentParticipantsService,
  ) {}
  @Post()
  async create(@Body() registerParticipantDto: RegisterParticipantDto) {
    return this.tournamentParticipantsService.registerParticipantInTournament(
      registerParticipantDto,
    );
  }
  @Delete(':tournamentId/:participantId')
  async delete(
    @Param('tournamentId') tournamentId: string,
    @Param('participantId') participantId: string,
  ) {
    return this.tournamentParticipantsService.removeParticipantFromTournament(
      Number(tournamentId),
      Number(participantId),
    );
  }
  @Put('is-paid/:tournamentId/:participantId')
  async markParticipantAsPaid(
    @Param('tournamentId') tournamentId: string,
    @Param('participantId') participantId: string,
  ) {
    return this.tournamentParticipantsService.markParticipantAsPaid(
      Number(tournamentId),
      Number(participantId),
    );
  }
  @Put(
    'change-tournament-participant/:newTournamentId/:oldTournamentId/:participantId',
  )
  async changeTournamentParticipant(
    @Param('newTournamentId') newTournamentId: string,
    @Param('oldTournamentId') oldTournamentId: string,
    @Param('participantId') participantId: string,
  ) {
    return this.tournamentParticipantsService.updateParticipantTournament(
      Number(oldTournamentId),
      Number(newTournamentId),
      Number(participantId),
    );
  }
}