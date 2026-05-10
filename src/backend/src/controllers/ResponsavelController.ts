import { Request, Response } from 'express';
import ResponsavelService from '../services/ResponsavelService';

class ResponsavelController {
  // POST: Cria um novo registro
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novoResponsavel = await ResponsavelService.createResponsavel(req.body);
      return res.status(201).json(novoResponsavel);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET: Lista todos os registros
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const responsaveis = await ResponsavelService.getAllResponsaveis();
      return res.status(200).json(responsaveis);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET: Busca por ID
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const responsavel = await ResponsavelService.getResponsavelById(id);
      
      if (!responsavel) {
        return res.status(404).json({ error: "Responsável não encontrado" });
      }

      return res.status(200).json(responsavel);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT: Atualiza um registro
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const responsavelAtualizado = await ResponsavelService.updateResponsavel(id, req.body);
      return res.status(200).json(responsavelAtualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE: Remove um registro
  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      await ResponsavelService.deleteResponsavel(id);
      return res.status(204).send(); // 204 No Content (sucesso sem corpo)
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

// Exporta uma instância da classe
export default new ResponsavelController();