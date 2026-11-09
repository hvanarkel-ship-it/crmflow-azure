# CRMFlow Azure — documentatie

## Snel naar de juiste informatie

| Vraag | Document |
| --- | --- |
| Wat doet dit project en hoe begin ik? | [README](README.md) |
| Hoe werkt installatie, configuratie en beheer? | [Projecthandboek](HANDBOOK.md) |
| Wat is bewezen en wat staat open? | [Verificatie en verbeterpunten](VERIFICATION.md) |

Geïnventariseerd op 9 november 2026 vanaf commit `f1b8a70b01d1`. Bestaande inhoud en historische dossiers zijn behouden. Een datum in een bestandsnaam maakt de inhoud niet automatisch actueel.

## Configuratie en uitvoering

- [README.md](README.md)
- [package.json](package.json)
- [prisma/schema.prisma](prisma/schema.prisma)
- [server.js](server.js)
- [.github/workflows/azure-webapps-node.yml](.github/workflows/azure-webapps-node.yml)
- [.env.example](.env.example)

## Beschikbare scripts

Bron: [package.json](package.json). De tabel beschrijft de huidige opdrachten en is geen instructie om ze allemaal uit te voeren. Database-, seed-, reset-, clean-, import- en publicatiecommando's kunnen data of bestanden wijzigen.

| Script | Werkelijke opdracht |
| --- | --- |
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `node server.js` |
| `lint` | `next lint` |
| `prisma:generate` | `prisma generate` |
| `prisma:migrate` | `prisma migrate dev` |
| `prisma:deploy` | `prisma migrate deploy` |
| `prisma:studio` | `prisma studio` |
| `seed` | `node prisma/seed.mjs` |

## GitHub-workflows

- [.github/workflows/azure-webapps-node.yml](.github/workflows/azure-webapps-node.yml)

Een workflowbestand bewijst configuratie, geen geslaagde uitvoering. Lees padfilters en triggers voordat een documentatiepush als deploymentbewijs wordt gebruikt.

## Bestaande documentatie

Er waren buiten de README geen Markdown-/MDX-documenten in deze snapshot.
