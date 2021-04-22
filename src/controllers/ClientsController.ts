import Client from '@models/Client';
import { Request, Response } from 'express';
import CreateClientService from '@services/Clients/CreateClientService';
import DeleteClientByIdService from '@services/Clients/DeleteClientByIdService';
import UpdateClientService from '@services/Clients/UpdateClientService';
import { getRepository } from 'typeorm';

export default class ClientsController {
  public async find(request: Request, response: Response): Promise<Response> {
    const clientsRepository = getRepository(Client);
    const client = await clientsRepository.find();

    return response.json(client);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, cpf, telephone, email, addresses } = request.body;

      const createClient = new CreateClientService();

      const client = await createClient.execute({
        name,
        cpf,
        telephone,
        email,
        addresses,
      });
      return response.json(client);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id, name, cpf, telephone, email } = request.body;

      const updateClient = new UpdateClientService();

      const client = await updateClient.execute({
        id,
        name,
        cpf,
        telephone,
        email,
      });
      return response.json(client);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.query;

      const deleteClient = new DeleteClientByIdService();

      await deleteClient.execute(String(id));
      return response.status(204).send();
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
}
