# Cobertura Atual
  `94%`

# Estrutura de Testes

- **Unitário**: `*.unit.spec.ts`
- **Integração**: `*.integration.spec.ts`
- **End to end**: `*.e2e.spec.ts`

# Configuração do postgresql com Docker para testes de integração e e2e

```bash
# Constrói e inicia o container.
$ docker:pg-test-build

# Executa um push das migrations no banco de dados de teste.
$ prisma:testPush

# Encerra o container
$ docker:pg-test-kill

# Roda o banco de dados de testes se a imagem já tiver sido construída.
$ docker:pg-test-run
```