
/* arquivo responsavel pela logica principal do carregamento da aplicação,   */

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById("pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);

});

//cadastrar novo pensamento
async function manipularSubmissaoFormulario(event) {
    event.preventDefault();

    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        await api.salvarPensamento({ conteudo, autoria });
        ui.renderizarPensamentos();
    } catch {
        alert("Erro ao salvar pensamento");
    }

}

