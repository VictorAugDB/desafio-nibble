import { EntityRepository, getRepository, Repository } from 'typeorm';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@EntityRepository(Client)
export class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async findById(client_id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { id: client_id },
    });

    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { email },
    });

    return client;
  }

  public async create(clientData: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      name: clientData.name,
      cpf: clientData.cpf,
      email: clientData.email,
      telephone: clientData.telephone,
    });

    await this.ormRepository.save(client);

    return client;
  }

  public async find(): Promise<Client[]> {
    const clients = await this.ormRepository.find();

    return clients;
  }

  public async findAndCount(
    skip: number,
    take: number,
  ): Promise<[Client[], number]> {
    const [clients, count] = await this.ormRepository.findAndCount({
      skip,
      take,
    });

    return [clients, count];
  }

  public async save(client: Client): Promise<Client> {
    await this.ormRepository.save(client);

    return client;
  }

  public async remove(client: Client): Promise<void> {
    await this.ormRepository.remove(client);
  }
}
