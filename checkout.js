let carrinho = [];
let etapaAtual = 1;
let enderecoSelecionado = 0;
let freteSelecionado = 'padrao';
let descontoCupom = 0;

const WHATSAPP_NUMERO = '5511999999999';
const PIX_CHAVE = '00.000.000/0001-00';

const precosFrete = {
    padrao: 14.90,
    expresso: 24.90,
    sedex: 34.90,
    gratis: 0
};

const nomesFrete = {
    padrao: 'Padr\u00e3o (7-12 dias \u00fateis)',
    expresso: 'Expresso (3-5 dias \u00fateis)',
    sedex: 'SEDEX (1-2 dias \u00fateis)',
    gratis: 'Retirada na loja (Gr\u00e1tis)'
};

const prazosEntrega = {
    padrao: '7 a 12 dias \u00fateis',
    expresso: '3 a 5 dias \u00fateis',
    sedex: '1 a 2 dias \u00fateis',
    gratis: 'Retirada imediata'
};

const enderecos = [
    {
        apelido: 'Casa',
        rua: 'Rua das Flores, 123',
        bairro: 'Jardim Primavera',
        cidade: 'S\u00e3o Paulo',
        estado: 'SP',
        cep: '01234-567'
    },
    {
        apelido: 'Trabalho',
        rua: 'Av. Paulista, 1000',
        bairro: 'Bela Vista',
        cidade: 'S\u00e3o Paulo',
        estado: 'SP',
        cep: '01310-100'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    carrinho = JSON.parse(localStorage.getItem('carrinhoCheckout')) || [];

    if (carrinho.length === 0) {
        mostrarCarrinhoVazio();
        return;
    }

    renderizarSidebar();
    setupEventListeners();
    irParaEtapa(1);
});

function setupEventListeners() {
    document.querySelectorAll('.endereco-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.endereco-card').forEach(c => c.classList.remove('selecionado'));
            card.classList.add('selecionado');
            enderecoSelecionado = parseInt(card.dataset.endereco);
        });
    });

    document.getElementById('btnNovoEndereco').addEventListener('click', () => {
        document.getElementById('formNovoEndereco').style.display = 'block';
        document.getElementById('btnNovoEndereco').style.display = 'none';
    });

    document.getElementById('btnCancelarEndereco').addEventListener('click', () => {
        document.getElementById('formNovoEndereco').style.display = 'none';
        document.getElementById('btnNovoEndereco').style.display = 'flex';
    });

    document.getElementById('btnSalvarEndereco').addEventListener('click', salvarNovoEndereco);
    document.getElementById('btnBuscarCep').addEventListener('click', buscarCep);

    document.querySelectorAll('.frete-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.frete-option').forEach(o => o.classList.remove('selecionado'));
            option.classList.add('selecionado');
            freteSelecionado = option.dataset.frete;
            atualizarSidebar();
        });
    });

    document.getElementById('btnAplicarCupom').addEventListener('click', aplicarCupom);
    document.getElementById('btnConfirmarPedido').addEventListener('click', confirmarPedido);
    document.getElementById('btnCopiarPix').addEventListener('click', copiarPix);
    document.getElementById('btnWhatsApp').addEventListener('click', enviarWhatsApp);

    document.querySelectorAll('[data-proximo]').forEach(btn => {
        btn.addEventListener('click', () => irParaEtapa(parseInt(btn.dataset.proximo)));
    });

    document.querySelectorAll('[data-voltar]').forEach(btn => {
        btn.addEventListener('click', () => irParaEtapa(parseInt(btn.dataset.voltar)));
    });

    document.querySelectorAll('[data-etapa]').forEach(btn => {
        btn.addEventListener('click', () => irParaEtapa(parseInt(btn.dataset.etapa)));
    });
}

function irParaEtapa(numero) {
    if (numero > etapaAtual) {
        if (etapaAtual === 1 && !enderecoValido()) return;
    }

    etapaAtual = numero;

    document.querySelectorAll('.checkout-etapa').forEach(e => e.classList.remove('ativo'));
    document.getElementById(`etapa${numero}`).classList.add('ativo');

    document.querySelectorAll('.progress-step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('ativo', 'completo');
        if (stepNum === numero) step.classList.add('ativo');
        else if (stepNum < numero) step.classList.add('completo');
    });

    document.querySelectorAll('.progress-line').forEach((line, index) => {
        line.classList.toggle('completo', index < numero - 1);
    });

    if (numero === 2) atualizarResumoEnderecoFrete();
    if (numero === 3) renderizarResumoConfirmacao();

    atualizarSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function enderecoValido() {
    return enderecoSelecionado !== null;
}

