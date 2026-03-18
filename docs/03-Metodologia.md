
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

O grupo organizou o trabalho para desenvolver o aplicativo de gestão de equipamentos da Medical Hosp, usando uma abordagem ágil simples, com GitHub para código e tarefas, Discord para comunicação diária, e foco em entregar funcionalidades aos poucos.

## Relação de Ambientes de Trabalho

Os artefatos do projeto (código, docs, designs) são feitos em várias plataformas. A tabela abaixo mostra os ambientes principais, com plataforma e link (quando aplicável).

| Ambiente                  | Plataforma                          | Link de Acesso                                      |
|---------------------------|-------------------------------------|-----------------------------------------------------|
| Repositório      | GitHub                              | https://github.com/ICEI-PUC-Minas-PSG-ADS-TI/icei-pucminas-psg-ads-n-2026-1-tiam-medical-hosp/tree/main    |
| Editor de código          | Visual Studio                 |  (instalado localmente)                            |
| Desenvolvimento mobile    | React Native                | -                                                   |
| Backend e APIs            | C# .NET (ASP.NET Core)              | -                                                   |
| Banco de dados            | SQL Server (backend)| -                                                   |
| Comunicação da equipe     | Discord                             | -                 |
| Gerenciamento de projeto  | GitHub Projects ( Kanban)      | No repositório ( Projects)                       |
| Design de telas           | Figma                               |      https://www.figma.com/             |

Escolhemos React Native para o app mobile , Expo para facilitar testes rápidos, C# .NET para criar APIs seguras no backend (se precisar de sincronização multi-usuário), e SQL para armazenar dados .
## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gerência de tags, merges, commits e branchs é realizada. Discuta como a gerência de issues foi realizada.


## Gerenciamento de Projeto

### Divisão de Papéis

Apresente a divisão de papéis entre os membros do grupo.

Exemplificação: A equipe utiliza metodologias ágeis, tendo escolhido o Scrum como base para definição do processo de desenvolvimento. A equipe está organizada da seguinte maneira:
- Scrum Master: Helena Edim – Responsável por remover impedimentos e garantir os ritos ágeis.
- Product Owner: Gabriel Rodrigues – Responsável pela priorização do backlog conforme as necessidades da Medical Hosp.
- Equipe de Desenvolvimento: Arthur Carvalho e Lucas Gabriel – Focados na implementação do frontend (React Native) e backend (C# .NET), aplicando princípios SOLID.
- Equipe de Design: Todo o grupo colabora na prototipação no Figma, focando na usabilidade técnica para o ambiente hospitalar.

### Processo

#### Controle de Versão e Fluxo de Trabalho (Gitflow)
 O controle de versão é feito via Git, hospedado no GitHub. Adotamos um fluxo de trabalho baseado em ramificações (branches) para evitar conflitos na versão estável:

 ##### main: 
 Versão de produção, estável e testada.
##### dev: 
Versão de integração, onde as funcionalidades completas são mescladas para testes de sistema.
##### feature/nome-da-funcionalidade: 
Branches temporárias para o desenvolvimento de itens específicos (ex: feature/calculadora-forca-g).

#### Gestão de Issues: 
Utilizamos etiquetas (labels) para organizar o fluxo de trabalho:

##### feature: 
Nova funcionalidade em desenvolvimento.
##### bug: 
Correção de falhas identificadas.
##### documentation: 
Melhorias na especificação técnica.
##### solid-refactor: 
Tarefas específicas para melhoria da arquitetura de código.


### Ferramentas

#### React Native + Expo: 
Escolhido para o frontend mobile por permitir o desenvolvimento híbrido (Android/iOS) com alta performance e agilidade nos testes de interface.

#### C# .NET (ASP.NET Core): 
Utilizado para a construção da API de backend. A escolha justifica-se pela robustez da linguagem e pela facilidade em implementar padrões de projeto e princípios SOLID, essenciais para a manutenção de um sistema de engenharia clínica.

#### SQL Server: 
Banco de dados relacional para garantir a atomicidade das movimentações de calibração e a segurança dos dados.

#### Visual Studio / VS Code: 
IDEs escolhidas pela integração nativa com Git e suporte avançado ao ecossistema .NET.

#### Figma: 
Utilizado para criar o protótipo de alta fidelidade, permitindo validar o fluxo de telas (como o Dashboard de Padrões e a Calculadora) antes da codificação.
