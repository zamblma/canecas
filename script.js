const produtos = [
    {
        id: 1,
        nome: "Cl\u00e1ssica Branca",
        descricao: "Porcelana pura. Simples como um caf\u00e9 bem feito.",
        preco: 49.90,
        parcelas: 3,
        categoria: "porcelana",
        badge: "Mais vendida",
        icone: "\u2615",
        bg: "#f5f0eb",
        padrao: "dots"
    },
    {
        id: 2,
        nome: "T\u00e9rmica Inox",
        descricao: "Mant\u00e9m quente por 4 horas. Feita pra quem tem pressa.",
        preco: 89.90,
        parcelas: 4,
        categoria: "termica",
        badge: "Novidade",
        icone: "\uD83E\uDED6",
        bg: "#e8e8e8",
        padrao: "lines"
    },
    {
        id: 3,
        nome: "Artesanal",
        descricao: "Feita \u00e0 m\u00e3o. Cada pe\u00e7a \u00e9 levemente diferente \u2014 e isso \u00e9 bom.",
        preco: 69.90,
        parcelas: 3,
        categoria: "ceramica",
        badge: null,
        icone: "\uD83C\uDFFA",
        bg: "#e6d5c3",
        padrao: "waves"
    },
    {
        id: 4,
        nome: "Personalizada",
        descricao: "Sua foto, seu texto. Um presente que ningu\u00e9m espera.",
        preco: 59.90,
        parcelas: 2,
        categoria: "personalizada",
        badge: "Customiz\u00e1vel",
        icone: "\uD83C\uDFA8",
        bg: "#d4e5f7",
        padrao: "circles"
    },
    {
        id: 5,
        nome: "Flores de Porcelana",
        descricao: "Estampa delicada. Eleg\u00e2ncia sem esfor\u00e7o.",
        preco: 54.90,
        parcelas: 2,
        categoria: "porcelana",
        badge: null,
        icone: "\uD83C\uDF38",
        bg: "#fdf2e9",
        padrao: "dots"
    },
    {
        id: 6,
        nome: "T\u00e9rmica Viagem",
        descricao: "Tampa herm\u00e9tica. Cabe no portamalas e na m\u00e3o.",
        preco: 79.90,
        parcelas: 3,
        categoria: "termica",
        badge: "Pr\u00e1tica",
        icone: "\uD83D\uDE97",
        bg: "#d5d5d5",
        padrao: "lines"
    },
    {
        id: 7,
        nome: "R\u00fastica",
        descricao: "Esmalte especial. Parece que j\u00e1 tem hist\u00f3ria.",
        preco: 64.90,
        parcelas: 3,
        categoria: "ceramica",
        badge: null,
        icone: "\uD83E\uDED5",
        bg: "#ddd5f0",
        padrao: "waves"
    },
    {
        id: 8,
        nome: "Kit 4 Cores",
        descricao: "Quatro canecas vibrantes. Presente certo.",
        preco: 149.90,
        parcelas: 5,
        categoria: "ceramica",
        badge: "Oferta",
        icone: "\uD83C\uDF81",
        bg: "#f7d6d0",
        padrao: "circles"
    },
    {
        id: 9,
        nome: "Estampa Pet",
        descricao: "Gatinho estampado. Para quem entende.",
        preco: 44.90,
        parcelas: 2,
        categoria: "personalizada",
        badge: null,
        icone: "\uD83D\uDC31",
        bg: "#fce4ec",
        padrao: "dots"
    },
    {
        id: 10,
        nome: "Vidro Dupla Parede",
        descricao: "Parede dupla de vidro. N\u00e3o queima, n\u00e3o emba\u00e7a.",
        preco: 99.90,
        parcelas: 4,
        categoria: "termica",
        badge: "Premium",
        icone: "\u2728",
        bg: "#d0f0f0",
        padrao: "lines"
    },
    {
        id: 11,
        nome: "Portugal",
        descricao: "Azulejo de verdade. Importada direto de l\u00e1.",
        preco: 74.90,
        parcelas: 3,
        categoria: "porcelana",
        badge: "Edi\u00e7\u00e3o especial",
        icone: "\uD83C\uDDF5\uD83C\uDDF9",
        bg: "#c8ddf7",
        padrao: "waves"
    },
    {
        id: 12,
        nome: "Edi\u00e7\u00e3o Minions",
        descricao: "Licenciada. Para colecionadores e f\u00e3s.",
        preco: 59.90,
        parcelas: 2,
        categoria: "personalizada",
        badge: "Licenciada",
        icone: "\uD83D\uDC9B",
        bg: "#fef3c7",
        padrao: "circles"
    }
];

