export default interface ICreateAddressDTO {
  cep: string;
  state: string;
  city: string;
  district: string;
  road: string;
  number: string;
  complement: string;
  type: string;
  is_primary_address: string;
}
