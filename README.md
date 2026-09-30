# Quintal da Fazenda — site

React + TypeScript + Vite + Tailwind. Sem backend.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
```

**Deploy na Vercel:** importar o repositório, e a Vercel detecta o Vite sozinha (build `npm run build`, pasta `dist`).

## Editar o conteúdo

Tudo está em `src/data/` e `src/config.ts`. Não é preciso mexer nos componentes.

| O quê | Ficheiro |
|---|---|
| **Números de WhatsApp e telefone** | `src/config.ts` (`WHATSAPP_NUMERO` recebe as reservas; `TELEFONES` são os números para ligar; só dígitos, com 244) |
| Menu, preços, pratos esgotados | `src/data/menu.ts` (preço em Kz, número inteiro; `esgotado: true` esconde o botão) |
| Eventos | `src/data/eventos.ts` (data `AAAA-MM-DD`; os eventos passados desaparecem sozinhos) |
| Horário | `src/data/horario.ts` (`null` = fechado; se fechar depois da meia-noite, escreva por ex. `01:00`) |
| Morada, Instagram, mapa | `src/data/local.ts` |
| Zonas e horas de reserva | `src/data/reserva.ts` |
| Texto "O Quintal" e galeria | `src/data/sobre.ts` |

## Fotos

- Já em uso: `public/fotos/picanha-*.webp` (hero) e `public/fotos/cortes-*.webp` (carta de cortes dos Grelhados). Os originais em PNG estão em `originais/`, fora de `public/`, para não pesarem no site.
- As outras caixas marcadas "FOTO: …" são espaços reservados. Para trocar: converta a foto para `.webp` (até 1100 px de largura), coloque-a em `public/fotos/` e passe `src="/fotos/nome.webp"` ao `<Foto>` correspondente.
- Se trocar a ilustração dos cortes por outra, as zonas de toque estão em `src/components/BoiCortes.tsx` (coordenadas sobre a imagem de 1612×976).

## Antes de publicar

- Números já configurados em `src/config.ts`: WhatsApp 934 968 282; telefones 934 968 282 e 934 682 121.
- Confirmar menu, preços, horário e eventos. Neste momento são **dados de demonstração**.
