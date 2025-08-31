export class Outcome {
  constructor(
    public OutcomeTypeID: string,
    public QualityStatementID: string,
    public Flag?: boolean,
    public FreeText?: string,
    public Number?: number,
    public Picture?: string
  ) {}
}
