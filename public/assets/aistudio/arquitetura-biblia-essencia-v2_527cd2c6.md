# Arquitetura — Bíblia A Essência v2

> Documento de arranque. Mesma ideia do app antigo, base refeita do zero.
> Serve para você seguir sozinho ou colar numa IA construtora (uma etapa por vez).

## 0. Decisões travadas

| Item | Decisão |
|---|---|
| Base | React 19 + Vite + TypeScript (fixar versões estáveis) |
| Estilo | Tailwind 4 |
| Estado | React Context + hooks. Sem `App.tsx` gigante |
| Dados da Bíblia | JSON por capítulo, em `public/data/` |
| Offline | IndexedDB (leitura dos JSON + cache) |
| Áudio | Web Speech API, isolado atrás de uma interface |
| Deploy | Vercel, com `vercel.json` (rewrite para `/index.html`) |
| Uso | Pessoal. Publicação só depois da licença |

**Versões:** usar as estáveis, não as de ponta. No app antigo havia Vite 8, TypeScript 7 e `@vitejs/plugin-react` 6 — muito novos, e foi dor de cabeça. Fixe versões conhecidas no `package.json`.

---

## 1. Regras que não podem ser quebradas

Estas são as lições do app antigo. Se uma etapa violar uma delas, a etapa está errada.

1. **A posição de leitura é gravada em um só lugar.** Um contexto de leitura, um `save`. Nada de gravar `verse: 1` em quatro funções.
2. **Nada re-renderiza o app inteiro de fora.** Sem `setInterval` no topo mexendo em cor de fundo. Se a cor muda sozinha, ela vive em um componente de fundo ou vira variável CSS.
3. **Ids de versículo são únicos por capítulo:** `v-{bookId}-{chapter}-{verse}`. Isso é o que permite rolagem contínua, áudio e marcadores ao mesmo tempo.
4. **A altura do cabeçalho é medida, não adivinhada.** Ela vira `--header-h` no `document.documentElement`. Nenhum `top-16`, `top-20` ou `scroll-margin-top: 88px` escrito à mão.
5. **Uma navegação por tamanho de tela.** Celular: barra inferior + menu "Mais". Computador: cabeçalho com abas. Nunca quatro lugares com as mesmas abas.
6. **Nenhum `alert()`.** Avisos usam um componente de toast.
7. **Nenhum botão de desenvolvedor visível.** Simulador, diagnóstico e depurador só com `?dev=1`.
8. **Sem segredo no cliente.** A chave do Gemini vive só no servidor, como variável de ambiente.
9. **Cada recurso na sua pasta e sem conhecer os outros.** Nada de tudo importar tudo.

---

## 2. Modelo de dados

`src/lib/bible/types.ts`

```ts
export type Translation = 'ARC' | 'ARA' | 'NVI' | 'NAA';
export type Testament = 'AT' | 'NT';

export interface Book {
  id: string;          // 'gn', 'jo', 'ap'
  name: string;        // 'Gênesis'
  abbrev: string;      // 'Gn'
  testament: Testament;
  order: number;       // 1..66
  chapters: number;    // 50
  group: string;       // 'Pentateuco', 'Evangelhos'
  theme?: string;      // 'Origem de todas as coisas'
  author?: string;
  period?: string;
  summary?: string;
}

export interface Verse {
  n: number;           // 16
  text: string;
}

export interface Chapter {
  bookId: string;
  chapter: number;
  translation: Translation;
  verses: Verse[];
}

// Arquivo em public/data/{translation}/{bookId}/{chapter}.json
// { "bookId":"gn", "chapter":1, "translation":"ARC", "verses":[{ "n":1, "text":"..." }] }
```

Marcador e nota:

```ts
export interface Marker {
  id: string;                  // `${bookId}-${chapter}-${verse}`
  bookId: string;
  chapter: number;
  verse: number;
  color: 'gold' | 'blue' | 'green' | 'rose';
  note?: string;
  createdAt: string;           // ISO
  updatedAt: string;
}
```

Posição de leitura:

```ts
export interface ReadingPosition {
  bookId: string;
  chapter: number;
  verse: number;
  translation: Translation;
  updatedAt: string;
}
```

---

## 3. Estrutura de pastas

