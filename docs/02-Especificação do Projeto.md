# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

### Persona 1 – Carlos Henrique

Carlos Henrique tem 29 anos e trabalha como auxiliar administrativo. Parte de suas responsabilidades envolve organizar equipamentos, registrar movimentações no estoque e auxiliar outros funcionários quando precisam localizar algum item ou equipamento específico.

Carlos utiliza tecnologia principalmente no celular e em sistemas simples de computador, e prefere ferramentas rápidas e fáceis de usar. Atualmente, ele enfrenta dificuldades porque muitas informações sobre equipamentos estão espalhadas em planilhas ou registros informais, o que torna o processo de controle mais lento.

Ele gostaria de ter um aplicativo onde pudesse registrar rapidamente quando um equipamento entra ou sai do estoque, além de consultar a quantidade disponível sem precisar procurar em vários lugares diferentes. Para Carlos, um sistema simples e organizado ajudaria muito a reduzir erros e facilitar o trabalho diário.

### Persona 2 – Mariana Oliveira

Mariana Oliveira tem 42 anos e é administradora. Trabalha há mais de 10 anos na área de gestão administrativa e é responsável por organizar processos internos, controlar recursos e garantir que a empresa funcione de forma eficiente. No dia a dia, Mariana precisa acompanhar a disponibilidade de diversos equipamentos clínicos, além de lidar com compras, manutenção e reposição de materiais.

Ela utiliza computadores e sistemas administrativos com frequência, mas nem sempre encontra ferramentas simples para controlar o estoque de equipamentos. Muitas vezes, o controle é feito por planilhas ou anotações manuais, o que pode causar confusão ou perda de informações.

Mariana busca uma solução prática que permita visualizar rapidamente quais equipamentos estão disponíveis, em manutenção ou em uso, além de registrar movimentações de forma organizada. Seu objetivo é melhorar o controle interno e garantir que os profissionais sempre tenham os equipamentos necessários para o atendimento.

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Funcionário  | Cadastrar um equipamento           | Controle do meu estoque              |
|Funcionário       | Ter acesso ao histórico de movimentações                | Saber a quantidade de itens à serem comprados |
|Funcionário       | Ser notificado quando o estoque está escasso            | Evitar a falta de equipamentos |
|Funcionário       | Realizar a busca e a filtragem de equipamentos            | Serem acessados fácilmente no aplicativo |
|Funcionário       | Visualizar um dashboard com registros dos equipamentos cadastrados          | Facilitar a gestão de equipamentos |
|Funcionário       | Gerenciar a entrada e saída de equipamentos          | Ter controle do meu estoque físico |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | Responsável |
|------|-----------------------------------------|----| ----|
|RF-001| Permitir que o usuário cadastre equipamentos com nome, categoria, quantidade disponível, estado ( em uso, disponível, em manutenção, descartado, esgotado ), código  | ALTA | Helena Edim |
|RF-002| Permitir que o usuário registre a enttrada de equipamentos no estoque | ALTA | Aluno X |
|RF-003| Alertar o usuário quando um equipamento atingir um valor mínimo | ALTA | Lucas Gabriel |
|RF-004| Permitir o usuário acessar o histório de movimentação de cada equipamento informando a data, tipo de saída e quem realizou a baixa| ALTA | Aluno Y |
|RF-005| Permitir que o usuário busque equipamentos específicos por nome, categoria ou quantidade no estoque | MÉDIA | Lucas Gabriel |
|RF-006| Permitir que o usuário visuzalize um dashboard indicando a quantidade total de equipamentos, quantidade de equipamentos em manutenção, quantidade equipamentos disponíveis e equipamentos em estoque baixo| MÉDIA | Helena Edim |
|RF-007| Permitir que o usuário registre a saída/baixa de um equipamento no estoque | ALTA | Aluno Y |
|RF-008| Permitir consultar o estoque de cada equipamento | MÉDIA | Aluno Y |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móveis | ALTA | 
|RNF-002| O tempo de resposta do sistema não deve exceder 3s para exibir páginas em consultas em uso normal |  BAIXA |
|RNF-003| O sistema deve garantir o isolamento e atomicidade das movimentações de saída e entrada |  ALTA |
|RNF-004| O sistema deve usar um esquema de cores padronizados para manter a consistencia visual entre as páginas |  MÉDIA |
|RNF-005| O sistema deve estar em conformidade com a Lei Geral de Proteção de Dados (LGPD). |  BAIXA |


Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

<!--
## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)
-->

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
