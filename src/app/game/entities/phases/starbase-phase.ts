import { store } from '../../infra/data';

import { Phase } from './phase';

export class StarbasePhase extends Phase {
  constructor(readonly config: any) {
    super(config);
  }
}
