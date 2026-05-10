import { Request, Response } from 'express';
import PatrimonioService from '../services/PatrimonioService';

class PatrimonioController {
  // POST: /patrimonios
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novoPatrimonio = await PatrimonioService.createPatrimonio(req.body);
      return res.status(201).json(novoPatrimonio);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET: /patrimonios
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const patrimonios = await PatrimonioService.getAllPatrimonios();
      return res.status(200).json(patrimonios);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET: /patrimonios/:id
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const patrimonio = await PatrimonioService.getPatrimonioById(id);
      
      if (!patrimonio) {
        return res.status(404).json({ error: "Patrimônio não encontrado" });
      }
      
      return res.status(200).json(patrimonio);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT: /patrimonios/:id
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const patrimonioAtualizado = await PatrimonioService.updatePatrimonio(id, req.body);
      return res.status(200).json(patrimonioAtualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE: /patrimonios/:id
  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      await PatrimonioService.deletePatrimonio(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new PatrimonioController();