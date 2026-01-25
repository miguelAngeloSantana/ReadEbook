# ReadFree

## descrição
Site para pesquisar ebooks, podendo abaixa-los, ler eles no prórpio navegador ou comprar eles diretamente na playstore

## Tecnologias
1. NextJs
2. ReactJS
3. Better-auth
4. Tailwindcss
5. prisma
6. PostgreSQL
7. Lucide React

## Funcionalidades
- Download de eBooks
- Exibir outras obras do mesmo autor e/ou do mesmo gênero
- Marcar livros já lidos
- Utilizam do better-auth para registrar usuários
- Salvar usuarios cadastrados no prisma

## Processo
A idea desse projeto veio da vontade de utilizar alguma api do Google, no caso eu utilizei a Google Book API. Como já tinha muitos projetos usando essa api voltada para livros, eu resolvi usar ela para mostrar ebooks. 

Com a ideia do projeto já em mente, escrevi em um bloco de notas quais funcionalidades o site teria, depois, peguei essas funcionalidade e separei elas onde cada uma ia se encaixar nas telas. Com tudo já separado, usei o Figma para fazer o prototipo do site.

A escolha do PostgreSQL como banco de dados se deu pelo fato que esse projeto precisa ter mais disponibilidade do que latencia, pois foi essa foi uma critica que se repetiu muito quando fui analisar os concorrentes do projeto. O PostgreSQL me entregava mais disponobilidade e uma facil manutenção com o prisma. O prisma foi escolhido para ser usado pois facilitava a itegração com o banco de dados, além de ser um ORM que eu estavá estudando.

Apos iniciar o projeto e fazer todas as funcionalidades descritas, me veio a idea e a oportunidade de implementar autenticação no projeto, tendo essa idea por meio da funcionalidade de poder marcar os ebooks já lidos, permitindo que eles saem da aplicação e os dados continuem salvos. A biblioteca que eu escolhi usar para isso foi a better-auth, pois ela têm otimos exemplos em sua documentação usando o prisma com o PostgreSQL, o que me beneficiaria muito.

Para testar, eu fiz isso manualmente, criando duas contas diferentes com dois destinos diferentes para cada uma e salvando essas informações no banco de dados.
