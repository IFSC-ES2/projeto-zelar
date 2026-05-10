import { Request, Response } from 'express';
import TipoMaterialService from '../services/TipoMaterialService';

class TipoMaterialController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novoTipo = await TipoMaterialService.createTipoMaterial(req.body);
      return res.status(201).json(novoTipo);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const tipos = await TipoMaterialService.getAllTiposMaterial();
      return res.status(200).json(tipos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const tipo = await TipoMaterialService.getTipoMaterialById(id);
      
      if (!tipo) {
        return res.status(404).json({ error: "Tipo de material não encontrado" });
      }
      
      return res.status(200).json(tipo);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const tipoAtualizado = await TipoMaterialService.updateTipoMaterial(id, req.body);
      return res.status(200).json(tipoAtualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      await TipoMaterialService.deleteTipoMaterial(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new TipoMaterialController();