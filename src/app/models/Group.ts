import {QualityStatementData} from './QualityStatement';

export class Group {
  constructor(
    public GroupID: string,
    public SectionID: string,
    public GroupName: string,
    public QualityStatements: QualityStatementData[]
  ) {}
}
