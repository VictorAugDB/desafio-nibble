import { v4 as uuid } from 'uuid';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import { IClientsRepository } from '../IClientsRepository';

export class FakeClientsRepository implements IClientsRepository {
  private clients: Client[] = [];

  public async findById(client_id: string): Promise<Client | undefined> {
    const findClient = this.clients.find(client => client.id === client_id);

    return findClient;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const findClient = this.clients.find(client => client.email === email);

    return findClient;
  }

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, {
      id: uuid(),
      name: clientData.name,
      telephone: clientData.telephone,
      cpf: clientData.cpf,
      email: clientData.email,
    });

    this.clients.push(client);

    return client;
  }

  public async find(): Promise<Client[]> {
    const clientsData = [...this.clients];

    return clientsData;
  }

  public async findAndCount(
    skip: number,
    take: number,
  ): Promise<[Client[], number]> {
    const clientsFiltered = this.clients.filter(
      (client, index) => index < take + skip && index + 1 > skip && client,
    );

    const clientsData = clientsFiltered.filter(
      (client, index) => index < take && client,
    );

    return [clientsData, this.clients.length];
  }

  public async save(client: Client): Promise<Client> {
    const findIndex = this.clients.findIndex(
      findClient => findClient.id === client.id,
    );

    this.clients[findIndex] = client;

    return client;
  }

  public async remove(client: Client): Promise<void> {
    this.clients.filter(filterClient => filterClient.id !== client.id);
  }
}
