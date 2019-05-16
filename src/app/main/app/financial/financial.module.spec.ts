import { FinancialModule } from './financial.module';

describe('FinancialModule', () => {
  let financialModule: FinancialModule;

  beforeEach(() => {
    financialModule = new FinancialModule();
  });

  it('should create an instance', () => {
    expect(financialModule).toBeTruthy();
  });
});