function gerarSvgPadrao(tipo, cor) {
    const c = cor || '#000';
    const padroes = {
        dots: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="${c}" opacity="0.12"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
        lines: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="12" stroke="${c}" stroke-width="0.8" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
        waves: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="40" height="20" patternUnits="userSpaceOnUse"><path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke="${c}" stroke-width="0.8" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
        circles: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="10" fill="none" stroke="${c}" stroke-width="0.6" opacity="0.08"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`
    };
    return 'data:image/svg+xml,' + encodeURIComponent(padroes[tipo] || padroes.dots);
}

let carrinho = [];
let favoritos = [];
let categoriaAtual = 'todos';

const produtosGrid = document.getElementById('produtosGrid');
const carrinhoBtn = document.getElementById('carrinhoBtn');
const carrinhoCount = document.getElementById('carrinhoCount');
const modalCarrinho = document.getElementById('modalCarrinho');
const fecharModal = document.getElementById('fecharModal');
const carrinhoItens = document.getElementById('carrinhoItens');
const carrinhoVazio = document.getElementById('carrinhoVazio');
const modalFooter = document.getElementById('modalFooter');
const totalCarrinho = document.getElementById('totalCarrinho');
const finalizarCompra = document.getElementById('finalizarCompra');
const buscaInput = document.getElementById('busca');
const ordenacaoSelect = document.getElementById('ordenacao');
const filtroTags = document.querySelectorAll('.filtro-tag');
const perfilBtn = document.getElementById('perfilBtn');
const modalPerfil = document.getElementById('modalPerfil');
const fecharPerfil = document.getElementById('fecharPerfil');
const perfilTabs = document.querySelectorAll('.perfil-tab');
const favoritosGrid = document.getElementById('favoritosGrid');
const favoritosVazio = document.getElementById('favoritosVazio');
const notifBadge = document.getElementById('notifBadge');

document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(produtos);
    setupEventListeners();
});

function setupEventListeners() {
    carrinhoBtn.addEventListener('click', abrirModalCarrinho);
    fecharModal.addEventListener('click', fecharModalCarrinho);
    modalCarrinho.addEventListener('click', (e) => {
        if (e.target === modalCarrinho) fecharModalCarrinho();
    });

    buscaInput.addEventListener('input', filtrarProdutos);
    ordenacaoSelect.addEventListener('change', filtrarProdutos);

    filtroTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filtroTags.forEach(t => t.classList.remove('ativo'));
            tag.classList.add('ativo');
            categoriaAtual = tag.dataset.categoria;
            filtrarProdutos();
        });
    });

    finalizarCompra.addEventListener('click', finalizarCompraHandler);

    perfilBtn.addEventListener('click', abrirModalPerfil);
    fecharPerfil.addEventListener('click', fecharModalPerfil);
    modalPerfil.addEventListener('click', (e) => {
        if (e.target === modalPerfil) fecharModalPerfil();
    });

    perfilTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            perfilTabs.forEach(t => t.classList.remove('ativo'));
            tab.classList.add('ativo');
            const aba = tab.dataset.tab;
            document.querySelectorAll('.perfil-conteudo').forEach(c => c.classList.remove('ativo'));
            document.getElementById(`aba${capitalize(aba)}`).classList.add('ativo');
        });
    });

    document.querySelectorAll('.notif-lida').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.closest('.notif-item').classList.remove('notif-nao-lida');
            atualizarBadgeNotificacoes();
        });
    });
}

function renderizarProdutos(lista) {
    if (lista.length === 0) {
        produtosGrid.innerHTML = `
            <div class="sem-resultados">
                <i class="fas fa-search"></i>
                <h3>Nada encontrado</h3>
                <p>Tente buscar por algo diferente.</p>
            </div>`;
        return;
    }

    produtosGrid.innerHTML = lista.map(p => `
        <div class="produto-card">
            ${p.badge ? `<span class="produto-badge">${p.badge}</span>` : ''}
            <button class="produto-favorito ${favoritos.includes(p.id) ? 'ativo' : ''}" onclick="toggleFavorito(${p.id})">
                <i class="fas fa-heart"></i>
            </button>
            <div class="produto-sem-img" style="background:${p.bg}">
                <img class="produto-pattern" src="${gerarSvgPadrao(p.padrao, '#000')}" alt="">
                <span class="produto-emoji">${p.icone}</span>
            </div>
            <div class="produto-info">
                <span class="produto-categoria">${p.categoria}</span>
                <h3 class="produto-nome">${p.nome}</h3>
                <p class="produto-descricao">${p.descricao}</p>
                <div class="produto-preco">
                    <div>
                        <span class="preco-valor">R$ ${fmt(p.preco)}</span>
                        <span class="preco-parcela">ou ${p.parcelas}x R$ ${fmt(p.preco / p.parcelas)}</span>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarAoCarrinho(${p.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function fmt(v) {
    return v.toFixed(2).replace('.', ',');
}

function filtrarProdutos() {
    const busca = buscaInput.value.toLowerCase();
    let filtrados = produtos.filter(p => {
        const matchBusca = p.nome.toLowerCase().includes(busca) || p.descricao.toLowerCase().includes(busca);
        const matchCat = categoriaAtual === 'todos' || p.categoria === categoriaAtual;
        return matchBusca && matchCat;
    });

    const ord = ordenacaoSelect.value;
    if (ord === 'preco-menor') filtrados.sort((a, b) => a.preco - b.preco);
    else if (ord === 'preco-maior') filtrados.sort((a, b) => b.preco - a.preco);
    else if (ord === 'nome') filtrados.sort((a, b) => a.nome.localeCompare(b.nome));

    renderizarProdutos(filtrados);
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const existente = carrinho.find(item => item.id === id);
    if (existente) existente.quantidade++;
    else carrinho.push({ ...produto, quantidade: 1 });
    atualizarCarrinho();
    mostrarToast(`${produto.nome} na sacola`);
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
    renderizarCarrinho();
}

function alterarQuantidade(id, delta) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) removerDoCarrinho(id);
        else { atualizarCarrinho(); renderizarCarrinho(); }
    }
}

function atualizarCarrinho() {
    const total = carrinho.reduce((s, i) => s + i.quantidade, 0);
    carrinhoCount.textContent = total;
}

function renderizarCarrinho() {
    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
        carrinhoItens.innerHTML = '';
        modalFooter.classList.remove('ativo');
        return;
    }
    carrinhoVazio.style.display = 'none';
    modalFooter.classList.add('ativo');

    carrinhoItens.innerHTML = carrinho.map(item => `
        <div class="carrinho-item">
            <div class="carrinho-item-img" style="background:${item.bg}">
                <span>${item.icone}</span>
            </div>
            <div class="carrinho-item-info">
                <div class="carrinho-item-nome">${item.nome}</div>
                <div class="carrinho-item-preco">R$ ${fmt(item.preco)}</div>
            </div>
            <div class="carrinho-item-qtd">
                <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                <span>${item.quantidade}</span>
                <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
            </div>
            <button class="carrinho-item-remover" onclick="removerDoCarrinho(${item.id})">
                <i class="fas fa-xmark"></i>
            </button>
        </div>
    `).join('');

    const total = carrinho.reduce((s, i) => s + (i.preco * i.quantidade), 0);
    totalCarrinho.textContent = `R$ ${fmt(total)}`;
}

