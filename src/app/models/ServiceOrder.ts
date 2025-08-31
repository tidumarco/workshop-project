import {ComponentClass} from './ComponentClass';

export class ServiceOrder {
  constructor(
    public ServiceOrderID: string,
    public ComponentTypeID: number,
    public Components: ComponentClass[],
  ){}
}
