import { Participant } from './participants.entity';
import { PARTICIPANT_REPOSITORY } from '../../core/constants';

export const participantsProviders = [
  {
    provide: PARTICIPANT_REPOSITORY,
    useValue: Participant,
  },
];
