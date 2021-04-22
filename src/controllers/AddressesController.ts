import Address from '@models/Address';
import { Request, Response } from 'express';
import CreateAddressService from '@services/Addresses/CreateAddressService';
import DeleteAddressByIdService from '@services/Addresses/DeleteAddressByIdService';
import UpdateAddressesService from '@services/Addresses/UpdateAddressesService';
import { getRepository } from 'typeorm';

export default class AddressesController {
  public async find(request: Request, response: Response): Promise<Response> {
    const addressesRepository = getRepository(Address);
    const address = await addressesRepository.find();

    return response.json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { client_id, addresses } = request.body;

      const createAddress = new CreateAddressService();

      const address = await createAddress.execute({
        client_id,
        addresses,
      });

      return response.json(address);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { addresses } = request.body;

      const updateAddress = new UpdateAddressesService();

      const address = await updateAddress.execute({
        addresses,
      });

      return response.json(address);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.query;

      const deleteAddress = new DeleteAddressByIdService();

      await deleteAddress.execute(String(id));

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
}
