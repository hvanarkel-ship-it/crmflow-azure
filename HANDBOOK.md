# CRMFlow Azure — projecthandboek

[Documentatie-index](DOCUMENTATION.md) · [Verificatie en verbeterpunten](VERIFICATION.md) · [README](README.md)

| Documentbeheer | Waarde |
| --- | --- |
| Beoordeeld | 9 november 2026 |
| Repository | `hvanarkel-ship-it/crmflow-azure` |
| Branch | `main` |
| Bronsnapshot | [`f1b8a70b01d1`](https://github.com/hvanarkel-ship-it/crmflow-azure/commit/f1b8a70b01d179af45f91ebbd161ae67366b05a2) |
| Scope | Bron- en documentatiecontrole; geen nieuwe runtime-, herstel- of gebruikersacceptatietest |

## Doel en gebruik

CRM-starter voor Azure App Service en Azure SQL, met NextAuth Credentials en Prisma. De repository is een starter; actuele operationele volledigheid is niet aangetoond.

Controleer aanmelden en de CRM-hoofdroute met een testgebruiker. Leg vast welke CRM-onderdelen daadwerkelijk werken voordat je deze starter als productierijp presenteert.

## Architectuur en afhankelijkheden

Next.js/React → NextAuth en applicatieserver → Prisma → Azure SQL (SQL Server). GitHub Actions bouwt en kan naar Azure App Service uitrollen.

**Runtime:** Node 20.x in de deploymentworkflow; npm-lockfile; SQL Server-compatibele database.

**Technische ingang:** [server.js](server.js). Bestaande productspecificaties en AGENTS-instructies blijven leidend; dit handboek beschrijft de aangetroffen inrichting.

## Installatie en lokale start

Voer `npm ci` uit en kopieer `.env.example` naar `.env`. Configureer DATABASE_URL, NEXTAUTH_URL en NEXTAUTH_SECRET. Voer `npm run prisma:generate` uit. Gebruik `npm run prisma:migrate` en `npm run seed` alleen voor bewuste inrichting van een ontwikkelomgeving; start met `npm run dev`.

De genoemde commando's zijn afgeleid van repositorybestanden. Ze zijn in deze documentatie-update niet uitgevoerd tegen productie. Database-inrichting, migraties, seed/import en accountkoppelingen wijzigen gegevens en vereisen de juiste doelomgeving.

## Configuratie

De volgende **namen** zijn aangetroffen in [`.env.example`](.env.example). Het voorbeeld is geen volledige garantie dat alle runtimevariabelen hierin staan. Benodigde waarden hangen af van ingeschakelde functies.

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `APP_NAME`

Bewaar geheime waarden buiten Git. Een clientconfiguratie of publiek project-ID vervangt geen toegangsregels. Gebruik voor tests synthetische gegevens en een afgescheiden omgeving.

## Controles vóór een functionele release

Bestaande controlecommando's (voer ieder vanuit de repositoryroot uit, tenzij het commando zelf van map wisselt):

```sh
npm run lint
npm run build 
```

Een vermeld commando is geen geslaagd testresultaat. Leg uitvoerdatum, commit, omgeving, exitstatus en eventuele beperkingen vast.

1. Credentials-login, logout en afgeschermde pagina.
2. Databaseverbinding en minimale CRM-write/read in testomgeving.
3. Statische assets en serverstart via de Azure-runtime.
4. Migratieversie en vorige release als herstelreferentie.

## Uitrol en releasebewijs

De bestaande workflow wordt bij elke push naar main geactiveerd en heeft geen padfilter. Hij gebruikt AZURE_WEBAPP_PUBLISH_PROFILE, Node 20.x en de GitHub-omgeving Development. npm run test --if-present slaat testen stil over als geen testscript bestaat. De README vermeldt automatische uitrol, maar de workflow past geen Prisma-migraties toe. npm run prisma:deploy is beschikbaar, maar vereist een afzonderlijk beoordeeld migratieplan.

Bewaar bij een release de broncommit, uitgevoerde checks, doelomgeving, actieve versie, verificatiedatum en herstelreferentie. “In GitHub”, “build geslaagd” en “operationeel” zijn verschillende statussen.

## Back-up en herstel

Maak vóór databasewijzigingen een herstelbaar Azure SQL-back-uppunt en noteer schema-/appversie. Bij terugdraaien kan oude code onverenigbaar zijn met een nieuw schema; controleer dit vóór herdeploy. Een Git-revert herstelt geen database.

Een herstelprocedure is pas bewezen na een geslaagde terugleestest. Noteer wat is hersteld, welke data-ouderdom resteert en of writes/backgroundtaken tijdens herstel waren gestopt. In deze audit is geen recovery time of recovery point objective gemeten of gegarandeerd.

## Storingswijzer

| Symptoom | Eerste controle |
| --- | --- |
| Azure-build groen maar applicatie faalt | Controleer runtimevariabelen, startcommando, Prisma-client en schema. |
| Authenticatie verwijst verkeerd | Controleer NEXTAUTH_URL en hostconfiguratie. |
| Geen testresultaten in workflow | Er staat geen testscript in package.json; --if-present is geen testbewijs. |

## Onderhoud

Werk documentatie bij in dezelfde wijziging als scripts, configuratie, schema, providercontracten of deploymentgedrag veranderen. Gebruik het verificatieregister voor bewijs en beperkingen; beschrijf historische resultaten met hun eigen datum. Controleer vóór een functionele release de bovenstaande acceptatiepunten en relevante bestaande CI.

## Bronverwijzingen

- [README.md](README.md)
- [package.json](package.json)
- [prisma/schema.prisma](prisma/schema.prisma)
- [server.js](server.js)
- [.github/workflows/azure-webapps-node.yml](.github/workflows/azure-webapps-node.yml)
- [.env.example](.env.example)
