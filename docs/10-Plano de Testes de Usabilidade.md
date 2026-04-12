# Plano de Testes de Usabilidade

## Objetivos do Teste
- Verificar se os técnicos conseguem localizar um certificado de calibração em menos de 1 minuto.

- Avaliar se a sinalização de status (vencido/atenção) é compreendida visualmente de imediato.

- Identificar dificuldades no preenchimento do formulário de cadastro de padrões e calibrações.

## Participantes e Ferramentas
- Participantes: Técnicos e Gestores de Engenharia Clínica.

- Ferramenta: Protótipo interativo no Figma.

- Método: Observação direta e técnica de Think Aloud (o usuário narra o que está pensando enquanto executa as tarefas).

## Casos de Teste

- CTU-01
  
Localizar Equipamento: Através do Dashboard, encontre o equipamento com a TAG "XYZ-123" e verifique se a calibração está válida.	

O usuário deve usar a barra de busca ou o filtro de status e identificar a cor verde/status "Válido".

- CTU-02
  
Acessar Certificado: Localize o histórico de calibração do padrão "Multímetro" e abra o último certificado em PDF.

O usuário deve chegar à tela de histórico e clicar no ícone do PDF sem hesitação.

- CTU-03
  
Cadastrar Novo Padrão: Como Gestor, realize o cadastro de um novo equipamento preenchendo todos os campos obrigatórios.	

O usuário deve encontrar o botão "+" e completar o formulário até a mensagem de sucesso.

- CTU-04
  
Desativar Padrão: Encontre um padrão vencido e realize o processo de desativação, inserindo uma justificativa técnica.

O usuário deve localizar a opção de "Baixa/Desativar" e preencher o motivo antes de confirmar.

- CTU-05
  
Consultar Fornecedor: Encontre o contato do fornecedor responsável pela última calibração de um item e tente acessar o portal dele.	

O usuário deve navegar até a aba de fornecedores e clicar no link de "Acesso ao Portal".

## Métricas de Avaliação

- Taxa de Sucesso: Porcentagem de usuários que completaram a tarefa sem ajuda.

- Tempo na Tarefa: Tempo médio gasto para concluir cada cenário.

- Escala de Satisfação (SUS): Após o teste, o usuário responderá de 1 a 5 o quão fácil achou o sistema.
