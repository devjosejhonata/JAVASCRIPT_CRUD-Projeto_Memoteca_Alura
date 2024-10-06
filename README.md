Projeto desenvolvido em Javascript, onde teremos a funcionalidade de colecionar nossas memorias, um mural. Será feito a comunicação entre cliente-servidor, projeto desenvolvido para praticar requisições entre frontend e backend, praticando os metodos post, put, delete e get. Está sendo utilizado uma API fake utilizando o JSON Server para fazer a conexão e obter os dados. Poderemos cadastrar um novo pensamento no mural, buscar as informações do pensamento, fazer pesquisa, fazer a edição, exclusão de um pensamento e favoritar um pensamento.

JSON Server instalado: npm install -g json-server

Para executar o projeto, dentro da pasta backend: npm start

Para executar o frontend, localhost:5500 ou abrir com a extensão live server.

Estou separando as funcionalidades do projeto por arquivos, como estou utilizando o package.json na pasta raiz do projeto, eu ja informei no arquivo package.json que estou trabalhando com módulos, sendo assim eu nao preciso ficar fazendo o export e import nos arquivos que contem suas funcionalidades, só chamar a função diretamente no bloco de código.

Para fazer as requisições HTTP, estou utilizando o metodo fetch que é nativo do javascript, existem outras abordagens como utilizar a biblioteca Axios, mas eu preferi manter as funcionalidades com o fetch.
![imgprojetopronto1](https://github.com/user-attachments/assets/8e124e9c-f973-40b1-bbb8-1b2c8c457489)
![imgprojetopronto2](https://github.com/user-attachments/assets/a5b1b6d7-ea05-4369-a01c-67049effaa0e)
![imgprojetopronto3](https://github.com/user-attachments/assets/ffad584c-c236-40d1-be2f-d7e39b64eb50)
![imgprojetopronto4](https://github.com/user-attachments/assets/f36e6793-4ade-4210-8674-e49f37e2d825)
![imgprojetopronto5](https://github.com/user-attachments/assets/9db3b1c9-66d8-4ae8-be6a-e5fe177c5635)
