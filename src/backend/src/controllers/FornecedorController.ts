import { Request, Response } from 'express';
import FornecedorService from '../services/FornecedorService';

class FornecedorController {
  // POST: /fornecedores
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novoFornecedor = await FornecedorService.createFornecedor(req.body);
      return res.status(201).json(novoFornecedor);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET: /fornecedores
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const fornecedores = await FornecedorService.getAllFornecedores();
      return res.status(200).json(fornecedores);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET: /fornecedores/:id
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const fornecedor = await FornecedorService.getFornecedorById(id);
      
      if (!fornecedor) {
        return res.status(404).json({ error: "Fornecedor não encontrado" });
      }
      
      return res.status(200).json(fornecedor);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT: /fornecedores/:id
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const fornecedorAtualizado = await FornecedorService.updateFornecedor(id, req.body);
      return res.status(200).json(fornecedorAtualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE: /fornecedores/:id
  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      await FornecedorService.deleteFornecedor(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new FornecedorController();