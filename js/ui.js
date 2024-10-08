
/* arquivo responsavel por exibir os pensamentos na tela */

const ui = {

    async renderizarPensamentos(pensamentosFiltrados = null) {

        const listaPensamentos = document.getElementById("lista-pensamentos");

        try {
            let pensamentosParaRenderizar

            if (pensamentosFiltrados) {
                pensamentosParaRenderizar = pensamentosFiltrados
            } else {
                pensamentosParaRenderizar = await api.buscarPensamentos();
            }

            listaPensamentos.innerHTML = "";

            // Verifica se a lista de pensamentos está vazia
            if (pensamentosParaRenderizar.length === 0) {
                listaPensamentos.innerHTML = `
                    <div class="mensagem-vazia">
                        <img src="assets/imagens/lista-vazia.png" alt="Nenhum pensamento encontrado">
                        <p>Seu mural de pensamentos está vazio. Adicione um novo pensamento!</p>
                    </div>
                `;
            } else {
                // Caso haja pensamentos, renderiza-os
                pensamentosParaRenderizar.forEach(ui.adicionarPensamentoNaLista);
            }
        } catch {
            alert('Erro ao renderizar pensamentos')
        }
    }, 

    //preenchimento automatico de formulario ao clicar em icone editar
    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
        document.getElementById("pensamento-autoria").value = pensamento.autoria;
        
        // Exibir a data no formato yyyy-mm-dd corretamente
        const dataUtc = new Date(pensamento.data).toISOString().split("T")[0];
        document.getElementById("pensamento-data").value = dataUtc;
    },

    //cadastrar, editar e excluir pensamentos da interface
    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const li = document.createElement("li");
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");

        const iconeAspas = document.createElement("img");
        iconeAspas.src = "assets/imagens/aspas-azuis.png";
        iconeAspas.alt = "Aspas azuis";
        iconeAspas.classList.add("icone-aspas");

        const pensamentoConteudo = document.createElement("div");
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add("pensamento-conteudo");

        const pensamentoAutoria = document.createElement("div");
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add("pensamento-autoria");

        const pensamentoData = document.createElement("div");
        // Utiliza UTC para formatar a data sem o fuso horário local
        const dataFormatada = new Date(pensamento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        pensamentoData.textContent = dataFormatada;
        pensamentoData.classList.add("pensamento-data");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => {
            ui.preencherFormulario(pensamento.id);

            // Rolar suavemente até o topo (onde o formulário está)
            document.getElementById("form-container").scrollIntoView({ behavior: "smooth" });
        };

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos();
            } catch (error) {
                alert("Erro ao excluir pensamento", error)
            }
        }

        const botaoFavorito = document.createElement("button");
        botaoFavorito.classList.add("botao-favorito");
        botaoFavorito.onclick = async () => {
            try {
                await api.atualizarFavorito(pensamento.id, !pensamento.favorito);
                ui.renderizarPensamentos();
            } catch (error) {
                alert("Erro ao atualizar pensamento");
                throw error
            }
        }

        const iconeFavorito = document.createElement("img");
        iconeFavorito.src = pensamento.favorito ? "assets/imagens/icone-favorito.png" : "assets/imagens/icone-favorito_outline.png";
        iconeFavorito.alt = "Ícone de favorito";
        botaoFavorito.appendChild(iconeFavorito);

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeEditar.alt = "Editar";
        botaoEditar.appendChild(iconeEditar);

        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "Excluir";
        botaoExcluir.appendChild(iconeExcluir);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoFavorito);
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(pensamentoData);
        li.appendChild(icones);
        listaPensamentos.appendChild(li);

    }
}


