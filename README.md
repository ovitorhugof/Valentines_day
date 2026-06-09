# Isabela & Vitor Hugo 💕

Site romântico estático — funciona direto no GitHub Pages, sem servidor, sem build, sem dependências.

---

## Estrutura de arquivos

```
namorados/
├── index.html       ← estrutura e conteúdo
├── style.css        ← visual e responsivo
├── script.js        ← contador e lightbox
├── images/          ← pasta das fotos (você adiciona)
│   ├── placeholder-casal.jpg     ← foto principal (seção após o hero)
│   ├── hero-bg.jpg               ← foto de fundo da capa (opcional)
│   ├── momento-1.jpg             ← fotos dos momentos na timeline
│   ├── momento-2.jpg
│   ├── momento-3.jpg
│   ├── galeria-1.jpg             ← fotos da galeria (6 no total)
│   ├── galeria-2.jpg
│   ├── galeria-3.jpg
│   ├── galeria-4.jpg
│   ├── galeria-5.jpg
│   └── galeria-6.jpg
└── README.md
```

---

## O que personalizar

### 1. Fotos
Coloque as fotos na pasta `images/` com os nomes exatos acima.
Enquanto não tiver a foto, o site mostra um placeholder automático — não vai quebrar.

| Arquivo | Seção | Tamanho sugerido |
|---|---|---|
| `placeholder-casal.jpg` | Foto destaque | 900 × 600 px |
| `hero-bg.jpg` | Fundo da capa | 1920 × 1080 px |
| `momento-1.jpg` etc | Timeline | 600 × 450 px |
| `galeria-1.jpg` etc | Galeria | 600 × 600 px (quadrada) |

### 2. Textos dos momentos
Em `index.html`, procure pelos comentários `<!-- INSTRUÇÃO -->` e preencha:
- Data do momento (`<span class="momento-data">`)
- Título (`<h3>`)
- Descrição (`<p>`)

### 3. Adicionar mais momentos
Copie um bloco `.momento` e cole após o último. Alterne entre `class="momento left"` e `class="momento right"` para o efeito de alternância.

### 4. Carta
Em `index.html`, na seção `<!-- CARTA -->`, substitua os parágrafos de exemplo pelo texto real.

### 5. Foto de fundo da capa (opcional)
Em `style.css`, na regra `.hero`, descomente a linha:
```css
background-image: url('images/hero-bg.jpg');
```

### 6. Cores
As cores ficam no topo do `style.css` em `:root`. Principais:
- `--rosa`: cor de destaque
- `--vinho`: cor escura (cabeçalhos, hero)
- `--creme`: fundo geral

---

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (pode ser privado)
2. Faça upload de todos os arquivos (incluindo a pasta `images/`)
3. Em **Settings → Pages**, selecione a branch `main` e a pasta raiz `/`
4. O site ficará disponível em `https://seuusuario.github.io/nome-do-repositorio`

---

## Funcionalidades

- Contador ao vivo (anos, meses, dias, horas, minutos, segundos)
- Timeline de momentos com animação de entrada
- Galeria com lightbox (clica na foto, abre ampliada)
- Design responsivo (celular e desktop)
- Placeholders automáticos enquanto as fotos não estão adicionadas
- Fontes do Google Fonts (Playfair Display + Lato)

---

Feito com amor 💕
