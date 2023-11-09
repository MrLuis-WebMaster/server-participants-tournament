import { ParticipantDto } from 'src/modules/participants/dto/participant.dto';

export class RegisterParticipantDto {
  readonly tournamentId: number;
  readonly participantData: ParticipantDto;
}
