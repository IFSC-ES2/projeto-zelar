import { Request, Response } from 'express';
import AmbienteService from '../services/AmbienteService';

class AmbienteController {
  // POST: /ambientes
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novoAmbiente = await AmbienteService.createAmbiente(req.body);
      return res.status(201).json(novoAmbiente);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET: /ambientes
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const ambientes = await AmbienteService.getAllAmbientes();
      return res.status(200).json(ambientes);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET: /ambientes/:id
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const ambiente = await AmbienteService.getAmbienteById(id);
      
      if (!ambiente) {
        return res.status(404).json({ error: "Ambiente não encontrado" });
      }
      
      return res.status(200).json(ambiente);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT: /ambientes/:id
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const ambienteAtualizado = await AmbienteService.updateAmbiente(id, req.body);
      return res.status(200).json(ambienteAtualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE: /ambientes/:id
  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      await AmbienteService.deleteAmbiente(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new AmbienteController();