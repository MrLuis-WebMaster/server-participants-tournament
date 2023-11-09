export class ParticipantEmailtDto {
  readonly fullName: string;
  readonly email: string;
  readonly userName: string;
  readonly dateTime: Date;
  readonly game: string;
  readonly name: string;
  readonly rules: string;
}
export class ParticipantEmailInvitationtDto extends ParticipantEmailtDto {
  readonly idGame: string;
  readonly passwordGame: string;
  readonly urlInvitation: string;
  readonly game: string;
  readonly name: string;
}
