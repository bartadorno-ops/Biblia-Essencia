import { Book } from './types';

export const BOOKS: Book[] = [
  // Antigo Testamento - Pentateuco (1-5)
  {
    id: 'gn',
    name: 'Gênesis',
    abbrev: 'Gn',
    testament: 'AT',
    order: 1,
    chapters: 50,
    group: 'Pentateuco',
    theme: 'Origem de todas as coisas e o princípio da aliança',
    author: 'Moisés',
    period: 'c. 1446-1406 a.C.',
    summary: 'Narra a criação do mundo, a queda do homem, o dilúvio, a dispersão das nações e as origens de Israel através de Abraão, Isaque, Jacó e José.'
  },
  {
    id: 'ex',
    name: 'Êxodo',
    abbrev: 'Êx',
    testament: 'AT',
    order: 2,
    chapters: 40,
    group: 'Pentateuco',
    theme: 'Redenção, libertação e a entrega da Lei',
    author: 'Moisés',
    period: 'c. 1446-1406 a.C.',
    summary: 'A libertação do povo de Deus da escravidão no Egito, o pacto no Monte Sinai com os Dez Mandamentos e a edificação do Tabernáculo.'
  },
  {
    id: 'lv',
    name: 'Levítico',
    abbrev: 'Lv',
    testament: 'AT',
    order: 3,
    chapters: 27,
    group: 'Pentateuco',
    theme: 'Santidade ao Senhor e a comunhão por meio dos sacrifícios',
    author: 'Moisés',
    period: 'c. 1445 a.C.',
    summary: 'Instruções para o sacerdócio, as leis cerimoniais de pureza e santidade e o Dia da Expiação.'
  },
  {
    id: 'nm',
    name: 'Números',
    abbrev: 'Nm',
    testament: 'AT',
    order: 4,
    chapters: 36,
    group: 'Pentateuco',
    theme: 'A peregrinação no deserto e a fidelidade divina',
    author: 'Moisés',
    period: 'c. 1406 a.C.',
    summary: 'Os censos do povo de Israel e a jornada de 40 anos através do deserto em direção à Terra Prometida.'
  },
  {
    id: 'dt',
    name: 'Deuteronômio',
    abbrev: 'Dt',
    testament: 'AT',
    order: 5,
    chapters: 34,
    group: 'Pentateuco',
    theme: 'Renovação da aliança e obediência amorosa',
    author: 'Moisés',
    period: 'c. 1406 a.C.',
    summary: 'Os últimos discursos de Moisés à nova geração de Israel antes de cruzar o Jordão rumo a Canaã.'
  },

  // Livros Históricos (6-17)
  {
    id: 'js',
    name: 'Josué',
    abbrev: 'Js',
    testament: 'AT',
    order: 6,
    chapters: 24,
    group: 'Históricos',
    theme: 'A conquista e partilha da Terra Prometida',
    author: 'Josué',
    period: 'c. 1400-1375 a.C.',
    summary: 'A liderança de Josué na travessia do Jordão, tomada de Jericó e divisão da herança entre as doze tribos.'
  },
  {
    id: 'jz',
    name: 'Juízes',
    abbrev: 'Jz',
    testament: 'AT',
    order: 7,
    chapters: 21,
    group: 'Históricos',
    theme: 'Ciclos de apostasia, opressão e libertação divina',
    author: 'Tradicionalmente Samuel',
    period: 'c. 1050-1000 a.C.',
    summary: 'A história tumultuada de Israel antes da monarquia, levantando líderes como Débora, Gideão e Sansão.'
  },
  {
    id: 'rt',
    name: 'Rute',
    abbrev: 'Rt',
    testament: 'AT',
    order: 8,
    chapters: 4,
    group: 'Históricos',
    theme: 'Lealdade, graça e a linhagem do Redentor',
    author: 'Desconhecido',
    period: 'Época dos Juízes',
    summary: 'A comovente história da moabita Rute e seu casamento por resgate com Boaz, antepassados do Rei Davi e de Cristo.'
  },
  {
    id: '1sm',
    name: '1 Samuel',
    abbrev: '1Sm',
    testament: 'AT',
    order: 9,
    chapters: 31,
    group: 'Históricos',
    theme: 'A transição da teocracia tribal para a monarquia',
    author: 'Samuel, Natã e Gade',
    period: 'c. 930 a.C.',
    summary: 'O ministério do profeta Samuel, a ascensão e queda de Saul, e o ungimento de Davi.'
  },
  {
    id: '2sm',
    name: '2 Samuel',
    abbrev: '2Sm',
    testament: 'AT',
    order: 10,
    chapters: 24,
    group: 'Históricos',
    theme: 'O reinado de Davi e a aliança eterna',
    author: 'Natã e Gade',
    period: 'c. 930 a.C.',
    summary: 'A consolidação do trono de Davi em Jerusalém, suas vitórias, pecados e arrependimento sincero.'
  },
  {
    id: '1rs',
    name: '1 Reis',
    abbrev: '1Rs',
    testament: 'AT',
    order: 11,
    chapters: 22,
    group: 'Históricos',
    theme: 'A glória de Salomão e a divisão do reino',
    author: 'Tradicionalmente Jeremias',
    period: 'c. 560-538 a.C.',
    summary: 'Construção do Templo por Salomão, a posterior divisão entre Israel (Norte) e Judá (Sul), e o ministério do profeta Elias.'
  },
  {
    id: '2rs',
    name: '2 Reis',
    abbrev: '2Rs',
    testament: 'AT',
    order: 12,
    chapters: 25,
    group: 'Históricos',
    theme: 'O declínio espiritual e a queda de Samaria e Jerusalém',
    author: 'Tradicionalmente Jeremias',
    period: 'c. 560-538 a.C.',
    summary: 'O ministério de Eliseu, os sucessivos reis e os cativeiros Assírio e Babilônico.'
  },
  {
    id: '1cr',
    name: '1 Crônicas',
    abbrev: '1Cr',
    testament: 'AT',
    order: 13,
    chapters: 29,
    group: 'Históricos',
    theme: 'A história sagrada sob a perspectiva do sacerdócio e do Templo',
    author: 'Tradicionalmente Esdras',
    period: 'c. 450-400 a.C.',
    summary: 'Genealogias do povo escolhido e os preparativos de Davi para o culto divino no Templo.'
  },
  {
    id: '2cr',
    name: '2 Crônicas',
    abbrev: '2Cr',
    testament: 'AT',
    order: 14,
    chapters: 36,
    group: 'Históricos',
    theme: 'Os reis de Judá, avivamentos e restauração',
    author: 'Tradicionalmente Esdras',
    period: 'c. 450-400 a.C.',
    summary: 'O reino de Salomão e os reis piedosos de Judá (como Ezequias e Josias) até o decreto de Ciro.'
  },
  {
    id: 'ed',
    name: 'Esdras',
    abbrev: 'Ed',
    testament: 'AT',
    order: 15,
    chapters: 10,
    group: 'Históricos',
    theme: 'O retorno do exílio e a reconstrução do Templo',
    author: 'Esdras',
    period: 'c. 450 a.C.',
    summary: 'O regresso dos remanescentes a Jerusalém sob Zorobabel e o reavivamento espiritual com Esdras.'
  },
  {
    id: 'ne',
    name: 'Neemias',
    abbrev: 'Ne',
    testament: 'AT',
    order: 16,
    chapters: 13,
    group: 'Históricos',
    theme: 'A reconstrução das muralhas e liderança corajosa',
    author: 'Neemias',
    period: 'c. 430 a.C.',
    summary: 'A restauração das defesas de Jerusalém em 52 dias e a reforma social e religiosa da comunidade.'
  },
  {
    id: 'et',
    name: 'Ester',
    abbrev: 'Et',
    testament: 'AT',
    order: 17,
    chapters: 10,
    group: 'Históricos',
    theme: 'A providência oculta de Deus salvando o Seu povo',
    author: 'Desconhecido (talvez Mardoqueu)',
    period: 'c. 460 a.C.',
    summary: 'Na corte persa de Susã, a jovem rainha Ester intercede heroicamente para livrar os judeus do extermínio.'
  },

  // Livros Poéticos e Sapienciais (18-22)
  {
    id: 'job',
    name: 'Jó',
    abbrev: 'Jó',
    testament: 'AT',
    order: 18,
    chapters: 42,
    group: 'Poéticos',
    theme: 'O sofrimento humano, a soberania e sabedoria de Deus',
    author: 'Desconhecido',
    period: 'Era patriarcal',
    summary: 'O justo Jó perde família, bens e saúde, mas persevera em fé e contempla a majestade do Criador.'
  },
  {
    id: 'sl',
    name: 'Salmos',
    abbrev: 'Sl',
    testament: 'AT',
    order: 19,
    chapters: 150,
    group: 'Poéticos',
    theme: 'O saltério de orações, louvores e anseios messiânicos',
    author: 'Davi, Asafe, filhos de Corá, Moisés e outros',
    period: 'c. 1400-450 a.C.',
    summary: 'O cancioneiro sagrado que expressa todas as emoções humanas diante do Deus Todo-Poderoso.'
  },
  {
    id: 'pv',
    name: 'Provérbios',
    abbrev: 'Pv',
    testament: 'AT',
    order: 20,
    chapters: 31,
    group: 'Poéticos',
    theme: 'Sabedoria prática fundamentada no temor do Senhor',
    author: 'Principalmente Salomão',
    period: 'c. 950-700 a.C.',
    summary: 'Conselhos práticos inspirados sobre família, justiça, trabalho, fala e retidão de coração.'
  },
  {
    id: 'ec',
    name: 'Eclesiastes',
    abbrev: 'Ec',
    testament: 'AT',
    order: 21,
    chapters: 12,
    group: 'Poéticos',
    theme: 'O vazio da vida debaixo do sol sem Deus',
    author: 'Salomão (o Pregador)',
    period: 'c. 935 a.C.',
    summary: 'Reflexões existenciais concluindo que temer a Deus e guardar Seus mandamentos é o dever de todo ser humano.'
  },
  {
    id: 'ct',
    name: 'Cânticos',
    abbrev: 'Ct',
    testament: 'AT',
    order: 22,
    chapters: 8,
    group: 'Poéticos',
    theme: 'A beleza do amor conjugal e a união com o Amado',
    author: 'Salomão',
    period: 'c. 960 a.C.',
    summary: 'Poema lírico exaltando a pureza, lealdade e afeto apaixonado no casamento.'
  },

  // Profetas Maiores (23-27)
  {
    id: 'is',
    name: 'Isaías',
    abbrev: 'Is',
    testament: 'AT',
    order: 23,
    chapters: 66,
    group: 'Profetas Maiores',
    theme: 'A santidade de Deus, o Servo Sofredor e a glória futura',
    author: 'Isaías',
    period: 'c. 740-680 a.C.',
    summary: 'Chamado de o quinto evangelho pelo vigor das profecias sobre o nascimento virginal, sacrifício e reino do Messias.'
  },
  {
    id: 'jr',
    name: 'Jeremias',
    abbrev: 'Jr',
    testament: 'AT',
    order: 24,
    chapters: 52,
    group: 'Profetas Maiores',
    theme: 'O juízo iminente sobre Judá e a promessa da Nova Aliança',
    author: 'Jeremias',
    period: 'c. 627-580 a.C.',
    summary: 'O profeta chorão adverte a nação infiel, profetiza a destruição de Jerusalém e antevê a lei escrita nos corações.'
  },
  {
    id: 'lm',
    name: 'Lamentações',
    abbrev: 'Lm',
    testament: 'AT',
    order: 25,
    chapters: 5,
    group: 'Profetas Maiores',
    theme: 'Pranto fúnebre pela queda de Jerusalém e a infinita fidelidade de Deus',
    author: 'Jeremias',
    period: 'c. 586 a.C.',
    summary: 'Cinco poemas acrósticos de dor profunda e súplica, com o brado inesquecível: as misericórdias do Senhor se renovam a cada manhã.'
  },
  {
    id: 'ez',
    name: 'Ezequiel',
    abbrev: 'Ez',
    testament: 'AT',
    order: 26,
    chapters: 48,
    group: 'Profetas Maiores',
    theme: 'A glória de Deus entre os cativos e a visão dos ossos secos',
    author: 'Ezequiel',
    period: 'c. 593-571 a.C.',
    summary: 'Visões impressionantes, atos proféticos simbólicos e a promessa do Templo restaurado e rios de vida.'
  },
  {
    id: 'dn',
    name: 'Daniel',
    abbrev: 'Dn',
    testament: 'AT',
    order: 27,
    chapters: 12,
    group: 'Profetas Maiores',
    theme: 'A soberania de Deus sobre os impérios humanos',
    author: 'Daniel',
    period: 'c. 605-535 a.C.',
    summary: 'Fidelidade de Daniel e seus amigos na Babilônia (fornalha e cova dos leões) e revelações apocalípticas dos reinos da história.'
  },

  // Profetas Menores (28-39)
  {
    id: 'os',
    name: 'Oséias',
    abbrev: 'Os',
    testament: 'AT',
    order: 28,
    chapters: 14,
    group: 'Profetas Menores',
    theme: 'O amor incondicional e redentor de Deus por Seu povo infiel',
    author: 'Oséias',
    period: 'c. 750 a.C.',
    summary: 'O profeta é orientado a casar-se com uma mulher infiel como parábola viva da aliança de Deus com Israel.'
  },
  {
    id: 'jl',
    name: 'Joel',
    abbrev: 'Jl',
    testament: 'AT',
    order: 29,
    chapters: 3,
    group: 'Profetas Menores',
    theme: 'O terrível Dia do Senhor e o derramamento do Espírito Santo',
    author: 'Joel',
    period: 'c. 835 a.C.',
    summary: 'A praga de gafanhotos prenuncia o julgamento final e a profecia de Pentecostes.'
  },
  {
    id: 'am',
    name: 'Amós',
    abbrev: 'Am',
    testament: 'AT',
    order: 30,
    chapters: 9,
    group: 'Profetas Menores',
    theme: 'A justiça social e o juízo sobre a religiosidade vazia',
    author: 'Amós',
    period: 'c. 760 a.C.',
    summary: 'Um pastor e cultivador de sicômoros que denuncia a opressão dos pobres e clama para que a justiça corra como rio.'
  },
  {
    id: 'ob',
    name: 'Obadias',
    abbrev: 'Ob',
    testament: 'AT',
    order: 31,
    chapters: 1,
    group: 'Profetas Menores',
    theme: 'A ruína de Edom e o triunfo do monte Sião',
    author: 'Obadias',
    period: 'c. 586 a.C.',
    summary: 'O livro mais curto do AT condena o orgulho e traição dos edomitas contra seus irmãos israelitas.'
  },
  {
    id: 'jn',
    name: 'Jonas',
    abbrev: 'Jn',
    testament: 'AT',
    order: 32,
    chapters: 4,
    group: 'Profetas Menores',
    theme: 'A misericórdia compassiva de Deus para com todos os povos',
    author: 'Jonas',
    period: 'c. 760 a.C.',
    summary: 'O profeta fujão engolido pelo grande peixe e a surpreendente conversão da grande cidade de Nínive.'
  },
  {
    id: 'mq',
    name: 'Miquéias',
    abbrev: 'Mq',
    testament: 'AT',
    order: 33,
    chapters: 7,
    group: 'Profetas Menores',
    theme: 'O que o Senhor requer: praticar a justiça, amar a misericórdia',
    author: 'Miquéias',
    period: 'c. 735 a.C.',
    summary: 'Denúncia de líderes corruptos e o anúncio de que o Príncipe da Paz nascerá em Belém de Efrata.'
  },
  {
    id: 'na',
    name: 'Naum',
    abbrev: 'Na',
    testament: 'AT',
    order: 34,
    chapters: 3,
    group: 'Profetas Menores',
    theme: 'A queda inexorável do império assírio',
    author: 'Naum',
    period: 'c. 650 a.C.',
    summary: 'Deus como vingador justo que põe termo à tirania cruel de Nínive.'
  },
  {
    id: 'hc',
    name: 'Habacuque',
    abbrev: 'Hc',
    testament: 'AT',
    order: 35,
    chapters: 3,
    group: 'Profetas Menores',
    theme: 'O justo viverá da sua fé em meio às dúvidas',
    author: 'Habacuque',
    period: 'c. 605 a.C.',
    summary: 'Diálogo franco entre o profeta e Deus diante da invasão babilônica, culminando em cântico de júbilo.'
  },
  {
    id: 'sf',
    name: 'Sofonias',
    abbrev: 'Sf',
    testament: 'AT',
    order: 36,
    chapters: 3,
    group: 'Profetas Menores',
    theme: 'Purificação através do fogo do zelo de Deus',
    author: 'Sofonias',
    period: 'c. 630 a.C.',
    summary: 'Advertências de juízo global seguidas do consolo de um Deus que se alegra em Seu povo com cânticos.'
  },
  {
    id: 'ag',
    name: 'Ageu',
    abbrev: 'Ag',
    testament: 'AT',
    order: 37,
    chapters: 2,
    group: 'Profetas Menores',
    theme: 'Priorizar a Casa de Deus antes dos próprios confortos',
    author: 'Ageu',
    period: 'c. 520 a.C.',
    summary: 'Exortação firme aos repatriados para retomar a construção do Templo de Jerusalém.'
  },
  {
    id: 'zc',
    name: 'Zacarias',
    abbrev: 'Zc',
    testament: 'AT',
    order: 38,
    chapters: 14,
    group: 'Profetas Menores',
    theme: 'Visões da restauração e do Rei manso e humilde',
    author: 'Zacarias',
    period: 'c. 520 a.C.',
    summary: 'Profecias ricas sobre o Renovo, a entrada triunfal montado num jumentinho e o Pastor ferido.'
  },
  {
    id: 'ml',
    name: 'Malaquias',
    abbrev: 'Ml',
    testament: 'AT',
    order: 39,
    chapters: 4,
    group: 'Profetas Menores',
    theme: 'O retorno à reverência sincera e a vinda do Sol da Justiça',
    author: 'Malaquias',
    period: 'c. 430 a.C.',
    summary: 'O último mensageiro do Antigo Testamento tratando sobre o culto verdadeiro, casamento e dízimos.'
  },

  // Novo Testamento - Evangelhos (40-43)
  {
    id: 'mt',
    name: 'Mateus',
    abbrev: 'Mt',
    testament: 'NT',
    order: 40,
    chapters: 28,
    group: 'Evangelhos',
    theme: 'Jesus, o Rei Messiânico prometido a Israel',
    author: 'Mateus (Levi)',
    period: 'c. 60-70 d.C.',
    summary: 'Evangelho voltado aos judeus, enfatizando o cumprimento profético, o Sermão da Montanha e a Grande Comissão.'
  },
  {
    id: 'mc',
    name: 'Marcos',
    abbrev: 'Mc',
    testament: 'NT',
    order: 41,
    chapters: 16,
    group: 'Evangelhos',
    theme: 'Jesus, o Servo Obediente e Poderoso',
    author: 'João Marcos',
    period: 'c. 55-65 d.C.',
    summary: 'Narrativa vívida e dinâmica, focada nas ações, milagres e entrega sacrificial do Filho de Deus.'
  },
  {
    id: 'lc',
    name: 'Lucas',
    abbrev: 'Lc',
    testament: 'NT',
    order: 42,
    chapters: 24,
    group: 'Evangelhos',
    theme: 'Jesus, o Filho do Homem e Salvador compassivo de todos',
    author: 'Lucas, o médico amado',
    period: 'c. 60-62 d.C.',
    summary: 'Relato minucioso destacando a humanidade de Cristo, Seu amor pelos marginalizados, mulheres e oração contínua.'
  },
  {
    id: 'jo',
    name: 'João',
    abbrev: 'Jo',
    testament: 'NT',
    order: 43,
    chapters: 21,
    group: 'Evangelhos',
    theme: 'Jesus, o Verbo Eterno e Filho de Deus',
    author: 'João, o discípulo amado',
    period: 'c. 85-95 d.C.',
    summary: 'Sete sinais miraculosos, declarações EU SOU e revelação íntima para que creiamos e tenhamos vida em Seu nome.'
  },

  // História da Igreja (44)
  {
    id: 'at',
    name: 'Atos',
    abbrev: 'At',
    testament: 'NT',
    order: 44,
    chapters: 28,
    group: 'História da Igreja',
    theme: 'O poder do Espírito Santo expandindo o Evangelho até aos confins da terra',
    author: 'Lucas',
    period: 'c. 62 d.C.',
    summary: 'A descida do Espírito em Pentecostes, o ministério de Pedro e a extraordinária jornada missionária do apóstolo Paulo.'
  },

  // Cartas Paulinas (45-57)
  {
    id: 'rm',
    name: 'Romanos',
    abbrev: 'Rm',
    testament: 'NT',
    order: 45,
    chapters: 16,
    group: 'Cartas Paulinas',
    theme: 'O Evangelho da justificação pela graça mediante a fé',
    author: 'Paulo',
    period: 'c. 57 d.C.',
    summary: 'O monumento teológico sobre o pecado universal, redenção em Cristo, santificação e vida no Espírito.'
  },
  {
    id: '1co',
    name: '1 Coríntios',
    abbrev: '1Co',
    testament: 'NT',
    order: 46,
    chapters: 16,
    group: 'Cartas Paulinas',
    theme: 'Resolução de conflitos e a excelência do amor cristão',
    author: 'Paulo',
    period: 'c. 55 d.C.',
    summary: 'Instruções práticas sobre divisões na igreja, disciplina moral, dons espirituais e a ressurreição corpórea.'
  },
  {
    id: '2co',
    name: '2 Coríntios',
    abbrev: '2Co',
    testament: 'NT',
    order: 47,
    chapters: 13,
    group: 'Cartas Paulinas',
    theme: 'O ministério da reconciliação e força no sofrimento',
    author: 'Paulo',
    period: 'c. 56 d.C.',
    summary: 'Defesa apaixonada do apostolado de Paulo: o poder de Deus que se aperfeiçoa nas fraquezas humanas.'
  },
  {
    id: 'gl',
    name: 'Gálatas',
    abbrev: 'Gl',
    testament: 'NT',
    order: 48,
    chapters: 6,
    group: 'Cartas Paulinas',
    theme: 'A liberdade cristã contra o jugo do legalismo',
    author: 'Paulo',
    period: 'c. 49 d.C.',
    summary: 'A carta magna da liberdade cristã e o fruto do Espírito contra as obras da carne.'
  },
  {
    id: 'ef',
    name: 'Efésios',
    abbrev: 'Ef',
    testament: 'NT',
    order: 49,
    chapters: 6,
    group: 'Cartas Paulinas',
    theme: 'A glória da Igreja como Corpo e noiva de Cristo',
    author: 'Paulo',
    period: 'c. 60-62 d.C.',
    summary: 'Riquezas espirituais nos lugares celestiais, a unidade do corpo e a armadura completa de Deus.'
  },
  {
    id: 'fp',
    name: 'Filipenses',
    abbrev: 'Fp',
    testament: 'NT',
    order: 50,
    chapters: 4,
    group: 'Cartas Paulinas',
    theme: 'A alegria inabalável em Cristo em qualquer circunstância',
    author: 'Paulo',
    period: 'c. 61 d.C.',
    summary: 'A kenosis (humilhação de Cristo), a busca pelo alvo e o regozijo constante no Senhor.'
  },
  {
    id: 'cl',
    name: 'Colossenses',
    abbrev: 'Cl',
    testament: 'NT',
    order: 51,
    chapters: 4,
    group: 'Cartas Paulinas',
    theme: 'A supremacia absoluta e suficiência de Cristo',
    author: 'Paulo',
    period: 'c. 60-62 d.C.',
    summary: 'Cristo como a imagem do Deus invisível, o primogênito de toda a criação, em quem habita toda a plenitude.'
  },
  {
    id: '1ts',
    name: '1 Tessalonicenses',
    abbrev: '1Ts',
    testament: 'NT',
    order: 52,
    chapters: 5,
    group: 'Cartas Paulinas',
    theme: 'A bendita esperança do retorno do Senhor Jesus',
    author: 'Paulo',
    period: 'c. 51 d.C.',
    summary: 'Encorajamento na tribulação, pureza moral e consolo quanto aos que dormiram no Senhor com a promessa do arrebatamento.'
  },
  {
    id: '2ts',
    name: '2 Tessalonicenses',
    abbrev: '2Ts',
    testament: 'NT',
    order: 53,
    chapters: 3,
    group: 'Cartas Paulinas',
    theme: 'Firmeza doutrinária diante da apostasia final',
    author: 'Paulo',
    period: 'c. 51-52 d.C.',
    summary: 'Correção de enganos sobre o Dia do Senhor, a manifestação do homem da iniquidade e o dever do trabalho diligente.'
  },
  {
    id: '1tm',
    name: '1 Timóteo',
    abbrev: '1Tm',
    testament: 'NT',
    order: 54,
    chapters: 6,
    group: 'Cartas Paulinas',
    theme: 'A conduta adequada na Casa de Deus',
    author: 'Paulo',
    period: 'c. 63-65 d.C.',
    summary: 'Orientações pastorais ao jovem Timóteo sobre ordem no culto, qualificações de presbíteros e diáconos e sã doutrina.'
  },
  {
    id: '2tm',
    name: '2 Timóteo',
    abbrev: '2Tm',
    testament: 'NT',
    order: 55,
    chapters: 4,
    group: 'Cartas Paulinas',
    theme: 'Perseverança, fidelidade até o fim e a inspiração das Escrituras',
    author: 'Paulo',
    period: 'c. 66-67 d.C.',
    summary: 'O comovente testamento final de Paulo no calabouço romano: combati o bom combate, terminei a corrida, guardei a fé.'
  },
  {
    id: 'tt',
    name: 'Tito',
    abbrev: 'Tt',
    testament: 'NT',
    order: 56,
    chapters: 3,
    group: 'Cartas Paulinas',
    theme: 'Boas obras que decorrem da doutrina que é segundo a piedade',
    author: 'Paulo',
    period: 'c. 63-65 d.C.',
    summary: 'Conselhos para organizar a igreja na ilha de Creta e instruir homens, mulheres e jovens na graça santificadora.'
  },
  {
    id: 'fm',
    name: 'Filemom',
    abbrev: 'Fm',
    testament: 'NT',
    order: 57,
    chapters: 1,
    group: 'Cartas Paulinas',
    theme: 'Perdão mútuo e a fraternidade em Cristo',
    author: 'Paulo',
    period: 'c. 60-62 d.C.',
    summary: 'Paulo apela a Filemom para receber o escravo fugitivo Onésimo agora não mais como escravo, mas como irmão amado.'
  },

  // Cartas Gerais (58-65)
  {
    id: 'hb',
    name: 'Hebreus',
    abbrev: 'Hb',
    testament: 'NT',
    order: 58,
    chapters: 13,
    group: 'Cartas Gerais',
    theme: 'A superioridade final de Cristo sobre anjos, Moisés e o antigo sacerdócio',
    author: 'Desconhecido (talvez Paulo, Apolo ou Barnabé)',
    period: 'c. 64-68 d.C.',
    summary: 'Jesus como Sumo Sacerdote eterno segundo a ordem de Melquisedeque, o capítulo dos heróis da fé e perseverança.'
  },
  {
    id: 'tg',
    name: 'Tiago',
    abbrev: 'Tg',
    testament: 'NT',
    order: 59,
    chapters: 5,
    group: 'Cartas Gerais',
    theme: 'A fé viva demonstrada na prática através de obras de amor',
    author: 'Tiago (irmão do Senhor)',
    period: 'c. 45-48 d.C.',
    summary: 'Sabedoria prática cristã: refrear a língua, cuidar de órfãos e viúvas, orar com fé e evitar o favoritismo.'
  },
  {
    id: '1pe',
    name: '1 Pedro',
    abbrev: '1Pe',
    testament: 'NT',
    order: 60,
    chapters: 5,
    group: 'Cartas Gerais',
    theme: 'Esperança viva e santidade no meio do fogo da perseguição',
    author: 'Pedro',
    period: 'c. 63-64 d.C.',
    summary: 'Consolo aos peregrinos dispersos: sacerdócio real, submissão amorosa e a certeza da glória vindoura.'
  },
  {
    id: '2pe',
    name: '2 Pedro',
    abbrev: '2Pe',
    testament: 'NT',
    order: 61,
    chapters: 3,
    group: 'Cartas Gerais',
    theme: 'Alerta solene contra falsos mestres e a certeza da Segunda Vinda',
    author: 'Pedro',
    period: 'c. 66-67 d.C.',
    summary: 'Crescer na graça e conhecimento, a infalibilidade das profecias e novos céus e nova terra.'
  },
  {
    id: '1jo',
    name: '1 João',
    abbrev: '1Jo',
    testament: 'NT',
    order: 62,
    chapters: 5,
    group: 'Cartas Gerais',
    theme: 'A comunhão com Deus que é Luz e Amor',
    author: 'João',
    period: 'c. 85-95 d.C.',
    summary: 'Critérios seguros da certeza da salvação: confessar a Cristo encarnado, obedecer a Seus mandamentos e amar os irmãos.'
  },
  {
    id: '2jo',
    name: '2 João',
    abbrev: '2Jo',
    testament: 'NT',
    order: 63,
    chapters: 1,
    group: 'Cartas Gerais',
    theme: 'Andar na verdade e guardar o mandamento do amor',
    author: 'João',
    period: 'c. 85-95 d.C.',
    summary: 'Advertência à senhora eleita e seus filhos para não acolher enganadores que negam a encarnação.'
  },
  {
    id: '3jo',
    name: '3 João',
    abbrev: '3Jo',
    testament: 'NT',
    order: 64,
    chapters: 1,
    group: 'Cartas Gerais',
    theme: 'Hospitalidade aos obreiros da verdade vs o orgulho de Diótrefes',
    author: 'João',
    period: 'c. 85-95 d.C.',
    summary: 'Elogio caloroso ao amado Gaio por cooperar com a verdade acolhendo os missionários itinerantes.'
  },
  {
    id: 'jd',
    name: 'Judas',
    abbrev: 'Jd',
    testament: 'NT',
    order: 65,
    chapters: 1,
    group: 'Cartas Gerais',
    theme: 'Batalhar zelosamente pela fé uma vez por todas entregue aos santos',
    author: 'Judas (irmão de Tiago e de Jesus)',
    period: 'c. 65-70 d.C.',
    summary: 'Denúncia candente dos ímpios que transformam a graça em libertinagem, terminando na doxologia sublime ao Deus que pode nos guardar de tropeçar.'
  },

  // Profecia / Apocalipse (66)
  {
    id: 'ap',
    name: 'Apocalipse',
    abbrev: 'Ap',
    testament: 'NT',
    order: 66,
    chapters: 22,
    group: 'Profecia',
    theme: 'A revelação de Jesus Cristo, o Cordeiro vitorioso e o triunfo final de Deus',
    author: 'João',
    period: 'c. 95 d.C.',
    summary: 'Cartas às sete igrejas da Ásia, o rolo e os sete selos, trombetas, taças, a derrocada da Babilônia, o Reino Milenar e a Nova Jerusalém.'
  }
];

