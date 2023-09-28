export class ParticipantEmailtDto {
  readonly fullName: string;
  readonly email: string;
  readonly userName: string;
}
export class ParticipantEmailInvitationtDto extends ParticipantEmailtDto {
  readonly idGame: string;
  readonly passwordGame: string;
  readonly urlInvitation: string;
}