function atualizarResumoEnderecoFrete() {
    const end = enderecos[enderecoSelecionado];
    if (end) {
        document.getElementById('enderecoSelecionadoTexto').textContent =
            `${end.rua} - ${end.bairro}, ${end.cidade} - ${end.estado}`;
    }
}

function renderizarResumoConfirmacao() {
    const resumoItens = document.getElementById('resumoItens');
    resumoItens.innerHTML = carrinho.map(item => `
        <div class="resumo-item">
            <div class="resumo-item-icone">${item.icone}</div>
            <div class="resumo-item-info">
                <span class="resumo-item-nome">${item.nome}</span>
                <span class="resumo-item-qtd">${item.quantidade}x R$ ${formatarPreco(item.preco)}</span>
            </div>
            <span class="resumo-item-preco">R$ ${formatarPreco(item.preco * item.quantidade)}</span>
        </div>
    `).join('');

    const end = enderecos[enderecoSelecionado];
    if (end) {
        document.getElementById('resumoEndereco').textContent =
            `${end.rua} - ${end.bairro}, ${end.cidade} - ${end.estado}, ${end.cep}`;
    }

    document.getElementById('resumoFrete').textContent = nomesFrete[freteSelecionado];
}

function renderizarSidebar() {
    const sidebarItens = document.getElementById('sidebarItens');

    if (carrinho.length === 0) {
        sidebarItens.innerHTML = '<p style="color:var(--ink-light);text-align:center;padding:20px;font-size:0.85rem;">Nenhum item</p>';
        atualizarSidebar();
        return;
    }

    sidebarItens.innerHTML = carrinho.map(item => `
        <div class="sidebar-item">
            <div class="sidebar-item-icone">${item.icone}</div>
            <div class="sidebar-item-info">
                <span class="sidebar-item-nome">${item.nome}</span>
                <span class="sidebar-item-qtd">${item.quantidade}x</span>
            </div>
            <span class="sidebar-item-preco">R$ ${formatarPreco(item.preco * item.quantidade)}</span>
        </div>
    `).join('');

    atualizarSidebar();
}

function atualizarSidebar() {
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const frete = precosFrete[freteSelecionado] || 0;
    let desconto = descontoCupom;

    const total = subtotal + frete - desconto;

    document.getElementById('sidebarSubtotal').textContent = `R$ ${formatarPreco(subtotal)}`;
    document.getElementById('sidebarFrete').textContent = frete === 0 ? 'Gr\u00e1tis' : `R$ ${formatarPreco(frete)}`;

    const linhaDesconto = document.getElementById('linhaDesconto');
    if (desconto > 0) {
        linhaDesconto.style.display = 'flex';
        document.getElementById('sidebarDesconto').textContent = `- R$ ${formatarPreco(desconto)}`;
    } else {
        linhaDesconto.style.display = 'none';
    }

    document.getElementById('sidebarTotal').textContent = `R$ ${formatarPreco(total)}`;
}

