# 🧪 Automação de Testes – Brasil API  

Projeto de automação desenvolvido como **teste técnico** para o processo seletivo do **Grupo Voalle**, utilizando **Cypress**, com integração de pipeline no **Jenkins** e gerenciamento de testes no **Qase**.  

---

## 🚀 Tecnologias Utilizadas  
- [Cypress](https://www.cypress.io/) – Framework de testes E2E e API  
- [Node.js](https://nodejs.org/) – Ambiente de execução JavaScript  
- [Jenkins](https://www.jenkins.io/) – Integração Contínua (CI/CD)  
- [Qase](https://qase.io/) – Gerenciamento e rastreabilidade de testes  

---

## 📂 Estrutura do Projeto  
```bash
├── cypress
│   ├── e2e
│   │   ├── cepv2.spec.js         # Testes do endpoint CEP v2
│   │   ├── location.spec.js      # Testes do endpoint Localidades
│   │   └── oceanForecast.spec.js # Testes do endpoint Previsão Oceânica
│   ├── fixtures                  # Massa de dados
│   ├── support                   # Comandos customizados e configs
├── jenkinsfile                   # Pipeline configurado para Jenkins
├── qase.config.js                # Integração com Qase
├── package.json
└── README.md
```

## ⚙️ Configuração do Ambiente  

### 1. Clonar o repositório  
```bash
git clone https://github.com/Thaisombra/brasil-api.git
cd brasil-api
```

### 2. Instalar dependências
```bash 
npm install
```

### 3. Executar os testes localmente 
```bash
npx cypress run
```

## 🏗️ Pipeline no Jenkins  

O projeto contém um **Jenkinsfile** configurado com as seguintes etapas:  

1. Checkout do repositório  
2. Instalação de dependências  
3. Execução dos testes Cypress  
4. Envio dos resultados para o Qase  
5. Publicação dos relatórios no Jenkins  

---

## ✅ Escopo dos Testes Automatizados  

- **Endpoint CEP v2** → Validação de retorno de dados para CEP válido e tratamento de erros para CEP inválido.  
- **Endpoint Localidades** → Consulta de estados (UFs) e municípios, garantindo integridade das informações do IBGE.  
- **Endpoint Previsão Oceânica** → Verificação das informações de ondas e condições oceânicas, incluindo cenários positivos e negativos.  

Os testes contemplam **cenários positivos e negativos**, garantindo a confiabilidade dos serviços da **Brasil API**.  

---

## 📊 Relatórios  

- Execução da Pipeline pelo Jenkins, após isso o histórico é integrado ao QASE.IO

---

## 👩‍💻 Autor(a)  

Projeto desenvolvido por **Thais Batista** para o processo seletivo **Grupo Voalle**.  
