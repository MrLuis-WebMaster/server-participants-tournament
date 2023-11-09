export class TournamentDto {
  readonly name: string;
  readonly game: string;
  readonly format: string;
  readonly dateTime: Date;
  readonly description: string;
  readonly entryFee: number;
  readonly prizes: string;
  readonly rules: string;
  readonly bannerLink: string;
  readonly status: 'Open' | 'Closed' | 'Finished';
  readonly maxParticipants: number;
  readonly livestreamLink: string;
  readonly emailOrganizer: string;
  readonly phoneOrganizer: string;
  readonly nameOrganizer: string;
}
