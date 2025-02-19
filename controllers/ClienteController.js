import { validarCliente, validarParcialCliente } from "../helpers/zod.js";

export class ClienteController {
  constructor(modelo) {
    this.modelo = modelo;
  }

  getAll = async (request, response) => {
    response.json(await this.modelo.getAll());
  };

  getOneByID = async (request, response) => {
    const id = request.params.id;
    const cliente = await this.modelo.getOneByID(id);
    if (cliente) {
      response.json(cliente);
    } else {
      response.status(400).end();
    }
  };

  delete = async (request, response) => {
    const id = request.params.id;
    const clientesDevolver = await this.modelo.delete(id);
    if (clientesDevolver) {
      response.json(clientesDevolver);
    } else {
      response.status(400).end();
    }
  };

  create = async (request, response) => {
    const cliente = validarCliente(request.body);

    if (!cliente.success) {
      return response.status(400).json('Validación de datos es Incorrecta');
    }

    const nuevoCliente = await this.modelo.create(cliente.data);
    response.json(nuevoCliente);
  };

  update = async (request, response) => {
    const id = request.params.id;
    const clienteValidado = validarParcialCliente(request.body);

    if (!clienteValidado.success) {
      return response.status(400).json('Validación de datos es Incorrecta');
    }

    const nuevoCliente = await this.modelo.update(id, clienteValidado.data);
    response.json(nuevoCliente);
  };
}