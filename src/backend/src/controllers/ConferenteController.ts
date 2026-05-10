import { Request, Response } from 'express';
import ConferenteService from '../services/ConferenteService';

class ConferenteController {
  // POST: /conferentes
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const novoConferente = await ConferenteService.createConferente(req.body);
      return res.status(201).json(novoConferente);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET: /conferentes
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const conferentes = await ConferenteService.getAllConferentes();
      return res.status(200).json(conferentes);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET: /conferentes/:id
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const conferente = await ConferenteService.getConferenteById(id);
      
      if (!conferente) {
        return res.status(404).json({ error: "Conferente não encontrado" });
      }
      
      return res.status(200).json(conferente);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT: /conferentes/:id
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const conferenteAtualizado = await ConferenteService.updateConferente(id, req.body);
      return res.status(200).json(conferenteAtualizado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE: /conferentes/:id
  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      await ConferenteService.deleteConferente(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new ConferenteController();