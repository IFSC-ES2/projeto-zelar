import { Request, Response } from 'express';
import EstadoItemService from '../services/EstadoItemService';

class EstadoItemController {
  // POST: /estados-item
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novoEstado = await EstadoItemService.createEstadoItem(req.body);
      return res.status(201).json(novoEstado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET: /estados-item
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const estados = await EstadoItemService.getAllEstadosItem();
      return res.status(200).json(estados);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET: /estados-item/:id
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const estado = await EstadoItemService.getEstadoItemById(id);
      
      if (!estado) {
        return res.status(404).json({ error: "Estado do item não encontrado" });
      }
      
      return res.status(200).json(estado);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT: /estados-item/:id
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const estadoAtualizado = await EstadoItemService.updateEstadoItem(id, req.body);
      return res.status(200).json(estadoAtualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE: /estados-item/:id
  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      await EstadoItemService.deleteEstadoItem(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new EstadoItemController();