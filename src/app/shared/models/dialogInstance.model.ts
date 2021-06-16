import { Subject } from 'rxjs';

export interface DialogInstanceModel {
  afterClose$: Subject<any>;
}
