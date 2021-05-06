import ICreateAddressDTO from './ICreateAddressDTO';

export default interface ICreateClientDTO {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  addresses: ICreateAddressDTO[];
}