```
public/
  data/{translation}/{bookId}/{chapter}.json
  icons/                     192, 512, maskable
  logo.png

src/
  main.tsx
  App.tsx                    rotas e provedores, curto
  routes.tsx

  app/
    providers/
      ReadingProvider.tsx    livro, capítulo, versículo, versão, posição
      ThemeProvider.tsx      tema e tipografia -> variáveis CSS
      ToastProvider.tsx

  features/
    reader/
      ReaderPage.tsx
      ChapterBlock.tsx
      VerseRow.tsx
      VerseMenu.tsx
      useContinuousScroll.ts
      useVerseObserver.ts
      useVerseAudio.ts
    search/
    bookmarks/
    plan/
    study/                   teologia, mapas, glossário, temáticas
    harpa/
    offline/

  lib/
    bible/
      types.ts
      books.ts               lista dos 66 livros
      loadChapter.ts         JSON + IndexedDB
      bibleUrl.ts            parse/sync de /livro/cap#vN
    storage/
      position.ts
      markers.ts
      backup.ts              exportar/importar JSON
      db.ts                  IndexedDB

  components/                Button, Modal, Sheet, Header, BottomNav, Toast
  styles/
    index.css                tailwind + variáveis CSS
```

---

## 4. Contratos das funções

### 4.1 Leitura e URL — `src/lib/bible/bibleUrl.ts`

```ts
export function parseBibleUrl(pathname: string, hash: string):
  { bookId: string; chapter: number; verse: number | null } | null;
// '/joao/3#v16' -> { bookId:'jo', chapter:3, verse:16 }
// '/' ou rota desconhecida -> null

export function syncBrowserUrl(
  bookId: string, chapter: number, verse: number | null,
  mode: 'push' | 'replace'
): void;
// history.pushState / replaceState, sem recarregar
```

### 4.2 Posição — `src/lib/storage/position.ts`

```ts
export function getPosition(): ReadingPosition | null;
export function savePosition(p: ReadingPosition): void;   // único ponto de gravação
export function patchPosition(part: Partial<ReadingPosition>): void;
```

### 4.3 Texto — `src/lib/bible/loadChapter.ts`

```ts
export async function loadChapter(
  bookId: string, chapter: number, translation: Translation
): Promise<Chapter>;
// 1) IndexedDB  2) fetch('/data/...')  3) guarda no IndexedDB
// lança erro só se as duas fontes falharem
```

### 4.4 Rolagem contínua — `src/features/reader/useContinuousScroll.ts`

```ts
export function useContinuousScroll(opts: {
  bookId: string;
  chapter: number;
  maxChapters?: number;   // padrão 3
}): {
  loaded: { bookId: string; chapter: number }[];
  topRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  visibleChapter: number;
};
```
- Sentinela no topo e no fim, com `IntersectionObserver`.
- Ao crescer: `const h = document.documentElement.scrollHeight` antes; depois de renderizar, `window.scrollBy(0, novo - h)`.
- Mantém no máximo 3 capítulos no DOM (`content-visibility: auto`).
- Para nos limites: antes de Gênesis 1 e depois de Apocalipse 22.

### 4.5 Áudio — `src/features/reader/useVerseAudio.ts`

```ts
export function useVerseAudio(opts: {
  getVerses: () => { id: string; text: string }[];  // do capítulo visível
  voice: 'male' | 'female' | 'device';
}): {
  isPlaying: boolean;
  activeVerseId: string | null;
  play: (startIndex?: number) => void;
  stop: () => void;
};
```
- Contador de sessão (`sessionRef`). `stop()` incrementa; todo `onend`/`onerror` confere a sessão e sai se mudou.
- Não rola a tela depois que o usuário rola (`wheel` / `touchmove`).
- Ao fim do capítulo, avança para o próximo capítulo carregado.
- Lê só o texto puro (`data-verse-text`), sem número, ícone nem nota.

---

## 5. Ordem de construção (com critério de aceite)

Não passe para a etapa seguinte sem testar a anterior no celular.

### Etapa 1 — Base
Criar o projeto, com versões fixadas. `npm run lint` e `npm run build` limpos. `vercel.json` com o rewrite. Tailwind configurado.
**Aceite:** a página abre com "Olá" e o build passa.

### Etapa 2 — Dados
JSON de um livro gerado (Gênesis). `books.ts` com os 66 livros. `loadChapter` lendo do JSON.
**Aceite:** um `<pre>` mostra os 31 versículos de Gênesis 1.

