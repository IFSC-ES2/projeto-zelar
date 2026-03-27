# Inception

## 1. Visão do Produto

(a) Qual problema o sistema pretende resolver?

- O sistema pretende resolver a dificuldade na gestão, rastreabilidade e controle de manutenção dos materiais permanentes (patrimônios) de uma organização, que frequentemente sofrem avarias ou são realocados sem o devido registro e acompanhamento.

(b) Quem são os usuários principais e demais interessados?

* Gestor de Patrimônio
* Responsável pelo Ambiente
* Conferente

(c) Qual é a proposta de valor do sistema?

- Desenvolver um sistema WEB que permita cadastrar, gerenciar e organizar os materiais permanentes associando-os a ambientes específicos (inicialmente focado no IFSC Campus São José). O sistema garantirá que todo ambiente tenha um responsável direto e automatizará o fluxo de solicitação de manutenção ou substituição de itens avariados.

(d) Quais objetivos o produto pretende atingir neste semestre?

- O principal objetivo para este semestre é entregar o MVP (Minimum Viable Product) funcional e estabilizado, além de estruturar toda a base do sistema para já deixá-lo engatilhado para o desenvolvimento de uma segunda *release*.

(e) Quais premissas, restrições ou limitações já são conhecidas?


* O sistema será estritamente uma aplicação WEB (um aplicativo mobile nativo está fora de cogitação para o escopo).
* O contexto de modelagem e testes é focado na realidade do IFSC Campus São José.
* O desenvolvimento é feito primariamente durante os horários das aulas, utilizando os computadores do laboratório da instituição.
* Restrição de infraestrutura: A equipe não tem nenhuma forma concedida de hospedagem na nuvem, o que limita o teste de recursos que dependem de servidores externos constantes.

## 2. Definição do MVP (Minimum Viable Product)

(a) Qual é o objetivo do MVP?

- O MVP tem como objetivo entregar e validar o fluxo completo e operacional de um item: desde o seu cadastro, a sua alocação em um ambiente, até o controle do seu estado ao longo do tempo.

(b) Quais funcionalidades são consideradas essenciais?

* CRUD completo de Patrimônios, Ambientes, Responsáveis, Conferentes, Fornecedores, Tipos de Material e Estado do Item.
* Associação obrigatória de um patrimônio a um ambiente, e de um responsável ao respectivo ambiente.
* Registro da mudança de estado do item (avariado/manutenção) e abertura de solicitações (manutenção/substituição).

(c) Quais funcionalidades ou ideias ficam fora do escopo neste momento?

* Aplicativo mobile nativo.
* Envio de e-mails automáticos ao Gestor e ao Responsável quando um item for reportado como avariado ou tiver manutenção solicitada.
* Geração de relatórios complexos (por ambiente, responsável, descrição e número de patrimônio).

(d) Por que esse recorte é viável para o semestre?

Este recorte é viável porque o escopo delimitado vai de encontro com as matérias que a equipe está cursando neste semestre. Além disso, a equipe já possui experiência prévia nas linguagens e tecnologias escolhidas para implementar essas funcionalidades essenciais, garantindo a entrega no prazo.

(e) Quais critérios foram usados pela equipe para decidir o que entra e o que fica de fora?**

A equipe utilizou como critério principal a **possibilidade real de entrega e teste local**. A exclusão do envio de e-mails se deu pelo fato de não termos um serviço de hospedagem disponibilizado para manter o servidor SMTP ou a aplicação no ar. A geração de relatórios também foi deixada de fora do MVP por exigir uma complexidade de desenvolvimento muito maior, o que poderia comprometer a estabilidade do fluxo de cadastros básicos que é essencial para o sistema funcionar.
