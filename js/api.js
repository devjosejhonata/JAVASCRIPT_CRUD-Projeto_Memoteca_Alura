
/* Arquivo responsável por conter as requisições com a api */

const URL_BASE = "http://localhost:3000"

// Função corrigida para converter string de data em UTC
const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split("-");
    return new Date(Date.UTC(ano, mes - 1, dia)); // Cria a data em UTC
};


const api = {

    //buscando dados
    async buscarPensamentos() {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`);
            const pensamentos = await response.json();

            return pensamentos.map(pensamento => {
                return {
                    ...pensamento, 
                    data: new Date(pensamento.data)
                }
            })
        } catch (error) {
            alert('Erro ao buscar pensamentos')

            throw error
        }
    },
    
    //adicionando novo pensamento
    async salvarPensamento(pensamento) {
        try {

            // Converte a data da string para o formato correto
            const dataConvertida = converterStringParaData(pensamento.data);

            // Cria um novo objeto pensamento com a data convertida
            const pensamentoComData = {
                ...pensamento,
                data: dataConvertida.toISOString() // Converte para o formato ISO 8601
            };

            const response = await fetch(`${URL_BASE}/pensamentos`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                }, 
                body: JSON.stringify(pensamentoComData), 
            });
            return await response.json();
        } catch (error) {
            alert('Erro ao salvar pensamento')

            throw error
        }
    }, 
    
    //buscando pensamento escolhido por id
    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`);
            const pensamento = await response.json();

            return {
                ...pensamento, 
                data: new Date(pensamento.data)
            }
        } catch (error) {
            alert('Erro ao buscar pensamentos')

            throw error
        }
    },
    
    //editando pensamento escolhido
    async editarPensamento(pensamento) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                }, 
                body: JSON.stringify(pensamento)
            });
            return await response.json();
        } catch (error) {
            alert('Erro ao editar pensamento')

            throw error
        }
    }, 

    //deletar pensamento escolhido
    async excluirPensamento(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: "DELETE"
            });
        } catch (error) {
            alert('Erro ao excluir pensamento')

            throw error
        }
    }, 

    //buscar pensamentos
    async buscarPensamentoPorTermo(termo) {

        try {
            const pensamentos = await this.buscarPensamentos();
            const termoEmMinusculas = termo.toLowerCase();
            
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termoEmMinusculas)) || 
                pensamento.autoria.toLowerCase().includes(termoEmMinusculas)
            });
    
            return pensamentosFiltrados;
        } catch (error) {
            alert("Erro ao filtrar pensamentos");
            throw error
        }

    }, 

    //favoritar pensamento
    async atualizarFavorito(id, favorito) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: "PATCH", // Usando PATCH para atualizar apenas a propriedade que desejamos
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ favorito }) // Enviando o novo valor para a propriedade favorito
            });

            return await response.json(); // Retorna o pensamento atualizado
        } catch (error) {
            alert("Erro ao atualizar favorito");
            throw error;
        }
    }


}


