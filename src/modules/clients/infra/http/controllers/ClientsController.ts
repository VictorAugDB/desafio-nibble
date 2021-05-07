import { Request, Response } from 'express';
import CreateClientService from 'modules/clients/services/CreateClientService';
import DeleteClientByIdService from '@modules/clients/services/DeleteClientByIdService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import { orderBy } from 'lodash';
import { container } from 'tsyringe';
import FindAllClientsService from '@modules/clients/services/FindAllClientsService';
import FindClientsWithPaginationService from '@modules/clients/services/FindClientsWithPaginationService';

export default class ClientsController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { take, page } = request.query;

    if (take && page) {
      const nextSkip = (Number(page) - 1) * Number(take);

      const findClients = container.resolve(FindClientsWithPaginationService);

      const [clients, count] = await findClients.execute({
        take: Number(take),
        skip: nextSkip,
      });

      const orderedClients = orderBy(
        clients,
        client => client.updated_at,
        'desc',
      );

      return response.json({ clients: orderedClients, count });
    }
    const findClients = container.resolve(FindAllClientsService);

    const clients = await findClients.execute();

    const orderedClients = orderBy(
      clients,
      client => client.updated_at,
      'desc',
    );

    return response.json(orderedClients);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, telephone, email, addresses } = request.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      name,
      cpf,
      telephone,
      email,
      addresses,
    });
    return response.json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, cpf, telephone, email } = request.body;

    const updateClient = container.resolve(UpdateClientService);

    const client = await updateClient.execute({
      id,
      name,
      cpf,
      telephone,
      email,
    });
    return response.json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteClient = container.resolve(DeleteClientByIdService);

    await deleteClient.execute(String(id));
    return response.status(204).send();
  }
}
