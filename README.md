: PROJETO EM FASE DE DESENVOLVIMENTO :

Projeto desenvolvido em Javascript, onde teremos a funcionalidade de colecionar nossas memorias, um mural. Será feito a comunicação entre cliente-servidor, projeto desenvolvido para praticar requisições entre frontend e backend, praticando os metodos post, put, delete e get. Está sendo utilizado uma API fake utilizando o JSON Server para fazer a conexão e obter os dados. Poderemos cadastrar um novo pensamento no mural, buscar as informações do pensamento, fazer pesquisa, fazer a edição, exclusão de um pensamento e favoritar um pensamento.

JSON Server instalado: npm install -g json-server

Para executar o projeto, dentro da pasta backend: npm start

Para executar o frontend, localhost:5500 ou abrir com a extensão live server.

Estou separando as funcionalidades do projeto por arquivos, como estou utilizando o package.json na pasta raiz do projeto, eu ja informei no arquivo package.json que estou trabalhando com módulos, sendo assim eu nao preciso ficar fazendo o export e import nos arquivos que contem suas funcionalidades, só chamar a função diretamente no bloco de código.