export const BOOKS_BY_ID = new Map<string, Book>(
  BOOKS.map((b) => [b.id, b])
);

export const BOOKS_BY_NAME_OR_ABBREV = new Map<string, Book>();
for (const b of BOOKS) {
  BOOKS_BY_NAME_OR_ABBREV.set(b.id.toLowerCase(), b);
  BOOKS_BY_NAME_OR_ABBREV.set(b.name.toLowerCase(), b);
  BOOKS_BY_NAME_OR_ABBREV.set(b.abbrev.toLowerCase(), b);
  // Remove accents for normalized search:
  const normalizedName = b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  BOOKS_BY_NAME_OR_ABBREV.set(normalizedName, b);
}

export function getBookById(id: string): Book | undefined {
  return BOOKS_BY_ID.get(id.toLowerCase());
}

export function findBook(query: string): Book | undefined {
  const clean = query.trim().toLowerCase();
  if (BOOKS_BY_NAME_OR_ABBREV.has(clean)) {
    return BOOKS_BY_NAME_OR_ABBREV.get(clean);
  }
  const normalized = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (BOOKS_BY_NAME_OR_ABBREV.has(normalized)) {
    return BOOKS_BY_NAME_OR_ABBREV.get(normalized);
  }
  // Substring match
  return BOOKS.find((b) =>
    b.name.toLowerCase().startsWith(clean) ||
    b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().startsWith(normalized)
  );
}

export const BOOK_GROUPS = [
  'Pentateuco',
  'Históricos',
  'Poéticos',
  'Profetas Maiores',
  'Profetas Menores',
  'Evangelhos',
  'História da Igreja',
  'Cartas Paulinas',
  'Cartas Gerais',
  'Profecia'
] as const;
