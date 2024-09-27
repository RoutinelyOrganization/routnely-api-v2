# Estrutura de Pastas

## src
- **adapters**
  - nest
  - etc.
- **configs**
  - cors
  - etc.
- **domain**
  - contracts
  - entities
    - object-values
  - etc.
- **factories**
  - segue a estrutura do diretório `src`
- **infra**
  - api
  - database
  - etc.
- **presentation**
  - contracts
  - controllers
  - middlewares
  - etc.
- **shared**
  - either
  - etc.
- **usecase**
  - contracts
  - implementations
    - customer
    - etc.
  - etc.

# Descrição dos Diretórios

- **Adapters**: Fazem as adaptações necessárias dos métodos das libs/frameworks para aplicação.
- **Configs**: As configurações da aplicação ou dos frameworks/libs.
- **Domain**: O coração da aplicação, onde estão localizadas as entidades de negócio e seus objetos de valor com validações. Evita-se o uso de libs/frameworks neste diretório, com algumas exceções.
- **Factories**: Funções que retornam uma instância com dados padrão, mantendo o código coeso, limpo e evitando repetições. A estrutura segue a do diretório `src`.
- **Infra**: Contém todas as libs/frameworks utilizadas na aplicação (NestJS, Prisma, Zod, etc.). As classes criadas aqui executam os métodos das libs.
- **Presentation**: Responsável pela comunicação da aplicação com os clientes, recebendo solicitações e enviando respostas. Contém controladores, middleware e apresentadores.
- **Shared**: Arquivos que não possuem uma camada específica e são utilizados por toda a aplicação.
- **UseCases**: Representa a intenção do cliente, cada intenção é um caso de uso.


