import { Test, TestingModule } from '@nestjs/testing';
import { TournamentParticipantController } from './tournament-participant.controller';

describe('TournamentParticipantController', () => {
  let controller: TournamentParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentParticipantController],
    }).compile();

    controller = module.get<TournamentParticipantController>(
      TournamentParticipantController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
