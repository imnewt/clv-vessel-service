import { Vessel } from '@domain/models/vessel.model';

describe('Vessel', () => {
  const vessel = new Vessel(
    '123',
    'VSL001',
    'Class A',
    'Engine Model 1',
    'Location 1',
    1000,
    500,
    2000,
    'CALL123',
    'REG001',
    'Phone123',
    'Fax456',
    'TLX789',
    'vessel@email.com',
    'Description',
    'PortCode',
    'ClassNumber',
    'BuilderName',
    'BuilderName',
    9.0,
    5.2,
    4.0,
    2.1,
    8000,
    9000,
    12000,
    10000,
    6000,
    5000,
    2000,
    1500,
    1500,
    'EngineType',
    'EngineType',
    20000,
    'RegistrationCountryCode',
    'BuilderCode',
    'CarrierCode',
    'FeederCode',
    'FeederCode',
    28.0,
    24.0,
    20,
    1500,
    1800,
    2000,
    2500,
    5,
    6,
    100,
    80,
    200,
    15000,
    2000,
    45.0,
    20,
    30,
    50,
    60,
    new Date(),
    'Deletion Office Code',
    'Builder Area Name',
    'Generator Maker Name',
    'Generator Type Description',
    'Generator Type Description',
    'Bow Thruster Maker Name',
    'Bow Thruster Type Description',
    'Generator Type Description',
    900,
    'Lloyd Number',
    'Generator Type Description',
    20,
    30,
    'Hull Number',
    new Date(),
    new Date(),
    new Date(),
    'Remarks',
    10,
    3000,
    20,
    'Marks',
    'Now',
    20,
    new Date('2022-12-31'),
    new Date(),
    new Date('2022-12-31'),
    new Date(),
    new Date('2022-12-31'),
    'Deletion Flag',
    new Date('2022-12-31'),
    'EAI Interface ID',
    new Date(),
    'String',
    new Date(),
    'Modified Owner Name',
    'Modified Alliance Vessel Code',
    new Date(),
    'MOL Legacy Vessel Code Content',
    'K-Line Legacy Vessel Code Content',
    'Legacy Company Code',
    'Code',
    'Some Missing String',
    'Test',
    'SomeMissingCode',
  );

  it('should create an instance of Vessel', () => {
    expect(vessel).toBeInstanceOf(Vessel);
  });

  it('should have correct values for properties', () => {
    expect(vessel.id).toBe('123');
    expect(vessel.vsl_cd).toBe('VSL001');
    expect(vessel.vsl_clss_flg).toBe('Class A');
    expect(vessel.vsl_eng_nm).toBe('Engine Model 1');
    expect(vessel.vsl_locl_nm).toBe('Location 1');
    expect(vessel.foil_capa).toBe(1000);
    expect(vessel.doil_capa).toBe(500);
    expect(vessel.frsh_wtr_capa).toBe(2000);
    expect(vessel.call_sgn_no).toBe('CALL123');
    // Remain for the rest of the properties
  });
});
