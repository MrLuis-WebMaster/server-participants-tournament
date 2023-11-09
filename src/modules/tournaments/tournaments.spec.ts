import { Test, TestingModule } from '@nestjs/testing';
import { Tournaments } from './tournaments';

describe('Tournaments', () => {
  let provider: Tournaments;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Tournaments],
    }).compile();

    provider = module.get<Tournaments>(Tournaments);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
