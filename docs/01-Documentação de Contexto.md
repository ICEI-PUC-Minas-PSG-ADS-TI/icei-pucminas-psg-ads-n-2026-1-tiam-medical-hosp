# Introdução

A área da saúde depende diretamente do bom funcionamento de equipamentos hospitalares para garantir segurança e qualidade no atendimento aos pacientes. Nesse contexto, empresas de engenharia clínica são responsáveis por realizar atividades como manutenção, calibração e comercialização de equipamentos médicos.

A Medical Hosp atua nesse setor oferecendo serviços técnicos especializados para hospitais e clínicas. Entretanto, a organização de informações relacionadas aos equipamentos, como controle de estoque, registros de manutenção e geração de relatórios técnicos, pode se tornar complexa quando realizada de forma manual ou utilizando ferramentas pouco integradas.

Diante disso, este projeto propõe o desenvolvimento de um aplicativo que auxilie os funcionários da empresa na gestão dessas informações. A aplicação permitirá registrar serviços realizados, acompanhar equipamentos e organizar relatórios, contribuindo para uma gestão mais eficiente e organizada.

O objetivo do sistema é facilitar o controle das atividades internas da empresa, melhorar a organização dos dados e apoiar o trabalho dos profissionais responsáveis pela manutenção e gestão dos equipamentos hospitalares.

## Problema

Na gestão de equipamentos hospitalares por empresas de engenharia clínica, o controle das informações ainda é feito de forma manual ou com planilhas e sistemas desconectados. Isso gera vários problemas no dia a dia, como dificuldade de saber exatamente o que tem em estoque, perda de histórico de manutenções, atrasos na reposição de peças e dificuldade de gerar relatórios rápidos para os clientes ou para a própria empresa.

O contexto é de uma empresa chamada Medical Hosp, que atua com manutenção, calibração e comercialização de equipamentos médicos para hospitais e clínicas da região. Atualmente, os técnicos e o pessoal de estoque precisam anotar entradas, saídas, estados dos equipamentos e serviços realizados em documentos separados ou em ferramentas simples, o que consome tempo, aumenta o risco de erros e dificulta o acompanhamento geral das atividades.

Para entender melhor esse problema, o grupo utilizou a abordagem do Design Thinking, mapeando o fluxo atual da empresa desde o recebimento do equipamento até a baixa final, tentando identificar as dores relatadas pelos próprios funcionarios.

> **Links Úteis**:
> - [Objetivos, Problema de pesquisa e Justificativa](https://medium.com/@versioparole/objetivos-problema-de-pesquisa-e-justificativa-c98c8233b9c3)
> - [Matriz Certezas, Suposições e Dúvidas](https://medium.com/educa%C3%A7%C3%A3o-fora-da-caixa/matriz-certezas-suposi%C3%A7%C3%B5es-e-d%C3%BAvidas-fa2263633655)
> - [Brainstorming](https://www.euax.com.br/2018/09/brainstorming/)

## Objetivos

Desenvolver um aplicativo para gestão de equipamentos de saúde para a empresa Medical Hosp, com o intuito de organizar o controle de estoque, registrar movimentações e serviços de manutenção, e melhorar a eficiência para acompanhar as atividades da equipe de engenharia clínica.

- Implementar o cadastro e a atualização de equipamentos, com campos como nome, categoria, quantidade disponível, estado (em uso, disponível, em manutenção, descartado etc) e código único. Isso ajuda a manter o estoque sempre atualizado e organizado sem erros de digitação ou falta de informação.

- Permitir registrar entradas e saídas de equipamentos, guardando o histórico completo de cada movimentação (data, tipo de movimento e quem fez). Assim fica fácil de consultar o que aconteceu com cada item e evitar perdas ou confusões no controle manual.

- Criar alertas quando o estoque de algum equipamento chegar perto do mínimo e mostrar um dashboard simples com os números principais: total de equipamentos, quantos estão disponíveis, em manutenção e em nível baixo. Isso facilita pros gestores verem rápido onde precisam agir, como repor peça ou priorizar manutenção.
 
> **Links Úteis**:
> - [Objetivo geral e objetivo específico: como fazer e quais verbos utilizar](https://blog.mettzer.com/diferenca-entre-objetivo-geral-e-objetivo-especifico/)

## Justificativa
Muitos dos recursos investidos em saúde podem ser desperdiçados por problemas de gestão, incluindo falhas no controle de estoque, compras inadequadas e escassez ou excesso no estoque. Nesse contexto, é imprecindível a falta de equipamentos numa das áreas mais tem impacto nas nossas vidas. O MedicalHosp vem justamente para mitigar essa falta de controle de equipamentos clínicos. Ele permite o controle de entrada e saídas, fornece dados para monitoramento entre outras funcionalidades além de ser uma ferramenta de assistência ao usuários.

Descreva a importância ou a motivação para trabalhar com esta aplicação que você escolheu. Indique as razões pelas quais você escolheu seus objetivos específicos ou as razões para aprofundar em certos aspectos do software.

O grupo de trabalho pode fazer uso de questionários, entrevistas e dados estatísticos, que podem ser apresentados, com o objetivo de esclarecer detalhes do problema que será abordado pelo grupo.

> **Links Úteis**:
> - [Como montar a justificativa](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/)

## Público-Alvo

O público-alvo da aplicação é composto principalmente pelos colaboradores da Medical Hosp que atuam diretamente na gestão e manutenção de equipamentos hospitalares.

Entre os principais usuários do sistema estão:

Técnicos de engenharia clínica, responsáveis por realizar manutenção, calibração e inspeção de equipamentos, que poderão registrar serviços realizados e gerar relatórios técnicos através do aplicativo.

Funcionários responsáveis pelo controle de estoque, que poderão acompanhar a entrada, saída e disponibilidade de equipamentos e peças.

Gestores ou supervisores da empresa, que poderão consultar relatórios e acompanhar o status dos equipamentos e das atividades realizadas pela equipe.

Esses usuários podem possuir diferentes níveis de familiaridade com tecnologia, variando desde profissionais que utilizam sistemas administrativos com frequência até usuários com conhecimentos mais básicos em aplicativos móveis.