function salvarNovoEndereco() {
    const apelido = document.getElementById('enderecoApelido').value.trim();
    const rua = document.getElementById('enderecoRua').value.trim();
    const numero = document.getElementById('enderecoNumero').value.trim();
    const bairro = document.getElementById('enderecoBairro').value.trim();
    const cidade = document.getElementById('enderecoCidade').value.trim();
    const estado = document.getElementById('enderecoEstado').value;
    const cep = document.getElementById('enderecoCep').value.trim();

    if (!apelido || !rua || !numero || !bairro || !cidade || !estado) {
        alert('Preencha todos os campos obrigatorios.');
        return;
    }

    enderecos.push({
        apelido,
        rua: `${rua}, ${numero}`,
        bairro,
        cidade,
        estado,
        cep
    });

    enderecoSelecionado = enderecos.length - 1;

    const container = document.getElementById('enderecosSalvos');
    container.innerHTML = enderecos.map((end, i) => `
        <div class="endereco-card ${i === enderecoSelecionado ? 'selecionado' : ''}" data-endereco="${i}">
            <div class="endereco-radio"><div class="radio-dot"></div></div>
            <div class="endereco-info">
                <strong>${end.apelido}</strong>
                <p>${end.rua} - ${end.bairro}</p>
                <p>${end.cidade} - ${end.estado}, ${end.cep}</p>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.endereco-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.endereco-card').forEach(c => c.classList.remove('selecionado'));
            card.classList.add('selecionado');
            enderecoSelecionado = parseInt(card.dataset.endereco);
        });
    });

    document.getElementById('formNovoEndereco').style.display = 'none';
    document.getElementById('btnNovoEndereco').style.display = 'flex';
    ['enderecoApelido', 'enderecoCep', 'enderecoRua', 'enderecoNumero',
     'enderecoComplemento', 'enderecoBairro', 'enderecoCidade', 'enderecoTelefone'
    ].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById('enderecoEstado').value = '';
}

function buscarCep() {
    const cep = document.getElementById('enderecoCep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('Digite um CEP valido com 8 digitos.');
        return;
    }

    const btn = document.getElementById('btnBuscarCep');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) { alert('CEP nao encontrado.'); return; }
            document.getElementById('enderecoRua').value = data.logradouro || '';
            document.getElementById('enderecoBairro').value = data.bairro || '';
            document.getElementById('enderecoCidade').value = data.localidade || '';
            document.getElementById('enderecoEstado').value = data.uf || '';
        })
        .catch(() => alert('Erro ao buscar CEP.'))
        .finally(() => { btn.innerHTML = '<i class="fas fa-search"></i>'; btn.disabled = false; });
}

function aplicarCupom() {
    const codigo = document.getElementById('cupomInput').value.trim().toUpperCase();
    if (!codigo) { alert('Digite um codigo de cupom.'); return; }

    const cupons = { 'DESCONTO10': 0.10, 'PRIMEIRACOMPRA': 0.15, 'CANECAS20': 0.20 };

    if (cupons[codigo]) {
        const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        descontoCupom = subtotal * cupons[codigo];
        alert(`Cupom aplicado! Desconto de ${cupons[codigo] * 100}%`);
        atualizarSidebar();
    } else {
        alert('Cupom invalido ou expirado.');
    }
}

function confirmarPedido() {
    const btn = document.getElementById('btnConfirmarPedido');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    btn.disabled = true;

    setTimeout(() => {
        const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        const frete = precosFrete[freteSelecionado] || 0;
        const total = subtotal + frete - descontoCupom;

        document.getElementById('pixChave').textContent = PIX_CHAVE;
        document.getElementById('pixValor').textContent = `R$ ${formatarPreco(total)}`;

        const msg = montarMensagemWhatsApp(total);
        document.getElementById('btnWhatsApp').href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;

        localStorage.removeItem('carrinhoCheckout');
        carrinho = [];

        irParaEtapa(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
}

function montarMensagemWhatsApp(total) {
    const end = enderecos[enderecoSelecionado];
    let msg = `*Pedido CanecasPro*\n\n`;

    carrinho.forEach(item => {
        msg += `${item.quantidade}x ${item.nome} - R$ ${formatarPreco(item.preco * item.quantidade)}\n`;
    });

    msg += `\n*Frete:* ${nomesFrete[freteSelecionado]}`;
    if (precosFrete[freteSelecionado] > 0) {
        msg += ` (R$ ${formatarPreco(precosFrete[freteSelecionado])})`;
    }
    msg += `\n*Total: R$ ${formatarPreco(total)}*\n`;

    if (end) {
        msg += `\n*Endereco:* ${end.rua} - ${end.bairro}, ${end.cidade} - ${end.estado}`;
    }

    msg += `\n\nAguardo a chave PIX para pagamento.`;
    return msg;
}

function copiarPix() {
    navigator.clipboard.writeText(PIX_CHAVE).then(() => {
        const btn = document.getElementById('btnCopiarPix');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
    });
}

function enviarWhatsApp() {
    const msg = montarMensagemWhatsApp(
        carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0) +
        (precosFrete[freteSelecionado] || 0) - descontoCupom
    );
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
}

function mostrarCarrinhoVazio() {
    const main = document.querySelector('.checkout-main');
    main.innerHTML = `
        <div class="carrinho-vazio-checkout">
            <i class="fas fa-shopping-bag"></i>
            <h3>Sua sacola esta vazia</h3>
            <p>Adicione algo antes de continuar.</p>
            <a href="index.html" class="btn-proximo" style="display:inline-flex;text-decoration:none;">Ver Produtos</a>
        </div>
    `;
    document.querySelector('.checkout-sidebar').style.display = 'none';
}

function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}