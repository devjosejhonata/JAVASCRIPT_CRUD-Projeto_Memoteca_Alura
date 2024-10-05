
/* arquivo responsavel pela logica principal do carregamento da aplicação,   */

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();
    
    //adicionar
    const formularioPensamento = document.getElementById("pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
    
    //cancelar
    const botaoCancelar = document.getElementById("botao-cancelar");
    botaoCancelar.addEventListener("click", limparFormulario);

    //pesquisar pensamento
    const inputBusca = document.getElementById("campo-busca");
    inputBusca.addEventListener("input", manipularBusca);

});

//cadastrar novo pensamento
async function manipularSubmissaoFormulario(event) {
    event.preventDefault();

    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    const data = document.getElementById("pensamento-data").value;

    if(!validarData(data)) {
        alert("Não é permitido o cadastro de datas futuras. Selecione outra data")
        return
    }

    try {
        if (id) {
            await api.editarPensamento({ id, conteudo, autoria, data });
        } else {
            await api.salvarPensamento({ conteudo, autoria, data });
        }
        ui.renderizarPensamentos();
    } catch {
        alert("Erro ao salvar pensamento");
    }

}

// Função para limpar os campos do formulário
function limparFormulario() {
    document.getElementById("pensamento-conteudo").value = ''; // Limpa o campo de conteúdo
    document.getElementById("pensamento-autoria").value = ''; // Limpa o campo de autoria
    document.getElementById("pensamento-id").value = ''; // Limpa o campo de ID (se estiver em uso)
}

//função para pesquisar pensamento
async function manipularBusca() {
    const termoBusca = document.getElementById("campo-busca").value;

    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca);
      
        ui.renderizarPensamentos(pensamentosFiltrados)
    } catch (error) {
        alert("erro ao realizar busca");
        throw error
    }
}

// função para manipular data
function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
}


