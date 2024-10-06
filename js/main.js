
/* arquivo responsavel pela logica principal do carregamento da aplicação,   */

// para a chave de cada pensamento e evitar pensamentos duplicados
const pensamentosSet = new Set()

async function adicionarChaveAoPensamento() {
    try {
      const pensamentos = await api.buscarPensamentos()
      pensamentos.forEach(pensamento => {

        // Chave composta apenas pelo conteúdo do pensamento
        const chavePensamento = pensamento.conteudo.trim().toLowerCase();
        pensamentosSet.add(chavePensamento);
        
      })
    } catch (error) {
      alert('Erro ao adicionar chave ao pensamento')
    }
}

//validações de conteudo e autoria
const regexConteudo = /^.{10,120}$/; // Aceita qualquer caractere entre 10 e 120
const regexAutoria = /^.{3,30}$/;     // Aceita qualquer caractere entre 3 e 30


function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo);
}

function validarAutoria(autoria) {
    return regexAutoria.test(autoria);
}

//função para remover espaços vazios
function removerEspacos(string) {
    return string.replaceAll(/\s+/g, '')
}


document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();
    adicionarChaveAoPensamento();
    
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

    //validações do formulario 
    if (!validarConteudo(conteudo) || !removerEspacos(conteudo)) {
        alert("Não é permitido espaços vazios e É permitida a inclusão apenas de letras e espaços com no mínimo 10 caracteres e no máximo 150 caracteres")
        return
    }

    if (!validarAutoria(autoria)) {
        alert("A autoria deve conter apenas letras e ter entre 3 e 15 caracteres e sem espaços vazios");
        return
    }
    
    if(!validarData(data)) {
        alert("Não é permitido o cadastro de datas futuras. Selecione outra data")
        return
    }
    
    //Funcionalidade para evitar pensamentos duplicados ao cadastrar 
    const chaveNovoPensamento = conteudo.trim().toLowerCase();    

    if(pensamentosSet.has(chaveNovoPensamento)) {
        alert('Esse pensamento já existe')
        return
    }

    //try e catch para editar e salvar novo pensamento
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

    // Zera horas, minutos e segundos da data atual
    dataAtual.setHours(0, 0, 0, 0);

    // Converte a data inserida
    const dataInserida = new Date(data);

    // Zera horas, minutos e segundos da data inserida
    dataInserida.setHours(0, 0, 0, 0);

    console.log('Data atual:', dataAtual); // Log da data atual
    console.log('Data inserida:', dataInserida); // Log da data inserida

    // Verifica se a data inserida é maior que a data atual
    return dataInserida < dataAtual; // A data deve ser estritamente anterior à atual
}