function abrirModalCarrinho() {
    modalCarrinho.classList.add('ativo');
    renderizarCarrinho();
    document.body.style.overflow = 'hidden';
}

function fecharModalCarrinho() {
    modalCarrinho.classList.remove('ativo');
    document.body.style.overflow = '';
}

function toggleFavorito(id) {
    const i = favoritos.indexOf(id);
    if (i === -1) { favoritos.push(id); mostrarToast('Favoritado'); }
    else { favoritos.splice(i, 1); mostrarToast('Removido dos favoritos'); }
    filtrarProdutos();
    renderizarFavoritosPerfil();
}

function abrirModalPerfil() {
    modalPerfil.classList.add('ativo');
    renderizarFavoritosPerfil();
    atualizarBadgeNotificacoes();
    document.body.style.overflow = 'hidden';
}

function fecharModalPerfil() {
    modalPerfil.classList.remove('ativo');
    document.body.style.overflow = '';
}

function renderizarFavoritosPerfil() {
    if (favoritos.length === 0) {
        favoritosVazio.style.display = 'block';
        favoritosGrid.innerHTML = '';
        return;
    }
    favoritosVazio.style.display = 'none';
    const favs = produtos.filter(p => favoritos.includes(p.id));
    favoritosGrid.innerHTML = favs.map(p => `
        <div class="favorito-card">
            <button class="fav-remover" onclick="toggleFavorito(${p.id})"><i class="fas fa-xmark"></i></button>
            <div class="fav-icone">${p.icone}</div>
            <div class="fav-nome">${p.nome}</div>
            <div class="fav-preco">R$ ${fmt(p.preco)}</div>
        </div>
    `).join('');
}

function atualizarBadgeNotificacoes() {
    const n = document.querySelectorAll('.notif-nao-lida').length;
    notifBadge.textContent = n;
    notifBadge.style.display = n > 0 ? 'inline' : 'none';
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function finalizarCompraHandler() {
    if (carrinho.length === 0) { mostrarToast('Sacola vazia'); return; }
    localStorage.setItem('carrinhoCheckout', JSON.stringify(carrinho));
    fecharModalCarrinho();
    window.location.href = 'checkout.html';
}

function mostrarToast(msg) {
    const antigo = document.querySelector('.toast');
    if (antigo) antigo.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check"></i><span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
}