# Registro de Testes de Usabilidade

Após realizar os testes de usabilidade, obtém-se um relatório a partir das análises realizadas. O Registro de Testes de Usabilidade é um relatório que contém as evidências dos testes e relatos dos usuários participantes, baseado no Plano de Testes de Usabilidade desenvolvido para os casos de uso desta etapa.

As referências abaixo irão auxiliá-lo na geração do artefato “Registro de Testes de Usabilidade”.

> **Links Úteis**:
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
> - # Registro de Testes de Usabilidade
 
## Participantes
 
| Participante | Idade | Perfil |
|---|---|---|
| Leandro Dantas | 25 anos | Estudante de engenharia mecanica |
| Ronia Pereira | 55 anos | Recepcionista |
 
---
 
## Metodologia
 
Os participantes foram convidados a navegar livremente pelo protótipo no Figma, sem instruções prévias sobre onde cada informação estava. Em seguida, receberam tarefas objetivas e foram observados enquanto tentavam completá-las apenas clicando pelas telas disponíveis. O avaliador registrou se a pessoa conseguiu chegar ao destino correto, quantos cliques foram necessários e se houve hesitação ou confusão no caminho. As funcionalidades simuladas (busca, cadastro, edição) não foram testadas por não estarem implementadas — o foco foi inteiramente na navegação e na leitura visual da interface.
 
---
 
## Tarefas Avaliadas
 
| Nº | Tarefa | Tela envolvida | Persona | Resultado | Observação |
|---|---|---|---|---|---|
| T01 | Identificar, na tela Início, quais padrões aparecem com alerta de vencimento | Início | Leandro e Ronia | ✅ Sucesso | Os ícones de alerta e as cores de status foram reconhecidos imediatamente |
| T02 | Navegar até a aba Padrões pela barra inferior | Início → Padrões | Leandro e Ronia | ✅ Sucesso | Os dois clicaram diretamente no ícone correto sem hesitação |
| T03 | Na tela Padrões, distinguir visualmente quais estão Válidos, em Atenção e Vencidos | Padrões | Leandro e Ronia | ✅ Sucesso | As cores e os badges foram suficientes para a leitura |
| T04 | Clicar em um padrão da lista e chegar à tela de Detalhes | Padrões → Detalhes | Leandro e Ronia | ✅ Sucesso | Navegação direta sem dificuldade |
| T05 | Voltar da tela de Detalhes para a lista de Padrões | Detalhes → Padrões | Leandro | ⚠️ Parcial | Leandro hesitou por alguns segundos antes de encontrar o botão de voltar |
| T06 | Navegar até a aba Fornecedores e localizar um fornecedor na lista | Fornecedores | Ronia | ✅ Sucesso | Lista clara e de fácil leitura |
| T07 | Clicar em um fornecedor e visualizar seus dados de contato | Fornecedores → Detalhes | Ronia | ✅ Sucesso | Tela de detalhes considerada objetiva |
| T08 | Navegar até a aba Perfil e localizar os avisos e alertas de calibração | Perfil | Leandro e Ronia | ✅ Sucesso | Seção de notificações foi encontrada sem dificuldade |
| T09 | Identificar o campo de busca na tela Início e na tela Padrões | Início / Padrões | Leandro | ✅ Sucesso | Campo de busca bem posicionado e reconhecível |
| T10 | A partir da tela Início, clicar em um padrão listado e chegar aos seus detalhes | Início → Detalhes | Ronia | ✅ Sucesso | Fluxo de acesso rápido pela tela inicial funcionou bem |
 
---
 
## Relatos dos Participantes
 
### Leandro Dantas — Estudante
 
- "Consegui entender de cara quais padrões estavam com problema só pela cor."
- "A barra de navegação no rodapé é intuitiva, achei tudo onde esperava."
- "Na tela de detalhes, demorei um pouco para perceber como voltar para a lista."
- "O campo de busca está bem visível, mesmo sem funcionar já dá para imaginar como usaria no dia a dia."
 
### Ronia Pereira — Recepcionista
 
- "A tela de Início já mostra o que precisa de atenção, sem precisar entrar em outra tela."
- "Os dados do fornecedor na tela de detalhes estão bem organizados."
- "Senti falta de uma indicação mais clara de que os botões de cadastro e edição ainda não funcionam — fiquei tentando clicar."
- "A aba de Perfil com os alertas faz sentido, é o primeiro lugar que eu olharia para ver o que está vencendo."
 
---
 
## Problemas Identificados e Melhorias Sugeridas
 
| ID | Problema | Severidade | Melhoria sugerida |
|---|---|---|---|
| P01 | Botão de voltar da tela de Detalhes não foi encontrado rapidamente | Média | Tornar o botão de voltar mais destacado ou usar o padrão de seta no canto superior esquerdo |
| P02 | Participante tentou interagir com botões de cadastro/edição que não funcionam no protótipo | Baixa | Adicionar indicação visual no Figma (ex: tela de "em breve") para elementos ainda não implementados |
 
---
 
## Conclusão
 
De forma geral, a navegação entre as telas do protótipo mostrou-se intuitiva para os dois perfis testados. A barra de navegação inferior com as quatro abas (Início, Padrões, Fornecedores e Perfil) foi compreendida sem necessidade de instrução prévia. A codificação visual por cores para os status dos padrões (Válido, Atenção, Vencido) foi reconhecida imediatamente pelos participantes. O único ponto de melhoria relevante identificado foi a visibilidade do botão de voltar na tela de Detalhes, que deverá ser ajustada antes da implementação definitiva.
