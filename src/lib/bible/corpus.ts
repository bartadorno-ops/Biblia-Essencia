import { Chapter, Translation } from './types';

// Authentic Portuguese texts for Almeida Revista e Corrigida (ARC) and Nova Versão Internacional (NVI)
export const STATIC_CORPUS: Record<string, Record<string, Record<number, { verses: { n: number; text: string }[] }>>> = {
  ARC: {
    gn: {
      1: {
        verses: [
          { n: 1, text: "No princípio, criou Deus os céus e a terra." },
          { n: 2, text: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas." },
          { n: 3, text: "E disse Deus: Haja luz. E houve luz." },
          { n: 4, text: "E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas." },
          { n: 5, text: "E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã: o dia primeiro." },
          { n: 6, text: "E disse Deus: Haja uma expansão no meio das águas, e haja separação entre águas e águas." },
          { n: 7, text: "E fez Deus a expansão e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão. E assim foi." },
          { n: 8, text: "E chamou Deus à expansão Céus; e foi a tarde e a manhã: o dia segundo." },
          { n: 9, text: "E disse Deus: Ajuntem-se as águas debaixo dos céus num lugar; e apareça a porção seca. E assim foi." },
          { n: 10, text: "E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares. E viu Deus que era bom." },
          { n: 11, text: "E disse Deus: Produza a terra erva verde, erva que dê semente, árvore frutífera que dê fruto segundo a sua espécie, cuja semente esteja nela sobre a terra. E assim foi." },
          { n: 12, text: "E a terra produziu erva, erva dando semente conforme a sua espécie e árvore frutífera, cuja semente está nela conforme a sua espécie. E viu Deus que era bom." },
          { n: 13, text: "E foi a tarde e a manhã: o dia terceiro." },
          { n: 14, text: "E disse Deus: Haja luminares na expansão dos céus, para haver separação entre o dia e a noite; e sejam eles para sinais e para tempos determinados e para dias e anos." },
          { n: 15, text: "E sejam para luminares na expansão dos céus, para alumiar a terra. E assim foi." },
          { n: 16, text: "E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; e fez as estrelas." },
          { n: 17, text: "E Deus os pôs na expansão dos céus para alumiar a terra," },
          { n: 18, text: "e para governar o dia e a noite, e para fazer separação entre a luz e as trevas. E viu Deus que era bom." },
          { n: 19, text: "E foi a tarde e a manhã: o dia quarto." },
          { n: 20, text: "E disse Deus: Produzam as águas abundantemente répteis de alma vivente; e voem as aves sobre a face da expansão dos céus." },
          { n: 21, text: "E Deus criou as grandes baleias, e todo réptil de alma vivente que as águas abundantemente produziram conforme as suas espécies, e toda ave de asas conforme a sua espécie. E viu Deus que era bom." },
          { n: 22, text: "E Deus os abençoou, dizendo: Frutificai, e multiplicai-vos, e enchei as águas nos mares; e as aves se multipliquem na terra." },
          { n: 23, text: "E foi a tarde e a manhã: o dia quinto." },
          { n: 24, text: "E disse Deus: Produza a terra alma vivente conforme a sua espécie; gado, e répteis, e bestas-feras da terra conforme a sua espécie. E assim foi." },
          { n: 25, text: "E fez Deus as bestas-feras da terra conforme a sua espécie, e o gado conforme a sua espécie, e todo o réptil da terra conforme a sua espécie. E viu Deus que era bom." },
          { n: 26, text: "E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra, e sobre todo réptil que se move sobre a terra." },
          { n: 27, text: "E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou." },
          { n: 28, text: "E Deus os abençoou e Deus lhes disse: Frutificai, e multiplicai-vos, e enchei a terra, e sujeitai-a; e dominai sobre os peixes do mar, e sobre as aves dos céus, e sobre todo o animal que se move sobre a terra." },
          { n: 29, text: "E disse Deus: Eis que vos tenho dado toda erva que dá semente e que está sobre a face de toda a terra; e toda árvore em que há fruto de árvore que dá semente vos será para mantimento." },
          { n: 30, text: "E a todo animal da terra, e a toda ave dos céus, e a todo réptil da terra, em que há alma vivente, toda a erva verde lhes será para mantimento. E assim foi." },
          { n: 31, text: "E viu Deus tudo quanto tinha feito, e eis que era muito bom; e foi a tarde e a manhã: o dia sexto." }
        ]
      },
      2: {
        verses: [
          { n: 1, text: "Assim, os céus, e a terra, e todo o seu exército foram acabados." },
          { n: 2, text: "E, havendo Deus acabado no dia sétimo a sua obra, que tinha feito, descansou no sétimo dia de toda a sua obra, que tinha feito." },
          { n: 3, text: "E abençoou Deus o dia sétimo e o santificou; porque nele descansou de toda a sua obra, que Deus criara e fizera." },
          { n: 4, text: "Estas são as origens dos céus e da terra, quando foram criados; no dia em que o SENHOR Deus fez a terra e os céus." },
          { n: 5, text: "E toda planta do campo ainda não estava na terra, e toda erva do campo ainda não brotava; porque ainda o SENHOR Deus não tinha feito chover sobre a terra, e não havia homem para lavrar a terra." },
          { n: 6, text: "Um vapor, porém, subia da terra e regava toda a face da terra." },
          { n: 7, text: "E formou o SENHOR Deus o homem do pó da terra e soprou em seus narizes o fôlego da vida; e o homem foi feito alma vivente." },
          { n: 8, text: "E plantou o SENHOR Deus um jardim no Éden, da banda do Oriente, e pôs ali o homem que tinha formado." },
          { n: 9, text: "E o SENHOR Deus fez brotar da terra toda árvore agradável à vista e boa para comida, e a árvore da vida no meio do jardim, e a árvore da ciência do bem e do mal." }
        ]
      }
    },
    sl: {
      23: {
        verses: [
          { n: 1, text: "O SENHOR é o meu pastor; nada me faltará." },
          { n: 2, text: "Deitar-me faz em verdes pastos, guia-me mansamente a águas tranqüilas." },
          { n: 3, text: "Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome." },
          { n: 4, text: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam." },
          { n: 5, text: "Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda." },
          { n: 6, text: "Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na Casa do SENHOR por longos dias." }
        ]
      }
    },
    jo: {
      3: {
        verses: [
          { n: 1, text: "E havia entre os fariseus um homem chamado Nicodemos, príncipe dos judeus." },
          { n: 2, text: "Este foi ter de noite com Jesus e disse-lhe: Rabi, bem sabemos que és mestre vindo de Deus, porque ninguém pode fazer estes sinais que tu fazes, se Deus não for com ele." },
          { n: 3, text: "Jesus respondeu e disse-lhe: Na verdade, na verdade te digo que aquele que não nascer de novo não pode ver o Reino de Deus." },
          { n: 4, text: "Disse-lhe Nicodemos: Como pode um homem nascer, sendo velho? Porventura, pode tornar a entrar no ventre de sua mãe e nascer?" },
          { n: 5, text: "Jesus respondeu: Na verdade, na verdade te digo que aquele que não nascer da água e do Espírito não pode entrar no Reino de Deus." },
          { n: 6, text: "O que é nascido da carne é carne, e o que é nascido do Espírito é espírito." },
          { n: 7, text: "Não te maravilhes de te ter dito: Necessário vos é nascer de novo." },
          { n: 8, text: "O vento assopra onde quer, e ouves a sua voz, mas não sabes donde vem, nem para onde vai; assim é todo aquele que é nascido do Espírito." },
          { n: 9, text: "Nicodemos respondeu e disse-lhe: Como pode ser isso?" },
          { n: 10, text: "Jesus respondeu e disse-lhe: Tu és mestre de Israel e não sabes isso?" },
          { n: 11, text: "Na verdade, na verdade te digo que nós dizemos o que sabemos e testificamos o que vimos, e não aceitais o nosso testemunho." },
          { n: 12, text: "Se vos falei de coisas terrestres, e não crestes, como crereis, se vos falar das celestiais?" },
          { n: 13, text: "Ora, ninguém subiu ao céu, senão o que desceu do céu, o Filho do Homem, que está no céu." },
          { n: 14, text: "E, como Moisés levantou a serpente no deserto, assim importa que o Filho do Homem seja levantado," },
          { n: 15, text: "para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
          { n: 16, text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
          { n: 17, text: "Porque Deus enviou o seu Filho ao mundo não para que condenasse o mundo, mas para que o mundo fosse salvo por ele." },
          { n: 18, text: "Quem crê nele não é condenado; mas quem não crê já está condenado, porquanto não crê no nome do unigênito Filho de Deus." },
          { n: 19, text: "E a condenação é esta: Que a luz veio ao mundo, e os homens amaram mais as trevas do que a luz, porque as suas obras eram más." },
          { n: 20, text: "Porque todo aquele que faz o mal aborrece a luz e não vem para a luz para que as suas obras não sejam reprovadas." },
          { n: 21, text: "Mas quem pratica a verdade vem para a luz, a fim de que as suas obras sejam manifestas, porque são feitas em Deus." }
        ]
      }
    }
  },
  NVI: {
    gn: {
      1: {
        verses: [
          { n: 1, text: "No princípio Deus criou os céus e a terra." },
          { n: 2, text: "Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas." },
          { n: 3, text: "Disse Deus: \"Haja luz!\" E houve luz." },
          { n: 4, text: "Viu Deus que a luz era boa, e separou a luz das trevas." },
          { n: 5, text: "Deus chamou à luz dia, e às trevas chamou noite. Passaram-se a tarde e a manhã; esse foi o primeiro dia." },
          { n: 6, text: "Depois disse Deus: \"Haja entre as águas um firmamento que separe águas de águas\"." },
          { n: 7, text: "Então Deus fez o firmamento e separou as águas que estavam embaixo do firmamento das que estavam por cima. E assim foi." },
          { n: 8, text: "Ao firmamento Deus chamou céu. Passaram-se a tarde e a manhã; esse foi o segundo dia." },
          { n: 9, text: "E disse Deus: \"Ajuntem-se num só lugar as águas que estão debaixo do céu, e apareça a parte seca\". E assim foi." },
          { n: 10, text: "À parte seca Deus chamou terra, e chamou mares ao conjunto das águas. E Deus viu que ficou bom." },
          { n: 11, text: "Então disse Deus: \"Cubra-se a terra de vegetação: plantas que dêem sementes e árvores cujos frutos produzam sementes de acordo com as suas espécies\". E assim foi." },
          { n: 12, text: "A terra produziu vegetação, plantas que davam sementes de acordo com as suas espécies, e árvores cujos frutos produziam sementes. E Deus viu que ficou bom." },
          { n: 13, text: "Passaram-se a tarde e a manhã; esse foi o terceiro dia." },
          { n: 14, text: "Disse Deus: \"Haja luminares no firmamento do céu para separar o dia da noite. Sirvam eles de sinais para marcar estações, dias e anos,\"" },
          { n: 15, text: "e sirvam de luminares no firmamento do céu para iluminar a terra. E assim foi." },
          { n: 16, text: "Deus fez os dois grandes luminares: o maior para governar o dia e o menor para governar a noite; fez também as estrelas." },
          { n: 17, text: "Deus os colocou no firmamento do céu para iluminar a terra," },
          { n: 18, text: "governar o dia e a noite, e separar a luz das trevas. E Deus viu que ficou bom." },
          { n: 19, text: "Passaram-se a tarde e a manhã; esse foi o quarto dia." },
          { n: 20, text: "Disse também Deus: \"Encham-se as águas de seres vivos, e voem as aves sobre a terra, sob o firmamento do céu\"." },
          { n: 21, text: "Assim Deus criou os grandes animais aquáticos e os demais seres vivos que povoam as águas, de acordo com as suas espécies; e todas as aves, de acordo com as suas espécies. E Deus viu que ficou bom." },
          { n: 22, text: "Então Deus os abençoou, dizendo: \"Sejam férteis e multipliquem-se! Encham as águas dos mares! E multipliquem-se as aves na terra\"." },
          { n: 23, text: "Passaram-se a tarde e a manhã; esse foi o quinto dia." },
          { n: 24, text: "E disse Deus: \"Produza a terra seres vivos de acordo com as suas espécies: rebanhos domésticos, animais selvagens e os demais seres vivos da terra, cada um de acordo com a sua espécie\". E assim foi." },
          { n: 25, text: "Deus fez os animais selvagens de acordo com as suas espécies, os rebanhos domésticos e os demais seres vivos da terra. E Deus viu que ficou bom." },
          { n: 26, text: "Então disse Deus: \"Façamos o homem à nossa imagem, conforme a nossa semelhança. Domine ele sobre os peixes do mar, sobre as aves do céu, sobre os grandes animais e sobre todos os pequenos animais que se movem rente ao chão\"." },
          { n: 27, text: "Criou Deus o homem à sua imagem, à imagem de Deus o criou; homem e mulher os criou." },
          { n: 28, text: "Deus os abençoou, e lhes disse: \"Sejam férteis e multipliquem-se! Encham e subjuguem a terra! Dominem sobre os peixes do mar, sobre as aves do céu e sobre todos os animais que se movem pela terra\"." },
          { n: 29, text: "Disse Deus: \"Eis que lhes dou todas as plantas que nascem em toda a terra e produzem sementes, e todas as árvores que dão frutos com sementes. Elas servirão de alimento para vocês\"." },
          { n: 30, text: "E dou todos os vegetais como alimento a tudo o que tem em si fôlego de vida: a todos os grandes animais da terra, a todas as aves do céu e a todos os pequenos animais que se movem rente ao chão. E assim foi." },
          { n: 31, text: "E Deus viu tudo o que havia feito, e tudo havia ficado muito bom. Passaram-se a tarde e a manhã; esse foi o sexto dia." }
        ]
      },
      2: {
        verses: [
          { n: 1, text: "Assim foram concluídos os céus e a terra, e todo o seu exército." },
          { n: 2, text: "No sétimo dia Deus já havia concluído a obra que realizara, e nesse dia descansou de toda a sua obra." },
          { n: 3, text: "Abençoou Deus o sétimo dia e o santificou, porque nele descansou de toda a obra que realizara na criação." },
          { n: 4, text: "Esta é a história das origens dos céus e da terra, no tempo em que foram criados: Quando o SENHOR Deus fez a terra e os céus," },
          { n: 7, text: "então o SENHOR Deus formou o homem do pó da terra e soprou em suas narinas o fôlego de vida, e o homem se tornou um ser vivente." }
        ]
      }
    },
    sl: {
      23: {
        verses: [
          { n: 1, text: "O SENHOR é o meu pastor; de nada terei falta." },
          { n: 2, text: "Em verdes pastagens me faz repousar e me conduz a águas tranqüilas;" },
          { n: 3, text: "restaura-me o vigor. Guia-me nas veredas da justiça por amor do seu nome." },
          { n: 4, text: "Mesmo quando eu andar por um vale de trevas e morte, não temerei perigo algum, pois tu estás comigo; a tua vara e o teu cajado me protegem." },
          { n: 5, text: "Preparas um banquete para mim à vista dos meus inimigos. Tu unges a minha cabeça com óleo, e o meu cálice transborda." },
          { n: 6, text: "Sei que a bondade e a fidelidade me acompanharão todos os dias da minha vida, e voltarei à casa do SENHOR enquanto eu viver." }
        ]
      }
    },
    jo: {
      3: {
        verses: [
          { n: 1, text: "Havia entre os fariseus um homem chamado Nicodemos, uma das principais autoridades judaicas." },
          { n: 2, text: "Ele veio a Jesus, à noite, e disse: \"Mestre, sabemos que ensinas da parte de Deus, pois ninguém pode realizar os sinais miraculosos que estás fazendo, se Deus não estiver com ele\"." },
          { n: 3, text: "Em resposta, Jesus declarou: \"Digo a verdade: Ninguém pode ver o Reino de Deus, se não nascer de novo\"." },
          { n: 4, text: "Perguntou Nicodemos: \"Como alguém pode nascer, sendo velho? É claro que não pode entrar pela segunda vez no ventre de sua mãe e renascer!\"" },
          { n: 5, text: "Respondeu Jesus: \"Digo a verdade: Ninguém pode entrar no Reino de Deus, se não nascer da água e do Espírito." },
          { n: 6, text: "O que nasce da carne é carne, mas o que nasce do Espírito é espírito." },
          { n: 7, text: "Não se surpreenda pelo fato de eu ter dito: É necessário que vocês nasçam de novo." },
          { n: 8, text: "O vento sopra onde quer. Você o escuta, mas não pode dizer de onde vem nem para onde vai. Assim acontece com todos os nascidos do Espírito\"." },
          { n: 14, text: "Da mesma forma como Moisés levantou a serpente no deserto, assim também é necessário que o Filho do homem seja levantado," },
          { n: 15, text: "para que todo o que nele crer tenha a vida eterna." },
          { n: 16, text: "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna." },
          { n: 17, text: "Pois Deus enviou o seu Filho ao mundo, não para condenar o mundo, mas para que este fosse salvo por meio dele." },
          { n: 18, text: "Quem nele crê não é condenado, mas quem não crê já está condenado, por não crer no nome do Filho Unigênito de Deus." },
          { n: 19, text: "Este é o julgamento: a luz veio ao mundo, mas os homens amaram as trevas, e não a luz, porque as suas obras eram más." },
          { n: 20, text: "Quem pratica o mal odeia a luz e não se aproxima da luz, temendo que as suas obras sejam manifestas." },
          { n: 21, text: "Mas quem pratica a verdade vem para a luz, para que se veja claramente que as suas obras são realizadas por intermédio de Deus\"." }
        ]
      }
    }
  }
};

export function getStaticChapterData(bookId: string, chapter: number, translation: Translation = 'ARC'): Chapter | null {
  const b = bookId.toLowerCase();
  const tr = (translation === 'NVI' ? 'NVI' : 'ARC');
  
  if (STATIC_CORPUS[tr] && STATIC_CORPUS[tr][b] && STATIC_CORPUS[tr][b][chapter]) {
    return {
      bookId: b,
      chapter,
      translation,
      verses: STATIC_CORPUS[tr][b][chapter].verses
    };
  }

  // Fallback to ARC if NVI does not have that specific chapter in static cache
  if (STATIC_CORPUS.ARC[b] && STATIC_CORPUS.ARC[b][chapter]) {
    return {
      bookId: b,
      chapter,
      translation,
      verses: STATIC_CORPUS.ARC[b][chapter].verses
    };
  }

  return null;
}
