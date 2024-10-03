
/* Arquivo responsável por conter as requisições com a api */

const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos');
            return response.json;
        } catch {
            alert('Erro ao buscar pensamentos')
        }
    }
}

export default api;


