# Sociopedia sua rede social
## Sobre o projeto:
Sociopedia é um dos projetos que mais gostei de desenvolver, se trata de uma rede social em que usuários podem compartilhar suas postagens com foto com a comunidade, permitindo que você curta e adicione amigos a lista! 
Criei o projeto com intuito de treinar os meus conhecimentos em Node, React e MongoDB.
## Funcionalidades: 
  - Sistema de autenticação: ![image](https://github.com/devmarcoskc/sociopedia-MERN-stack/assets/118542843/4808b3a3-0f6c-41e4-9d7f-70108bd6656c)
  - Ver o feed de posts, criar um post, remove-lô: ![image](https://github.com/devmarcoskc/sociopedia-MERN-stack/assets/118542843/0f630505-bc13-40b2-995f-054f0f199320)
  - Adicionar um amigo ou remove-lô: ![image](https://github.com/devmarcoskc/sociopedia-MERN-stack/assets/118542843/344fdae4-e60c-4bf3-b888-8bd3c52f0f27) ![image](https://github.com/devmarcoskc/sociopedia-MERN-stack/assets/118542843/39d9fbfa-d624-4c5f-8c80-96cd460ce0f4)
  - Editar seu perfil: ![image](https://github.com/devmarcoskc/sociopedia-MERN-stack/assets/118542843/8dafd317-c127-44f1-abd2-0281a49aa487)
## Instalação:
Para executar o projeto siga os seguintes passos:
  1. Clone este repositório:

     https://github.com/devmarcoskc/sociopedia-MERN-stack
  2. Instale as dependências no client e server:
   
     `npm install`
  3. Crie um banco de dados com atlas mongodb:
   
    `https://www.mongodb.com/atlas/database`
  4. Na pasta server crie um arquivo de ambiente ".env" e adicione as seguintes variáveis:

     `JWT_SECRET = 'adicione uma senha forte aqui'`
   
     `MONGO_URL = 'adicione aqui a URL do seu banco de dados criado'`
   
     `PORT = 'escolha uma porta para rodar o seu server'.`
   
  6. Na pasta client crie um arquivo de ambiente ".env" e adicione a seguinte variável:
   
    `VITE_BASE_URL = 'http://localhost:SUA PORTA ESCOLHIDA AQUI'`
    
  7. Para rodar o Back End use o seguinte comando:

   `npm run start`
   
  8. Para rodar no Front End use o seguinte comando:

   `npm run dev`
