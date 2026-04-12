# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

## Objetivo do Plano de Testes

Garantir que a aplicação atenda aos requisitos funcionais e não funcionais especificados, entregando uma solução confiável, segura e usável para os usuários (Técnicos de Engenharia Clínica e Gestores/Engenheiros Clínicos). Os testes buscarão validar a correção das funcionalidades, o desempenho e a conformidade com as restrições do projeto.

---

## Cenários de Testes Funcionais:

| ID | Descrição do Teste Unitário | Requisito(s) Relacionado(s) | Resultado Esperado |
| :--- | :---: | :---: | :---: |
| TU-001 | Validação de campos obrigatórios nos endpoints POST de todas entidades | RF-001, RF-003, RF-005, RF-006 | Retornar erro se campos obrigatórios estiverem vazios ou incorretos |
| TU-002 | Cálculo automático de status de padrão (válido, atenção, vencido, indeterminado) | RF-010 | Retornar status correto com base na data da última calibração/periodicidade |
| TU-003 | Verificação de prazo para notificação (30 dias antes do vencimento) | RF-014 | Retornar "true" quando a calibração estiver a exatamente 30 dias ou menos do vencimento |
| TU-004 | Validar permissão por perfil de usuário (Gestor e Técnico) | RF-001, RF-002 | Gestor possui permissão total e Técnico readonly |
| TU-005 | Ao clicar no link do portal do fornecedor o usuário é direcionado ao portal | RF-006, RF-007 | Link do portal é aberto corretamente |



| ID | Descrição do Teste de Integração | Requisito(s) Relacionado(s) | Resultado Esperado |
| :--- | :---: | :---: | :---: |
| TI-001 | Cadastro de padrão com atualização imediata no dashboard de padrões  | RF-003, RF-010, RF-011 | O padrão é apresentado no dashboard com status corretos e filtros funcionam |
| TI-002 | Registro de calibração atualiza o status do padrão e histórico de calibrações | RF-005, RF-009 | O status do padrão é atualizado, PDF é vinculado e calibração é visível no histórico |
| TI-003 | Ao desativar um padrão o mesmo é removido no dashboard e é incluído no módulo de desativados | RF-012, RF-013 | O padrão é removido do dashboard e visível no histórico de desativados |
| TI-004 | Ao realizar alguma operação de CRUD, o sistema deve armazenar essa operação no histórico de alterações | RF-015 | A operação realizada é visível no histórico de alterações |
| TI-005 | Garantir que todas as operações CRUD estão sendo salvas corretamente no banco de dados  | Todos | A operação CRUD é salva no banco de dados |
| TU-006 | Ao buscar peço nome, TAG ou patrimônio deve retornar os padrões relacionados | RF-0011 | Padrões que atendem à busca são apresentados no dashboard |


## Ferramentas de Testes (Opcional)
- xUnit
- NUnit
- PostMan
- Swagger

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
