# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido.

## 📁 Acesso ao Código de Testes
Os scripts de testes automatizados e cenários mapeados neste documento estão localizados diretamente no repositório do projeto.
* **Diretório dos Testes:** Código disponível em [`/src/__tests__`](../src/__tests__)

## Avaliação

Os testes mostraram que o sistema está bem estável nas suas funções principais. O grande ponto forte do projeto é que todas as telas de CRUD estão muito bem integradas com o banco de dados. Os fluxos de criar, listar, editar e excluir registros funcionam de ponta a ponta sem quebras ou travamentos, o que garante o funcionamento correto da regra de negócio básica.

Como ponto fraco, percebemos que o sistema ainda aceita alguns dados inválidos se o usuário digitar rápido ou errar o formato, pois falta melhorar as validações no front-end. Também notamos um pequeno atraso visual para atualizar a tela logo após salvar um registro em conexões mais lentas. Para corrigir isso, já adicionamos alertas visuais e mensagens de erro mais claras.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
