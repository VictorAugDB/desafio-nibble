import { v4 as uuid } from 'uuid';

import Client from '@models/Client';
import ICreateClientDTO from 'dtos/ICreateClientDTO';

class FakeClientsRepository {
  private clients: Client[] = [];

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, { id: uuid() }, clientData);

    this.clients.push(client);

    return client;
  }
}

export default FakeClientsRepository;
