# Лабораторная работа №3: Разработка Web3 приложения с DAO

## Информация о группе

| Участник            | Адрес кошелька |
|---------------------|---------------|
| Katya Bobrova       | `0x2aA737D0ea2a11c01eEe3a1293c5687573E73E09` |
| Nazarchik Vakuelnko | `0xe44Cc55f502C304c47827109C6Fc4039222D880a` |
| MIIGGUUEL Yamchikov | `0x506bce2eC048e36696B3E8deE6b231178E556B50` |

**Тестовая сеть:** Sepolia (Ethereum)
**ChainId:** 11155111

---

## Описание проекта

Разработано децентрализованное приложение (dApp) для голосования в DAO на базе токена SuperToken (ERC20Votes). Выбран **Вариант 2 — Простое DAO для голосования**.

### Развёрнутые контракты

- **SuperToken (ERC20Votes):** [`0x349A10AE1087871C319a0CEd0c13Fcc4bcCBcD13`](https://sepolia.etherscan.io/address/0x349A10AE1087871C319a0CEd0c13Fcc4bcCBcD13)
- **DAO:** [`0xCC085cF82d9Beb38Ee956E76E1Fd1d1e9be02237`](https://sepolia.etherscan.io/address/0xCC085cF82d9Beb38Ee956E76E1Fd1d1e9be02237)

---

## Выполненные шаги

1. Модифицирован токен SuperToken — добавлена поддержка ERC20Votes и EIP712 (OpenZeppelin 5.x)
2. Создан контракт DAO с функциями:
    - `createProposal` — создание предложения с описанием и длительностью голосования
    - `vote` — голосование за/против (вес голоса = баланс токенов)
    - `executeProposal` — выполнение принятого предложения после окончания голосования
    - `getProposal` — получение информации о предложении
    - `hasVoted` — проверка участия пользователя в голосовании
3. Оба контракта развёрнуты в сети Sepolia и верифицированы на Etherscan
4. Выполнена эмиссия токенов и переводы между участниками группы
5. Разработано веб-приложение (single-page HTML + ethers.js) с функциями:
    - Подключение кошелька MetaMask
    - Отображение баланса токенов
    - Создание предложений (фиксированная длительность 1 час)
    - Голосование за/против
    - Выполнение принятых предложений
    - Просмотр всех предложений со статусами и результатами

---

## Структура проекта

```
├── contracts/
│   ├── SuperToken.sol      # ERC20Votes токен
│   └── DAO.sol             # Контракт голосования
├── scripts/
│   ├── deploy.js           # Деплой SuperToken + DAO
│   ├── deployDAO.js        # Деплой только DAO
│   ├── mint.js             # Эмиссия токенов
│   ├── burn.js             # Сжигание токенов
│   ├── transfer.js         # Перевод токенов
│   └── check-balance.js    # Проверка баланса
├── frontend/
│   └── index.html          # Веб-приложение
├── hardhat.config.js
├── package.json
└── .env
```

---

## Использование скриптов

Все скрипты запускаются через Hardhat. В PowerShell переменные окружения задаются через `$env:`.

**Деплой всех контрактов:**
```powershell
npx hardhat run scripts/deploy.js --network sepolia
```

**Деплой только DAO (если токен уже развёрнут):**
```powershell
npx hardhat run scripts/deployDAO.js --network sepolia
```

**Эмиссия токенов:**
```powershell
$env:TO="0xАдрес"; $env:AMOUNT="1000"; npx hardhat run scripts/mint.js --network sepolia
```

**Перевод токенов:**
```powershell
$env:TO="0xАдрес"; $env:AMOUNT="100"; npx hardhat run scripts/transfer.js --network sepolia
```

**Сжигание токенов:**
```powershell
$env:AMOUNT="50"; npx hardhat run scripts/burn.js --network sepolia
```

**Проверка баланса:**
```powershell
$env:ADDRESS="0xАдрес"; npx hardhat run scripts/check-balance.js --network sepolia
```

**Верификация контрактов:**
```powershell
npx hardhat verify --network sepolia АДРЕС_ТОКЕНА
npx hardhat verify --network sepolia АДРЕС_DAO "АДРЕС_ТОКЕНА"
```

---

## Технические детали

- **Solidity:** 0.8.28 (evmVersion: cancun)
- **OpenZeppelin Contracts:** 5.6.1
- **Hardhat:** 2.28.6
- **ethers.js:** 6.13.4 (CDN)
- **Фронтенд:** HTML + CSS + JS (без фреймворков, single-file)

---

## Ссылки

- **SuperToken (Etherscan):** [https://sepolia.etherscan.io/address/0x349A10AE1087871C319a0CEd0c13Fcc4bcCBcD13](https://sepolia.etherscan.io/address/0x349A10AE1087871C319a0CEd0c13Fcc4bcCBcD13)
- **DAO (Etherscan):** [https://sepolia.etherscan.io/address/0xCC085cF82d9Beb38Ee956E76E1Fd1d1e9be02237](https://sepolia.etherscan.io/address/0xCC085cF82d9Beb38Ee956E76E1Fd1d1e9be02237)
- **Задеплоенное приложение:** [https://is-dapps-platforms-y26.github.io/Bobrova-Vakulenko-Yamshikov/](https://is-dapps-platforms-y26.github.io/Bobrova-Vakulenko-Yamshikov/)