# Introdução

A confiabilidade de equipamentos médico-hospitalares é crítica para a segurança do paciente. A Medical Hosp, empresa especializada em engenharia clínica, atua na manutenção e calibração desses dispositivos. Este projeto propõe uma aplicação móvel para modernizar a gestão de Padrões de Calibração, substituindo processos manuais e sistemas fragmentados por uma solução integrada que garanta a rastreabilidade metrológica e a eficiência operacional em campo.

## Problema

Atualmente, a gestão de padrões e fornecedores na Medical Hosp apresenta gargalos operacionais:

#### Fragmentação de Dados: 
Informações de calibração e certificados (PDFs) não estão prontamente acessíveis aos técnicos em campo.

#### Risco de Conformidade: 
A dificuldade em monitorar datas de validade de padrões pode levar ao uso de instrumentos desatualizados.

#### Cálculos Manuais: 
Cálculos técnicos, como a Força G, são realizados de forma externa, aumentando a margem de erro humano.

#### Histórico Ineficiente: 
O registro de desativação de padrões carece de centralização e justificativas estruturadas para auditoria.

## Objetivos

Desenvolver um aplicativo para gestão de equipamentos de saúde para a empresa Medical Hosp, com o intuito de organizar o controle de estoque, registrar movimentações e serviços de manutenção, e melhorar a eficiência para acompanhar as atividades da equipe de engenharia clínica.

- Implementar o cadastro e a atualização de equipamentos, com campos como nome, categoria, quantidade disponível, estado (disponível, atenção, descartado, inderteminado) e código único. Isso ajuda a manter o estoque sempre atualizado e organizado sem erros de digitação ou falta de informação.

- Permitir registrar entradas e saídas de equipamentos, guardando o histórico completo de cada movimentação (data, tipo de movimento e quem fez). Assim fica fácil de consultar o que aconteceu com cada item e evitar perdas ou confusões no controle manual.

- Criar alertas quando o estoque de algum equipamento chegar perto do mínimo e mostrar um dashboard simples com os números principais: total de equipamentos, quantos estão disponíveis, em manutenção e em nível baixo. Isso facilita pros gestores verem rápido onde precisam agir, como repor peça ou priorizar manutenção.


## Justificativa
A gestão de ativos em saúde não se resume apenas à posse do equipamento, mas à garantia de sua rastreabilidade e confiabilidade metrológica. No contexto da Medical Hosp, os "Padrões" são o alicerce de todo o serviço prestado; se um padrão estiver com a calibração vencida ou apresentar erro, todos os laudos emitidos por ele tornam-se inválidos, gerando riscos legais e de segurança aos pacientes dos hospitais atendidos.
A motivação para este projeto baseia-se em três pilares fundamentais:

#### Conformidade e Segurança: 
A substituição de registros manuais por uma aplicação digital reduz drasticamente o risco de utilização de instrumentos fora do prazo de validade. O acesso imediato aos certificados em PDF garante que a empresa esteja sempre pronta para auditorias e fiscalizações sanitárias (ANVISA).

#### Eficiência Operacional: 
Técnicos de campo frequentemente perdem tempo valioso realizando cálculos complexos, como a Força G, de forma manual ou consultando tabelas externas. A automação desses cálculos e a centralização dos dados de fornecedores agilizam o atendimento e reduzem a carga cognitiva da equipe.

#### Gestão de Ativos e Sustentabilidade: 
O registro estruturado do histórico de desativação permite que a gestão identifique falhas recorrentes em marcas ou modelos específicos, apoiando decisões de compra mais inteligentes e justificando o descarte técnico de equipamentos que não possuem mais viabilidade de conserto.

## Público-Alvo

#### Técnicos de Engenharia Clínica: 
Usuários de campo que precisam consultar padrões, anexar certificados e realizar cálculos.

#### Coordenadores de Calibração: 
Responsáveis pela gestão da frota de instrumentos e homologação de fornecedores.

### Gestores Administrativos: 
Visualizam indicadores de prontidão e custos de manutenção/descarte.
