import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import DeleteAddressByIdService from '@modules/addresses/services/DeleteAddressByIdService';
import UpdateAddressesService from '@modules/addresses/services/UpdateAddressesService';
import FindAllAddressesService from '@modules/addresses/services/FindAllAddressesService';
import FindAddressByIdService from '@modules/addresses/services/FindAddressByIdService';

export default class AddressesController {
  public async find(request: Request, response: Response): Promise<Response> {
    const findAddresses = container.resolve(FindAllAddressesService);

    const addresses = await findAddresses.execute();

    return response.status(200).json(addresses);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const addressId = request.query.id;

    const findAddresses = container.resolve(FindAddressByIdService);

    const address = await findAddresses.execute(String(addressId));

    return response.status(200).json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { client_id, addresses } = request.body;

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute({
      client_id,
      addresses,
    });

    return response.json(address);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { addresses } = request.body;

    const updateAddress = container.resolve(UpdateAddressesService);

    const address = await updateAddress.execute({
      addresses,
    });

    return response.json(address);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteAddress = container.resolve(DeleteAddressByIdService);

    await deleteAddress.execute(String(id));

    return response.status(204).send();
  }
}
