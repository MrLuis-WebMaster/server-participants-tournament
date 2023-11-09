import { Test, TestingModule } from '@nestjs/testing';
import { TournamentParticipant } from './tournament-participant';

describe('TournamentParticipant', () => {
  let provider: TournamentParticipant;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentParticipant],
    }).compile();

    provider = module.get<TournamentParticipant>(TournamentParticipant);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
