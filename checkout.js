let carrinho = [];
let etapaAtual = 1;
let enderecoSelecionado = 0;
let freteSelecionado = 'padrao';
let metodoPagamento = 'cartao';
let descontoCupom = 0;

const precosFrete = {
    padrao: 14.90,
    expresso: 24.90,
    sedex: 34.90,
    gratis: 0
};

const nomesFrete = {
    padrao: 'Frete Padr\u00e3o (7-12 dias \u00fateis)',
    expresso: 'Frete Expresso (3-5 dias \u00fateis)',
    sedex: 'SEDEX (1-2 dias \u00fateis)',
    gratis: 'Frete Gr\u00e1tis (Retira na loja)'
};

const prazosEntrega = {
    padrao: '7 a 12 dias \u00fateis',
    expresso: '3 a 5 dias \u00fateis',
    sedex: '1 a 2 dias \u00fateis',
    gratis: '10 dias \u00fateis (retira na loja)'
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

    document.querySelectorAll('.pag-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.pag-tab').forEach(t => t.classList.remove('ativo'));
            tab.classList.add('ativo');
            metodoPagamento = tab.dataset.pag;
            document.querySelectorAll('.pag-conteudo').forEach(c => c.classList.remove('ativo'));
            document.getElementById(`pag${capitalize(metodoPagamento)}`).classList.add('ativo');
        });
    });

    const cartaoNumero = document.getElementById('cartaoNumero');
    if (cartaoNumero) {
        cartaoNumero.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').substring(0, 16);
            e.target.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
        });
    }

    const cartaoValidade = document.getElementById('cartaoValidade');
    if (cartaoValidade) {
        cartaoValidade.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').substring(0, 4);
            if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
            e.target.value = v;
        });
    }

    document.getElementById('btnAplicarCupom').addEventListener('click', aplicarCupom);
    document.getElementById('btnConfirmarPedido').addEventListener('click', confirmarPedido);
    document.getElementById('cartaoParcelas').addEventListener('change', atualizarSidebar);

    document.querySelectorAll('[data-proximo]').forEach(btn => {
        btn.addEventListener('click', () => {
            irParaEtapa(parseInt(btn.dataset.proximo));
        });
    });

    document.querySelectorAll('[data-voltar]').forEach(btn => {
        btn.addEventListener('click', () => {
            irParaEtapa(parseInt(btn.dataset.voltar));
        });
    });

    document.querySelectorAll('[data-etapa]').forEach(btn => {
        btn.addEventListener('click', () => {
            irParaEtapa(parseInt(btn.dataset.etapa));
        });
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
    if (numero === 4) renderizarResumoConfirmacao();

    atualizarSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function enderecoValido() {
    if (enderecoSelecionado === null && document.getElementById('formNovoEndereco').style.display === 'none') {
        alert('Selecione ou adicione um endere\u00e7o de entrega.');
        return false;
    }
    return true;
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

    let pagTexto = '';
    if (metodoPagamento === 'cartao') {
        const num = document.getElementById('cartaoNumero').value;
        const parcelas = document.getElementById('cartaoParcelas').value;
        pagTexto = `Cart\u00e3o final ${num.slice(-4) || '****'} - ${parcelas}x`;
    } else if (metodoPagamento === 'pix') {
        pagTexto = 'PIX - 5% de desconto';
    } else {
        pagTexto = 'Boleto Banc\u00e1rio';
    }
    document.getElementById('resumoPagamento').textContent = pagTexto;
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

    if (metodoPagamento === 'pix') {
        desconto = subtotal * 0.05;
        descontoCupom = desconto;
    }

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

    const selectParcelas = document.getElementById('cartaoParcelas');
    if (selectParcelas) {
        Array.from(selectParcelas.options).forEach(opt => {
            const n = parseInt(opt.value);
            const p = total / n;
            opt.textContent = `${n}x de R$ ${formatarPreco(p)}${n <= 6 ? ' sem juros' : ''}`;
        });
    }
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
        alert('Preencha todos os campos obrigat\u00f3rios.');
        return;
    }

    const novoEndereco = {
        apelido,
        rua: `${rua}, ${numero}`,
        bairro,
        cidade,
        estado,
        cep
    };

    enderecos.push(novoEndereco);
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
            <button class="endereco-editar" title="Editar"><i class="fas fa-pen"></i></button>
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
    limparFormularioEndereco();
}

function limparFormularioEndereco() {
    ['enderecoApelido', 'enderecoCep', 'enderecoRua', 'enderecoNumero',
     'enderecoComplemento', 'enderecoBairro', 'enderecoCidade', 'enderecoTelefone'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('enderecoEstado').value = '';
}

function buscarCep() {
    const cep = document.getElementById('enderecoCep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('Digite um CEP v\u00e1lido com 8 d\u00edgitos.');
        return;
    }

    const btn = document.getElementById('btnBuscarCep');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                alert('CEP n\u00e3o encontrado.');
                return;
            }
            document.getElementById('enderecoRua').value = data.logradouro || '';
            document.getElementById('enderecoBairro').value = data.bairro || '';
            document.getElementById('enderecoCidade').value = data.localidade || '';
            document.getElementById('enderecoEstado').value = data.uf || '';
        })
        .catch(() => {
            alert('Erro ao buscar CEP. Tente novamente.');
        })
        .finally(() => {
            btn.innerHTML = '<i class="fas fa-search"></i>';
            btn.disabled = false;
        });
}

function aplicarCupom() {
    const codigo = document.getElementById('cupomInput').value.trim().toUpperCase();

    if (!codigo) {
        alert('Digite um c\u00f3digo de cupom.');
        return;
    }

    const cupons = {
        'DESCONTO10': 0.10,
        'PRIMEIRACOMPRA': 0.15,
        'CANECAS20': 0.20
    };

    if (cupons[codigo]) {
        const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        descontoCupom = subtotal * cupons[codigo];
        alert(`Cupom aplicado! Desconto de ${cupons[codigo] * 100}%`);
        atualizarSidebar();
    } else {
        alert('Cupom inv\u00e1lido ou expirado.');
    }
}

function confirmarPedido() {
    const btn = document.getElementById('btnConfirmarPedido');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    btn.disabled = true;

    setTimeout(() => {
        const numeroPedido = 'CP-' + Date.now().toString().slice(-8);

        document.getElementById('numeroPedido').textContent = numeroPedido;
        document.getElementById('prazoEntrega').textContent = prazosEntrega[freteSelecionado];

        etapaAtual = 5;
        document.querySelectorAll('.checkout-etapa').forEach(e => e.classList.remove('ativo'));
        document.getElementById('etapa5').classList.add('ativo');

        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('ativo');
            step.classList.add('completo');
        });
        document.querySelectorAll('.progress-line').forEach(l => l.classList.add('completo'));

        localStorage.removeItem('carrinhoCheckout');
        carrinho = [];

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

function mostrarCarrinhoVazio() {
    const main = document.querySelector('.checkout-main');
    main.innerHTML = `
        <div class="carrinho-vazio-checkout">
            <i class="fas fa-shopping-bag"></i>
            <h3>Sua sacola est\u00e1 vazia</h3>
            <p>Adicione algo antes de continuar.</p>
            <a href="index.html" class="btn-proximo" style="display:inline-flex;text-decoration:none;">Ver Produtos</a>
        </div>
    `;
    document.querySelector('.checkout-sidebar').style.display = 'none';
}

function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}