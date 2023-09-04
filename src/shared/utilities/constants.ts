export const VESSEL_SERVICE_PORT = 9005;

export const KAFKA_BROKER_ADDRESS = 'localhost:9092';
export const KAFKA_GROUP_ID = 'vessel-service';

export enum PERMISSION {
  CREATE_USER = '1',
  READ_USER = '2',
  UPDATE_USER = '3',
  DELETE_USER = '4',
  CREATE_ROLE = '5',
  READ_ROLE = '6',
  UPDATE_ROLE = '7',
  DELETE_ROLE = '8',
  READ_PERMISSION = '9',
  CREATE_VESSEL = '10',
  READ_VESSEL = '11',
  UPDATE_VESSEL = '12',
  DELETE_VESSEL = '13',
}

export enum MODULE {
  VESSEL = 'vessel',
}

export enum ERROR {
  VESSEL_CODE_HAS_BEEN_USED = 'Vessel code has been used!',
  VESSEL_NOT_FOUND = 'Vessel not found!',
}

export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
