import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

export interface IClientsRepository {
  create(clientData: ICreateClientDTO): Promise<Client>;
  findById(client_id: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  find(): Promise<Client[]>;
  findAndCount(skip: number, take: number): Promise<[Client[], number]>;
  save(client: Client): Promise<Client>;
  remove(client: Client): Promise<void>;
}
