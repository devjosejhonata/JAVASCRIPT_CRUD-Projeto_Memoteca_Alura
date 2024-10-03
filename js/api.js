
/* Arquivo responsável por conter as requisições com a api */

const api = {

    //buscando dados
    async buscarPensamentos() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos');
            return await response.json();
        } catch (error) {
            alert('Erro ao buscar pensamentos')

            throw error
        }
    },
    
    //adicionando novo pensamento
    async salvarPensamento(pensamento) {
        try {
            const response = await fetch('http://localhost:3000/pensamentos', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                }, 
                body: JSON.stringify(pensamento)
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
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`);
            return await response.json();
        } catch (error) {
            alert('Erro ao buscar pensamentos')

            throw error
        }
    },
    
    //editando pensamento escolhido
    async editarPensamento(pensamento) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
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
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`, {
                method: "DELETE"
            });
        } catch (error) {
            alert('Erro ao excluir pensamento')

            throw error
        }
    }

}


