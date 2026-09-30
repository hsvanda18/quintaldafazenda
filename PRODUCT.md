# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
React + TypeScript + Vite + Tailwind CSS, sem backend, deploy na Vercel (definido no brief).

## Users
Clientes de Luanda (famílias, grupos de amigos, casais, público de eventos) que querem almoçar ou jantar no Quintal da Fazenda, sobretudo a partir do telemóvel. Segundo público: a equipa do restaurante, que recebe reservas e pré-pedidos por WhatsApp.

## Product Purpose
Site de demonstração comercial para o dono. Mostra o menu com preços, permite reservar mesa e enviar um pré-pedido antes de chegar, lista eventos e dá a informação prática. Sucesso: o dono vê que o site reduz esperas e pedidos repetidos, porque a cozinha recebe o pedido organizado antes de o cliente se sentar.

## Positioning
Restaurante rústico no Patriota com espaço de fazenda, música e eventos (desfiles de moda, noites temáticas). Slogan: "Sabor que vem da terra". O pré-pedido via WhatsApp ligado à reserva é o mecanismo que distingue o site.

## Operating Context
- Morada: Rua Principal do Patriota, em frente ao Eskebra, Luanda.
- Preço médio ao jantar: 14.000 a 16.000 Kz por pessoa. Almoço e jantar.
- Zonas: Fumadores, Não fumadores, Esplanada.
- Horário (demonstração, confirmado pelo utilizador): terça a domingo 12h–23h, segunda fechado; sexta e sábado até à 01h. Fuso Africa/Luanda.
- Instagram: @quintal.da.fazenda.

## Capabilities and Constraints
- Conteúdo em `src/data/*.ts` tipados. Número de WhatsApp num único ficheiro de configuração.
- Número oficial: por fornecer pelo dono (placeholder até lá).
- Menu e eventos são dados de demonstração e têm de estar marcados como tal.
- Estado do pré-pedido em React, sem localStorage.

## Brand Commitments
- Logótipo em `public/logo-source.jpg` (arco com cavalo empinado, campo verde, "QUINTAL DA FAZENDA", "SABOR QUE VEM DA TERRA", linhas finas douradas).
- Português de Angola/Portugal, sem brasileirismos. Moeda "12.500 Kz".
- Tem de lembrar fazenda, cowboys e carne (pedido explícito). Referências: cartaz de rodeo, saloon, verde escuro + dourado.

## Evidence on Hand
Sem fotos reais, testemunhos, avaliações ou números. Não inventar nenhum. Imagens são placeholders marcados "FOTO: ...".

## Product Principles
1. O pedido chega à equipa antes do cliente.
2. Tudo o que o cliente precisa (aberto hoje? onde? quanto?) sem scroll.
3. Concreto e caloroso, nunca frases de marketing vazias.
4. Fácil de editar pelo dono sem mexer em componentes.

## Accessibility & Inclusion
Contraste AA, alvos de toque ≥44px, labels nos inputs, navegação por teclado.
