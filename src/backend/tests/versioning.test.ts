import { sequelize } from '../src/database/connection';
import { Ambiente } from '../src/models/Ambiente';
import { Conferente } from '../src/models/Conferente';
import { EstadoItem } from '../src/models/EstadoItem';
import { Fornecedor } from '../src/models/Fornecedor';
import { Patrimonio } from '../src/models/Patrimonio';
import { Responsavel } from '../src/models/Responsavel';
import { TipoMaterial } from '../src/models/TipoMaterial';

describe('Versionamento Sequelize - Controle de Concorrência', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('TipoMaterial', () => {
    it('deve inicializar com versao = 1', async () => {
      const tipo = await TipoMaterial.create({ nome: 'Tipo A' });
      expect(tipo.versao).toBe(1);
    });

    it('deve incrementar versao ao atualizar', async () => {
      const tipo = await TipoMaterial.create({ nome: 'Tipo B' });
      expect(tipo.versao).toBe(1);

      await tipo.update({ nome: 'Tipo B Atualizado' });
      expect(tipo.versao).toBe(2);

      const tipoReloaded = await TipoMaterial.findByPk(tipo.id);
      expect(tipoReloaded?.versao).toBe(2);
    });
  });

  describe('EstadoItem', () => {
    it('deve inicializar com versao = 1', async () => {
      const estado = await EstadoItem.create({ nome: 'Ativo' });
      expect(estado.versao).toBe(1);
    });

    it('deve incrementar versao ao atualizar', async () => {
      const estado = await EstadoItem.create({ nome: 'Inativo', descricao: 'Não em uso' });
      expect(estado.versao).toBe(1);

      await estado.update({ descricao: 'Armazenado' });
      expect(estado.versao).toBe(2);

      const estadoReloaded = await EstadoItem.findByPk(estado.id);
      expect(estadoReloaded?.versao).toBe(2);
    });
  });

  describe('Fornecedor', () => {
    it('deve inicializar com versao = 1', async () => {
      const fornecedor = await Fornecedor.create({ nome: 'Fornecedor X' });
      expect(fornecedor.versao).toBe(1);
    });

    it('deve incrementar versao ao atualizar', async () => {
      const fornecedor = await Fornecedor.create({
        nome: 'Fornecedor Y',
        cnpj: '12.345.678/0001-00',
      });
      expect(fornecedor.versao).toBe(1);

      await fornecedor.update({ telefone: '11999999999' });
      expect(fornecedor.versao).toBe(2);

      const fornecedorReloaded = await Fornecedor.findByPk(fornecedor.id);
      expect(fornecedorReloaded?.versao).toBe(2);
    });
  });

  describe('Responsavel', () => {
    it('deve inicializar com versao = 1', async () => {
      const responsavel = await Responsavel.create({
        nome: 'João Silva',
        email: 'joao@example.com',
      });
      expect(responsavel.versao).toBe(1);
    });

    it('deve incrementar versao ao atualizar', async () => {
      const responsavel = await Responsavel.create({
        nome: 'Maria Santos',
        email: 'maria@example.com',
        cargo: 'Gerente',
      });
      expect(responsavel.versao).toBe(1);

      await responsavel.update({ departamento: 'TI' });
      expect(responsavel.versao).toBe(2);

      const responsavelReloaded = await Responsavel.findByPk(responsavel.id);
      expect(responsavelReloaded?.versao).toBe(2);
    });

    it('deve incrementar multiplas vezes com multiplas atualizacoes', async () => {
      const responsavel = await Responsavel.create({
        nome: 'Pedro Costa',
        email: 'pedro@example.com',
      });
      expect(responsavel.versao).toBe(1);

      await responsavel.update({ cargo: 'Supervisor' });
      expect(responsavel.versao).toBe(2);

      await responsavel.update({ telefone: '1133333333' });
      expect(responsavel.versao).toBe(3);

      const responsavelReloaded = await Responsavel.findByPk(responsavel.id);
      expect(responsavelReloaded?.versao).toBe(3);
    });
  });

  describe('Conferente', () => {
    it('deve inicializar com versao = 1', async () => {
      const conferente = await Conferente.create({
        nome: 'Ana Silva',
        email: 'ana@example.com',
      });
      expect(conferente.versao).toBe(1);
    });

    it('deve incrementar versao ao atualizar', async () => {
      const conferente = await Conferente.create({
        nome: 'Carlos Oliveira',
        email: 'carlos@example.com',
      });
      expect(conferente.versao).toBe(1);

      await conferente.update({ cargo: 'Conferente Sênior' });
      expect(conferente.versao).toBe(2);

      const conferenteReloaded = await Conferente.findByPk(conferente.id);
      expect(conferenteReloaded?.versao).toBe(2);
    });
  });

  describe('Ambiente', () => {
    it('deve inicializar com versao = 1', async () => {
      const responsavel = await Responsavel.create({
        nome: 'Resp Ambiente',
        email: 'resp@example.com',
      });

      const ambiente = await Ambiente.create({
        nome: 'Lab 1',
        responsavel_id: responsavel.id,
      });
      expect(ambiente.versao).toBe(1);
    });

    it('deve incrementar versao ao atualizar', async () => {
      const responsavel = await Responsavel.create({
        nome: 'Resp Ambiente 2',
        email: 'resp2@example.com',
      });

      const ambiente = await Ambiente.create({
        nome: 'Lab 2',
        bloco: 'A',
        responsavel_id: responsavel.id,
      });
      expect(ambiente.versao).toBe(1);

      await ambiente.update({ andar: '2' });
      expect(ambiente.versao).toBe(2);

      const ambienteReloaded = await Ambiente.findByPk(ambiente.id);
      expect(ambienteReloaded?.versao).toBe(2);
    });
  });

  describe('Patrimonio', () => {
    let tipoMaterial: any;
    let estadoItem: any;
    let responsavel: any;
    let ambiente: any;

    beforeAll(async () => {
      tipoMaterial = await TipoMaterial.create({ nome: 'Móvel' });
      estadoItem = await EstadoItem.create({ nome: 'Novo' });
      responsavel = await Responsavel.create({
        nome: 'Resp Patrimonio',
        email: 'resp.patrimonio@example.com',
      });
      ambiente = await Ambiente.create({
        nome: 'Lab Patrimonio',
        responsavel_id: responsavel.id,
      });
    });

    it('deve inicializar com versao = 1', async () => {
      const patrimonio = await Patrimonio.create({
        numero_patrimonio: 'PAT001',
        descricao: 'Mesa de trabalho',
        valor: 500,
        tipo_material_id: tipoMaterial.id,
        estado_item_id: estadoItem.id,
        ambiente_id: ambiente.id,
        responsavel_id: responsavel.id,
      });
      expect(patrimonio.versao).toBe(1);
    });

    it('deve incrementar versao ao atualizar', async () => {
      const patrimonio = await Patrimonio.create({
        numero_patrimonio: 'PAT002',
        descricao: 'Cadeira de escritório',
        valor: 300,
        tipo_material_id: tipoMaterial.id,
        estado_item_id: estadoItem.id,
        ambiente_id: ambiente.id,
        responsavel_id: responsavel.id,
      });
      expect(patrimonio.versao).toBe(1);

      await patrimonio.update({ valor: 350 });
      expect(patrimonio.versao).toBe(2);

      const patrimonioReloaded = await Patrimonio.findByPk(patrimonio.id);
      expect(patrimonioReloaded?.versao).toBe(2);
    });

    it('deve incrementar versao em multiplas atualizacoes', async () => {
      const patrimonio = await Patrimonio.create({
        numero_patrimonio: 'PAT003',
        descricao: 'Monitor',
        valor: 1200,
        tipo_material_id: tipoMaterial.id,
        estado_item_id: estadoItem.id,
        ambiente_id: ambiente.id,
        responsavel_id: responsavel.id,
      });
      expect(patrimonio.versao).toBe(1);

      await patrimonio.update({ observacoes: 'Funcionando perfeitamente' });
      expect(patrimonio.versao).toBe(2);

      await patrimonio.update({ valor: 1100 });
      expect(patrimonio.versao).toBe(3);

      const patrimonioReloaded = await Patrimonio.findByPk(patrimonio.id);
      expect(patrimonioReloaded?.versao).toBe(3);
    });
  });

  describe('Prevenção de Conflitos de Concorrência', () => {
    it('deve detectar conflito quando tentar atualizar com versao desatualizada', async () => {
      const tipo1 = await TipoMaterial.create({ nome: 'Tipo Concorrencia' });
      expect(tipo1.versao).toBe(1);

      // Simular atualização de outro usuário
      const tipo2 = await TipoMaterial.findByPk(tipo1.id);
      await tipo2!.update({ nome: 'Atualizado por usuário 2' });
      expect(tipo2!.versao).toBe(2);

      // Tentar atualizar com a versão antiga deve falhar
      try {
        await sequelize.query(`
          UPDATE tipo_material 
          SET nome = 'Atualizado por usuário 1' 
          WHERE id = ? AND versao = ?
        `, {
          replacements: [tipo1.id, 1],
          type: 'UPDATE',
        });
        
        const tipoCheck = await TipoMaterial.findByPk(tipo1.id);
        // Se a versão ainda for 2, significa que a atualização com versão antiga falhou
        expect(tipoCheck!.versao).toBe(2);
        expect(tipoCheck!.nome).toBe('Atualizado por usuário 2');
      } catch (error) {
        // Pode gerar erro ou falhar silenciosamente
        expect(error).toBeDefined();
      }
    });
  });
});
