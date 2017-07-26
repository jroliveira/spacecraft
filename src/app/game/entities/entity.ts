import { Configurable } from '../core/behaviors';

export interface Entity extends Configurable {
  readonly config: any;
}