### Etapa 3 — Leitura
Tela de leitura com capítulo, versículos, cabeçalho medido (`--header-h`) e nada atrás dele.
**Aceite:** rolar até o fim é confortável e o texto nunca fica coberto.

### Etapa 4 — Posição e URL
`parseBibleUrl`, `syncBrowserUrl`, gravar o **versículo do topo visível** (debounce de 500 ms).
**Aceite:** fechar e reabrir volta ao mesmo versículo. `/joao/3#v16` abre destacado.

### Etapa 5 — Rolagem contínua
`useContinuousScroll`, com sentinelas, preservação de posição e limite de 3 capítulos.
**Aceite:** ao passar do fim do capítulo, o próximo aparece sem pulo e a URL acompanha.

### Etapa 6 — Navegação e busca
Índice de livros, barra inferior no celular, menu "Mais", busca no texto.
**Aceite:** celular tem 1 navegação, computador tem outra. Nenhuma duplicada.

### Etapa 7 — Marcadores e notas
Cor, nota, lista de marcadores, pulso dourado discreto (2 ciclos, `opacity`, respeitando `prefers-reduced-motion`).
**Aceite:** marcar, reabrir o app e o marcador volta com o pulso uma vez.

### Etapa 8 — Offline
Baixar livro inteiro, progresso e tamanho, funcionar sem internet, indicador de offline.
**Aceite:** em modo avião, um livro baixado abre e rola normalmente.

### Etapa 9 — Áudio
`useVerseAudio` completo.
**Aceite:** parar cala na hora; o áudio lê só o versículo e não briga com a rolagem.

### Etapa 10 — Conteúdo extra
Plano de leitura, Harpa Cristã, palavras difíceis, notas de estudo, mapas, aulas.
**Aceite:** cada aba carrega sob demanda (`React.lazy`) e não pesa na abertura.

### Etapa 11 — Acabamento
Temas (claro, sépia, noturno), tipografia (fonte, tamanho, entrelinha), acessibilidade, backup exportar/importar.
**Aceite:** contraste AA, alvos de 44 px, `aria-label` nos botões de ícone, fonte ajustável.

---

## 6. O que herdar do app antigo

**Dados, sim:**
- Lista dos 66 livros, com nome, abreviação, testamento, capítulos, grupo, tema, autor, período e resumo.
- Palavras difíceis com original e significado.
- Notas de estudo por versículo.
- Catálogo da Harpa Cristã.
- Referências cruzadas.
- Plano de leitura 365.

**Código, com cuidado:**
- A ideia da posição pelo versículo do topo (do `BibleReader` corrigido).
- O tratamento do gesto de deslizar.
- O `sw.js` com aviso de nova versão.

**Não trazer:**
- O `App.tsx` com 30 imports e todo o estado.
- A gravação de posição espalhada.
- Os quatro menus.
- Os painéis de diagnóstico e o simulador de celular.

---

## 7. Identidade visual

- **Logo leão e cordeiro:** usar a versão sem o selo "Made with AI", com fundo transparente.
- **Ícone do app:** o da Bíblia com cruz. Gerar 192, 512 e a versão maskable com margem de segurança.
- **Paleta:** fundo escuro azul-marinho, dourado âmbar para destaque, branco suave no texto. Manter o sépia e o claro.
- **Fontes:** uma serifada para o texto bíblico (Lora serve) e uma sem serifa para a interface (Plus Jakarta Sans serve). Carregar com `font-display: swap`.

---

## 8. Pendências do dono

- [ ] Licença de NVI e NAA (resposta já solicitada). Até então, deixar essas versões desativadas em qualquer endereço público.
- [ ] Autorização das apostilas de teologia (o PDF de origem traz "Apostila Excel - SATE 2021").
- [ ] Revisar as referências bíblicas das aulas (há erros como "Salmos 21:105" e "1 Coríntios 5:36 e 38").
- [ ] Corrigir a frase "a lua é um planeta maior que a terra" na aula do céu e firmamento.
- [ ] Domínio próprio, se o app sair do endereço de prototipagem.

---

## 9. Como pedir para uma IA

1. Cole este documento inteiro e diga: "vamos fazer a Etapa N".
2. Uma etapa por vez, com o critério de aceite escrito.
3. Exija `npm run build` e `npm run lint` limpos ao fim de cada etapa.
4. Mande o modelo de dados antes de qualquer tela.
5. Se a IA criar um arquivo que não está na estrutura, questione.
