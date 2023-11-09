import { Tournament } from './tournaments.entity';
import { TOURNAMENT_REPOSITORY } from '../../core/constants';

export const tournamentsProviders = [
  {
    provide: TOURNAMENT_REPOSITORY,
    useValue: Tournament,
  },
];
