import {Group} from './Group';

export class Section {
  constructor(
    public SectionID: string,
    public SectionName: string,
    public Groups: Group[]
  ){}
}
