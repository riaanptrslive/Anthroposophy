// Source structure comes first. The lesson IDs below are a teaching crosswalk,
// never evidence that a book contains that many chapters.
const range=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const group=(key,en,pt,ids,kind='chapter')=>({key,title:{en,pt},ids,kind});
const opening=ids=>group('opening','Prefaces and introduction','Prefácios e introdução',ids,'opening');
const synthesis=ids=>group('synthesis','Connections across the book','Relações entre as partes do livro',ids,'synthesis');
const parse=s=>s.trim().split('\n').map(row=>{const [en,pt]=row.split('|').map(s=>s.trim());if(!en||!pt)throw Error('Incomplete concept translation');return {en:en.split('; '),pt:pt.split('; ')};});

export const curricula={
  theosophy:{book:'theosophy',review:'theosophy-chapter-teaching-plan.md',groups:[opening([0]),group('1','I. The Essential Nature of Man','I. A natureza essencial do ser humano',range(1,6)),group('2','II. Re-embodiment of the Spirit and Destiny','II. Reencarnação do espírito e destino',range(7,9)),group('3','III. The Three Worlds','III. Os três mundos',range(10,17)),group('4','IV. The Path of Knowledge','IV. O caminho do conhecimento',range(18,21)),synthesis([22])],focus:parse(`
Active reading; understanding and spiritual perception | Leitura ativa; compreensão e percepção espiritual
Body, soul and spirit; perception, personal response and truth | Corpo, alma e espírito; percepção, resposta pessoal e verdade
Bodily conditions; sensation, feeling and will | Condições corporais; sensação, sentimento e vontade
Etheric organization; life, form and sensation | Organização etérica; vida, forma e sensação
Sentient, intellectual and consciousness soul | Alma da sensação, alma do intelecto e alma da consciência
The I; spiritual individuality and transformation | O eu; individualidade espiritual e transformação
Threefold, fourfold, sevenfold and ninefold accounts | Concepções tríplice, quádrupla, sétupla e nônupla
Memory as present activity; experience becoming capacity | Memória como atividade presente; experiência que se torna capacidade
Heredity; biography and repeated earthly lives | Hereditariedade; biografia e vidas terrestres sucessivas
Karma; deeds, consequences and destiny | Carma; ações, consequências e destino
Soul-world regions; sympathy and antipathy | Regiões do mundo anímico; simpatia e antipatia
Bodily desire; purification after death | Desejo corporal; purificação após a morte
Spiritland; living archetypes | Mundo espiritual; arquétipos vivos
Life between incarnations; transformation of experience | Vida entre encarnações; transformação da experiência
Spiritual purpose; return to earthly life | Propósito espiritual; retorno à vida terrestre
Physical manifestation; interpenetrating worlds | Manifestação física; mundos que se interpenetram
Group souls; folk, time and elemental beings | Almas de grupo; seres dos povos, das épocas e elementais
Thought forms; the aura and spiritual colour | Formas de pensamento; aura e cor espiritual
Disciplined thinking; understanding before direct perception | Pensamento disciplinado; compreensão antes da percepção direta
Equanimity; feeling and judgment | Equanimidade; sentimento e julgamento
Continuity of thought; responsibility in action | Continuidade do pensamento; responsabilidade na ação
Individual freedom; knowledge and ordinary duties | Liberdade individual; conhecimento e deveres cotidianos
Human constitution, destiny, worlds and knowledge | Constituição humana, destino, mundos e conhecimento
`)},
  'higher-worlds':{book:'higher-worlds',review:'higher-worlds-reading-review.md',groups:[opening([0]),group('1','How Is Knowledge of the Higher Worlds Attained?','Como se adquire conhecimento dos mundos superiores?',[1,2]),group('2','The Stages of Initiation','Os graus da iniciação',[3,4,5,6]),group('3','Practical Aspects','Aspectos práticos',[7]),group('4','Conditions of Esoteric Training','Condições do treinamento esotérico',[8,9]),group('5','Some Results of Initiation','Alguns resultados da iniciação',[10,11]),group('6','Transformation of Dream Life','Transformação da vida onírica',[12]),group('7','Continuity of Consciousness','Continuidade da consciência',[13]),group('8','The Splitting of the Personality','A separação das forças da personalidade',[14]),group('9','The Guardian of the Threshold','O Guardião do Limiar',[15]),group('10','Life and Death: the Greater Guardian','Vida e morte: o Guardião maior',[16]),group('appendix','Appendix','Apêndice',[17],'appendix'),synthesis([18])],focus:parse(`
Supersensible knowledge; preparation and responsibility | Conhecimento suprassensível; preparação e responsabilidade
Reverence for knowledge; receptivity and judgment | Reverência pelo conhecimento; receptividade e julgamento
Inner tranquillity; essential and incidental experience | Tranquilidade interior; experiência essencial e incidental
Probation; growth, decay and attentive listening | Preparação; crescimento, declínio e escuta atenta
Enlightenment; latent life and the seed exercise | Iluminação; vida latente e exercício da semente
Character development; patience and truthfulness | Desenvolvimento do caráter; paciência e veracidade
Fire, water and air trials; spiritual signs | Provas do fogo, da água e do ar; sinais espirituais
Equanimity; tact and desire | Equanimidade; tato e desejo
Training conditions; care and shared responsibility | Condições do treinamento; cuidado e responsabilidade compartilhada
Resolve, gratitude and harmony | Resolução, gratidão e harmonia
Lotus flowers; spiritual organs and colour language | Flores de lótus; órgãos espirituais e linguagem da cor
Etheric currents; the higher self | Correntes etéricas; o eu superior
Dream imagery; conscious spiritual perception | Imagens oníricas; percepção espiritual consciente
Sleep; continuity of consciousness | Sono; continuidade da consciência
Thinking, feeling and willing; deliberate coordination | Pensar, sentir e querer; coordenação deliberada
The lesser Guardian; character and karmic responsibility | O Guardião menor; caráter e responsabilidade cármica
The greater Guardian; earthly service and liberation | O Guardião maior; serviço terrestre e libertação
Pure thought; spiritual perception and mediumship | Pensamento puro; percepção espiritual e mediunidade
Preparation, claimed faculties and responsibility | Preparação, faculdades descritas e responsabilidade
`)},
  'philosophy-of-freedom':{book:'philosophy-of-freedom',review:'knowledge-base/freedom-source-map.md',groups:[opening([0]),...[
['Conscious Human Action','A ação humana consciente',[1]],['The Fundamental Desire for Knowledge','O impulso fundamental para o conhecimento',[2]],['Thinking in the Service of Understanding the World','O pensar a serviço da compreensão do mundo',[3,4]],['The World as Percept','O mundo como percepção',[5,6]],['Knowing the World','O conhecimento do mundo',[7,8]],['Human Individuality','A individualidade humana',[9]],['Are There Limits to Knowledge?','Existem limites para o conhecimento?',[10]],['The Factors of Life','Os fatores da vida',[11]],['The Idea of Freedom','A ideia da liberdade',[12,13]],['Freedom and Monism','Liberdade e monismo',[14]],['World Purpose and Life Purpose','Finalidade do mundo e finalidade da vida',[15]],['Moral Imagination','A imaginação moral',[16,17]],['The Value of Life','O valor da vida',[18,19]],['Individuality and Type','Individualidade e gênero',[20]]
].map(([en,pt,ids],i)=>group(String(i+1),`${i+1}. ${en}`,`${i+1}. ${pt}`,ids)),group('conclusion','The Consequences of Monism','As consequências do monismo',[21],'conclusion')],focus:parse(`
Independent judgment; philosophical observation | Julgamento independente; observação filosófica
Conscious motive; freedom of action and freedom of willing | Motivo consciente; liberdade de ação e liberdade do querer
Self and world; dualism and monism | Eu e mundo; dualismo e monismo
Observation; thinking as an activity | Observação; pensar como atividade
Producing thought; observing completed thinking | Produzir pensamentos; observar o pensar realizado
Percept; mental picture and critical idealism | Percepção; representação e idealismo crítico
Subject and object; the argument from bodily mediation | Sujeito e objeto; o argumento da mediação corporal
Percept and concept; knowledge as their connection | Percepção e conceito; conhecimento como sua relação
Intuition; shared concepts and individual perspectives | Intuição; conceitos compartilhados e perspectivas individuais
Individualized concept; representation and feeling | Conceito individualizado; representação e sentimento
Limits of knowledge; monism and hypothetical reality | Limites do conhecimento; monismo e realidade hipotética
Thinking, feeling and willing; mysticism and will philosophy | Pensar, sentir e querer; misticismo e filosofia da vontade
Motive and driving force; ethical intuition | Motivo e força motriz; intuição ética
Ethical individualism; a freely understood deed | Individualismo ético; ação livremente compreendida
Moral authority; monism and coexistence | Autoridade moral; monismo e convivência
Causality and purpose; a represented aim | Causalidade e finalidade; um fim representado
Moral imagination; realizing an ethical insight | Imaginação moral; realização de uma intuição ética
Moral technique; knowledge of practical conditions | Técnica moral; conhecimento das condições práticas
Desire, enjoyment and satisfaction; pessimism | Desejo, prazer e satisfação; pessimismo
Value of an aim; ethical striving | Valor de um fim; esforço ético
Individuality and general categories; understanding another | Individualidade e categorias gerais; compreensão do outro
Unity of knowing and acting; the consequences of monism | Unidade entre conhecer e agir; consequências do monismo
`)},
  'according-to-luke':{book:'according-to-luke',review:'according-to-luke-reading-review.md',groups:[opening([0]),...['15','16','17','18','19','20','21','24','25','26'].map((d,i)=>group(String(i+1),`Lecture ${i+1} · ${d} September 1909`,`Palestra ${i+1} · ${d} de setembro de 1909`,[i+1],'lecture')),synthesis([11])],focus:parse(`
Gospel, spiritual research and editorial interpretation | Evangelho, pesquisa espiritual e interpretação editorial
Imagination, Inspiration and Intuition; Akashic record | Imaginação, Inspiração e Intuição; registro akáshico
Bodhisattva and Buddha; compassion as a human capacity | Bodisatva e Buda; compaixão como capacidade humana
Eightfold Path; Nirmanakaya and the Nathan Jesus | Caminho óctuplo; Nirmanakaya e Jesus natânico
Nathan and Solomon genealogies; the two Jesus children | Genealogias natânica e salomônica; os dois meninos Jesus
Zarathustra’s I; convergence of spiritual streams | O eu de Zaratustra; convergência de correntes espirituais
Moses, Elijah and John; moral development | Moisés, Elias e João; desenvolvimento moral
Baptism; Jesus and the Christ being | Batismo; Jesus e o ser do Cristo
The I, soul and body; healing and the sower | O eu, a alma e o corpo; curas e o semeador
Love as teaching and power; faith and the I | Amor como ensinamento e força; fé e o eu
Golgotha; initiation, Nain and hope | Gólgota; iniciação, Naim e esperança
Christology; the relation between knowledge and compassionate action | Cristologia; relação entre conhecimento e ação compassiva
`)},
  colour:{book:'colour',review:'colour-reading-review.md',groups:[opening([0]),...['6 May 1921|6 de maio de 1921','7 May 1921|7 de maio de 1921','8 May 1921|8 de maio de 1921','26 July 1914|26 de julho de 1914','1 January 1915|1 de janeiro de 1915','5 December 1920|5 de dezembro de 1920','10 December 1920|10 de dezembro de 1920','21 February 1923|21 de fevereiro de 1923','2 June 1923|2 de junho de 1923','9 June 1923|9 de junho de 1923','29 July 1923|29 de julho de 1923','4 January 1924|4 de janeiro de 1924'].map((s,i)=>{const [en,pt]=s.split('|');return group(String(i+1),`Talk ${i+1} · ${en}`,`Palestra ${i+1} · ${pt}`,[i+1],'lecture');}),synthesis([13])],focus:parse(`
Colour experience; artistic practice and spiritual interpretation | Experiência da cor; prática artística e interpretação espiritual
Relational colour; four image colours | Cor em relação; quatro cores-imagem
Image and lustre; yellow, blue and red gestures | Imagem e brilho; gestos do amarelo, azul e vermelho
Material colour; form arising through colour | Cor material; forma que nasce da cor
Colour movement; Goetheanum and shared artistic language | Movimento da cor; Goetheanum e linguagem artística compartilhada
Colour and musical tone; reverence and inward strength | Cor e tom musical; reverência e força interior
Thought and light; will and darkness | Pensamento e luz; vontade e escuridão
Moral action; spiritual causality and world development | Ação moral; causalidade espiritual e desenvolvimento do mundo
Light, darkness and medium; conditions of colour perception | Luz, escuridão e meio; condições da percepção cromática
Linear and colour perspective | Perspectiva linear e perspectiva cromática
Pictorial composition; weight, mediation and radiance | Composição pictórica; peso, mediação e luminosidade
Measure and visual weight; qualitative balance | Medida e peso visual; equilíbrio qualitativo
Spiritual hierarchies; warmth, light, colour and life | Hierarquias espirituais; calor, luz, cor e vida
Image, lustre and composition; an explained portfolio | Imagem, brilho e composição; portfólio explicado
`)},
  temperaments:{book:'four-temperaments',review:'knowledge-base/four-temperaments-close-reading.md',groups:[group('lecture','The Four Temperaments · Berlin, 4 March 1909','Os quatro temperamentos · Berlim, 4 de março de 1909',range(0,9),'lecture'),synthesis([10])],focus:parse(`
Individuality; temperament as a colouring of the person | Individualidade; temperamento como tonalidade da pessoa
Heredity and reincarnation; temperament as mediation | Hereditariedade e reencarnação; temperamento como mediação
Four members; relative predominance | Quatro membros; predominância relativa
Choleric tendency; I, purpose and resistance | Tendência colérica; eu, propósito e resistência
Sanguine tendency; astral responsiveness and interest | Tendência sanguínea; resposta astral e interesse
Phlegmatic tendency; etheric life and contentment | Tendência fleumática; vida etérica e contentamento
Melancholic tendency; bodily resistance and sensitivity | Tendência melancólica; resistência corporal e sensibilidade
Mixtures; outward appearance and individual differences | Misturas; aparência exterior e diferenças individuais
Education through existing capacities; four proposed approaches | Educação pelas capacidades existentes; quatro propostas
Indirect self-education; reason shaping circumstances | Autoeducação indireta; razão que organiza circunstâncias
Temperament knowledge; individualized understanding | Conhecimento dos temperamentos; compreensão individualizada
`)},
  'mystery-temperaments':{book:'mystery-temperaments',review:'knowledge-base/mystery-temperaments-close-reading.md',groups:[group('discussion','The Mystery of Temperaments · one continuous discussion','O mistério dos temperamentos · uma discussão contínua',range(0,13),'discussion'),synthesis([14])],focus:parse(`
Individual encounter; source and translation | Encontro individual; fonte e tradução
General human nature; the particular person | Natureza humana geral; pessoa particular
Inherited traits; spiritual individuality and repeated lives | Traços herdados; individualidade espiritual e vidas sucessivas
Temperament; mediation between two streams | Temperamento; mediação entre duas correntes
Physical, etheric, astral and I; predominance | Físico, etérico, astral e eu; predominância
Four portraits; inward tendencies and outward action | Quatro retratos; tendências interiores e ação exterior
Physiognomy; inference from appearance | Fisiognomia; inferência a partir da aparência
Mixtures; proportion and diversity | Misturas; proporção e diversidade
Sanguine education; affection and interest | Educação sanguínea; afeto e interesse
Choleric education; competence and resistance | Educação colérica; competência e resistência
Melancholic education; compassion and suffering | Educação melancólica; compaixão e sofrimento
Phlegmatic education; shared interest and companionship | Educação fleumática; interesse compartilhado e companhia
Indirect reason; self-education | Razão indireta; autoeducação
Knowledge becoming tact; social understanding | Conhecimento que se torna tato; compreensão social
Individuality, temperament and a revisable judgment | Individualidade, temperamento e julgamento revisável
`)},
  'understand-temperament':{book:'understand-your-temperament',review:'understand-temperament-reading-review.md',groups:[opening([0]),...[
['The Same — only Different!','Iguais — mas diferentes!'],['The Psychology of the Temperaments','A psicologia dos temperamentos'],['The Choleric Temperament','O temperamento colérico'],['The Sanguine Temperament','O temperamento sanguíneo'],['The Phlegmatic Temperament','O temperamento fleumático'],['The Melancholic Temperament','O temperamento melancólico'],['In the Workplace','No ambiente de trabalho'],['Joys and Woes of Compatibility','Alegrias e dificuldades da compatibilidade'],['Love — That’s Why We’re Here!','Amor — é por isso que estamos aqui!']
].map(([en,pt],i)=>group(String(i+1),`${i+1}. ${en}`,`${i+1}. ${pt}`,[i+1])),group('appendix-1','Appendix I · Hints for Dedicated People Watchers','Apêndice I · Indicações para observadores de pessoas',[10],'appendix'),group('appendix-2','Appendix II · The Riddle of the Four Body Types','Apêndice II · O enigma dos quatro tipos corporais',[11],'appendix'),synthesis([12])],focus:parse(`
Childs’s interpretation; temperament and individuality | Interpretação de Childs; temperamento e individualidade
Disposition, mixtures and the use of capacities | Disposição, misturas e uso das capacidades
Psychological axes; orientation, thinking and stability | Eixos psicológicos; orientação, pensamento e estabilidade
Initiative and perseverance; pride and correction | Iniciativa e perseverança; orgulho e correção
Responsiveness and imagination; commitment | Receptividade e imaginação; compromisso
Steadiness, privacy and participation | Constância, privacidade e participação
Sensitivity, seriousness and understanding | Sensibilidade, seriedade e compreensão
Mutual dependence; aptitude and responsibility | Dependência mútua; aptidão e responsabilidade
Ten pairings; caricature and individual relationships | Dez combinações; caricatura e relações individuais
Soul and spirit; reincarnation and love | Alma e espírito; reencarnação e amor
Observation and physiognomy; permanence and change | Observação e fisiognomia; permanência e mudança
Two-by-two body types; bodily form and temperament | Tipos corporais em dois eixos; forma corporal e temperamento
Disposition, context and an individual response | Disposição, contexto e resposta individual
`)},
  'encountering-the-self':{book:'encountering-the-self',review:'encountering-the-self-reading-review.md',groups:[opening([0]),...[
['Conversation with Peter’s Parents','Conversa com os pais de Peter'],['Conversation with Monica’s Parents','Conversa com os pais de Monica'],['Dear Parents','Queridos pais'],['The Ninth Year in Biography','O nono ano na biografia'],['The Second Seven Years','O segundo setênio'],['Children at Seven and Twelve','Crianças aos sete e aos doze anos'],['The Ninth Year Transition / The Move Within One’s Own House','A transição do nono ano / A mudança na própria casa'],['How the Curriculum Helps','Como o currículo ajuda'],['Disturbances in Thinking, Feeling, and Willing','Perturbações no pensar, sentir e querer'],['The Incarnation of the Ego','A encarnação do eu'],['A Word from the School Doctor','Uma palavra do médico escolar'],['The Sturdy Sapling','A muda vigorosa'],['The Half Moon-Nodes','Os meios nodos lunares'],['The Reversal in the Change of Teeth','A inversão na troca dos dentes'],['Rudolf Steiner’s Indications for Form Drawing','Indicações de Rudolf Steiner para o desenho de formas']
].map(([en,pt],i)=>group(String(i+1),en,pt,[i+1],i>=11?'appendix':'section')),synthesis([16])],focus:parse(`
Developmental interpretation; constructed conversations | Interpretação desenvolvimental; conversas construídas
Changed authority; privacy and useful work | Autoridade em mudança; privacidade e trabalho útil
Separation and belonging; fear and interpretation | Separação e pertencimento; medo e interpretação
Trustworthy authority; self-examination and repair | Autoridade confiável; autoexame e reparação
Biographical recollection; motifs of separation | Recordação biográfica; motivos de separação
Seven-year framework; changing emphases in learning | Esquema dos setênios; ênfases variáveis na aprendizagem
Head, limbs and trunk; making and planning | Cabeça, membros e tronco; fazer e planejar
Metamorphosis; the I and bodily development | Metamorfose; eu e desenvolvimento corporal
Curriculum; building, cultivation and living concepts | Currículo; construção, cultivo e conceitos vivos
Thinking, feeling and willing; learning under pressure | Pensar, sentir e querer; aprender sob pressão
Incarnation; Christian images of the I | Encarnação; imagens cristãs do eu
School-doctor interpretation; bodily and spiritual explanations | Interpretação do médico escolar; explicações corporais e espirituais
Rootedness and belonging; the sapling image | Enraizamento e pertencimento; imagem da muda
Lunar nodes; proposed developmental correspondence | Nodos lunares; correspondência desenvolvimental proposta
Change of teeth; reversal and spatial form | Troca dos dentes; inversão e forma espacial
Form drawing; reflection and inner–outer relations | Desenho de formas; reflexão e relações interior–exterior
Development, curriculum and adult judgment | Desenvolvimento, currículo e julgamento do adulto
`)},
  'practical-thinking':{book:'practical-thinking',review:'practical-thinking-depth-review.md',groups:[group('lecture','Practical Training in Thought · Karlsruhe, 18 January 1909','Educação prática do pensamento · Karlsruhe, 18 de janeiro de 1909',range(0,9),'lecture')],focus:parse(`
Habit and practicality; thinking fitted to its object | Hábito e praticidade; pensamento adequado ao objeto
Thought in the world; the spiritual premise of inquiry | Pensamento no mundo; premissa espiritual da investigação
Observation and concept; disciplined description | Observação e conceito; descrição disciplinada
Successive states; continuity and change | Estados sucessivos; continuidade e mudança
Anticipation; correction by events | Antecipação; correção pelos acontecimentos
Reconstruction; evidence and imagined causes | Reconstrução; evidência e causas imaginadas
Self-directed attention; chosen thought | Atenção autodirigida; pensamento escolhido
Memory; imaginative completion and checking | Memória; complementação imaginativa e conferência
Suspended judgment; alternatives and causal inference | Suspensão do julgamento; alternativas e inferência causal
Cause and effect; practical judgment | Causa e efeito; julgamento prático
`)},
  'ancient-myths':{book:'ancient-myths',review:'ancient-myths-review.md',groups:[opening([0]),...['4','5','6','8','11','12','13'].map((d,i)=>group(String(i+1),`Lecture ${i+1} · ${d} January 1918`,`Palestra ${i+1} · ${d} de janeiro de 1918`,[i+1],'lecture'))],focus:parse(`
Mythic narrative; spiritual interpretation | Narrativa mítica; interpretação espiritual
Isis, Osiris and Greek gods; mythic consciousness | Ísis, Osíris e deuses gregos; consciência mítica
Image and language; development of abstraction | Imagem e linguagem; desenvolvimento da abstração
Veil of Isis; knowledge and Imagination | Véu de Ísis; conhecimento e Imaginação
Heredity and individuality; the question of freedom | Hereditariedade e individualidade; questão da liberdade
Cultural epochs; changing conditions of development | Épocas culturais; condições variáveis de desenvolvimento
Head and heart; understanding becoming lived insight | Cabeça e coração; compreensão que se torna experiência
Education; renewing rather than copying mythic consciousness | Educação; renovar em vez de copiar a consciência mítica
`)},
  nutrition:{book:'nutrition',review:'nutrition-reading-review.md',autoChapters:true,focus:parse(`
Editor and lecture reports; knowledge and judgment | Editor e registros de palestras; conhecimento e julgamento
Active nourishment; fourfold constitution and freedom | Nutrição ativa; constituição quádrupla e liberdade
Substance and spirit; cosmic transformation | Substância e espírito; transformação cósmica
Milk, plants and meat; earthly and cosmic relations | Leite, plantas e carne; relações terrestres e cósmicas
Four members; processes of substance and counteraction | Quatro membros; processos da substância e ação contrária
Cultivation and food quality; individual observation | Cultivo e qualidade alimentar; observação individual
Digestion as transformation; physical process and spiritual account | Digestão como transformação; processo físico e concepção espiritual
Preparation; inner work and individual capacity | Preparo; trabalho interior e capacidade individual
Material and stimulus; plant organs and the human being | Material e estímulo; órgãos vegetais e ser humano
Protein, fat, carbohydrate and salt; functional correspondences | Proteínas, gorduras, carboidratos e sal; correspondências funcionais
Alcohol and the I; education and freedom | Álcool e eu; educação e liberdade
Nicotine; proposed relations between breathing and circulation | Nicotina; relações propostas entre respiração e circulação
Outer change and inner development; nutrition and health | Mudança exterior e desenvolvimento interior; nutrição e saúde
Substance, transformation and agency; comparing lectures | Substância, transformação e ação própria; comparação de palestras
`)},
  foodwise:{book:'foodwise',review:'foodwise-reading-review.md',autoChapters:true,chapterTitles:{19:{en:'Cooking and Menu-planning',pt:'Cozinhar e planejar refeições'}},focus:parse(`
Memoir and observation; food as relationship | Memória e observação; alimento como relação
Food history; changing consciousness and responsibility | História alimentar; consciência e responsabilidade em mudança
Farm organism; fertility and ecological relationships | Organismo agrícola; fertilidade e relações ecológicas
Physical, etheric, astral and I; the fourfold human being | Físico, etérico, astral e eu; ser humano quádruplo
Grasses and seven cereals; cultivation and processing | Gramíneas e sete cereais; cultivo e processamento
Digestion, senses and breathing; transformation | Digestão, sentidos e respiração; transformação
Vegetarianism; distinct ethical, ecological and spiritual arguments | Vegetarianismo; argumentos éticos, ecológicos e espirituais distintos
Root, leaf and fruit; threefold plant correspondences | Raiz, folha e fruto; correspondências da planta tríplice
Starch and sweetness; concentration and processing | Amido e doçura; concentração e processamento
Fermentation; time, skill and bread | Fermentação; tempo, habilidade e pão
Nightshades; botanical relationship and preparation | Solanáceas; relação botânica e preparo
Legumes; soil fertility and culinary transformation | Leguminosas; fertilidade do solo e transformação culinária
Milk; symbolism, processing and individual response | Leite; simbolismo, processamento e resposta individual
Fats and oils; physical qualities and warmth imagery | Gorduras e óleos; qualidades físicas e imagens do calor
Salt as substance; the alchemical salt-process | Sal como substância; processo alquímico do sal
Soil, minerals and food; the supplement question | Solo, minerais e alimentos; questão dos suplementos
Herbs and spices; plant parts, flavour and proportion | Ervas e especiarias; partes vegetais, sabor e proporção
Stimulants; habit, fatigue and freedom | Estimulantes; hábito, cansaço e liberdade
Water; ecology and spiritual interpretation | Água; ecologia e interpretação espiritual
Meal composition; people, resources and sequence | Composição da refeição; pessoas, recursos e sequência
Heat and cooking methods; transformation through preparation | Calor e métodos culinários; transformação pelo preparo
Shared meals; rhythm and participation | Refeições compartilhadas; ritmo e participação
Responsibility; informed, feasible action | Responsabilidade; ação informada e possível
Growing, preparing and sharing; a meal as a whole | Cultivar, preparar e compartilhar; refeição como totalidade
`)},
  phases:{book:'phases',review:'phases-reading-review.md',groups:[opening([0]),group('1','1. Surveying the Terrain','1. Reconhecendo o terreno',[1,2]),group('2','2. The Course of Life','2. O curso da vida',range(3,10)),group('3','3. Male and Female Development—Marriage','3. Desenvolvimento masculino e feminino — casamento',[11]),group('4','4. Basic Life Orientations','4. Orientações básicas da vida',[12]),group('5','5. Career Prospects and Personnel Policy','5. Perspectivas profissionais e política de pessoal',[13]),group('6','6. Images of Man, Biography and Psychotherapy','6. Imagens do ser humano, biografia e psicoterapia',[14,15,16]),group('7','7. Personal Development and Biography','7. Desenvolvimento pessoal e biografia',[17]),synthesis([18])],focus:parse(`
Biography; leitmotiv and the whole life | Biografia; tema recorrente e vida inteira
Growth and development; differentiation and integration | Crescimento e desenvolvimento; diferenciação e integração
Developmental phases; value-centres and interpretation | Fases desenvolvimentais; centros de valor e interpretação
Bodily, psychological and spiritual life lines | Linhas de vida corporal, psicológica e espiritual
Adolescence; identity, ideals and choice | Adolescência; identidade, ideais e escolha
Exploration; experience and responsibility | Exploração; experiência e responsabilidade
Organization; structure and flexibility | Organização; estrutura e flexibilidade
Changing values; meaning and established roles | Valores em mudança; sentido e papéis estabelecidos
Midlife reorientation; inner purpose and outer conditions | Reorientação da meia-idade; propósito interior e condições exteriores
Experience; authority and mentoring | Experiência; autoridade e orientação
Letting go; continuity of values and later creativity | Desapego; continuidade dos valores e criatividade tardia
Projection and shadow; recognizing the other | Projeção e sombra; reconhecimento do outro
Six orientations; contribution and excess | Seis orientações; contribuição e excesso
Lifelong learning; career, succession and renewal | Aprendizagem contínua; carreira, sucessão e renovação
Images of humanity; assumptions about development | Imagens da humanidade; pressupostos do desenvolvimento
Therapeutic schools; philosophical differences | Escolas terapêuticas; diferenças filosóficas
Levels of help; privacy and continuity | Níveis de ajuda; privacidade e continuidade
Inner and outer paths; Imagination, Inspiration and Intuition | Caminhos interior e exterior; Imaginação, Inspiração e Intuição
Biography; evidence, alternative interpretation and an open future | Biografia; evidência, interpretação alternativa e futuro aberto
`)},
  biodynamics:{book:'biodynamics',review:'biodynamics-reading-review.md',groups:[group('opening','Courtney’s introduction','Introdução de Courtney',[0],'opening'),...['Spiritual Beings I|Seres espirituais I','Spiritual Beings II|Seres espirituais II','Elementals I|Elementais I','Elementals II|Elementais II','Agriculture I|Agricultura I','Agriculture II|Agricultura II','Agriculture III|Agricultura III'].map((s,i)=>{const [en,pt]=s.split('|');return group(String(i+1),`${i+1}. ${en}`,`${i+1}. ${pt}`,[i+1]);}),synthesis([8])],focus:parse(`
Farm individuality; biodynamic practice and the anthology | Individualidade agrícola; prática biodinâmica e antologia
Sense perception and spiritual beings; changing consciousness | Percepção sensorial e seres espirituais; consciência em mudança
Etheric perception; elemental and hierarchical beings | Percepção etérica; seres elementais e hierárquicos
Root, leaf and flower; elemental activity in plant life | Raiz, folha e flor; atividade elemental na planta
Human and nature relations; the elemental cycle | Relações humanas e naturais; ciclo elemental
Farm organism; manure, horns and silica | Organismo agrícola; esterco, chifres e sílica
Compost preparations; plant substances and formative processes | Preparados de composto; substâncias vegetais e processos formativos
Weeds, pests and disease; ecological and cosmic relations | Ervas, pragas e doenças; relações ecológicas e cósmicas
Spiritual account and observation; a connected garden study | Concepção espiritual e observação; estudo integrado de um jardim
`)}
};

export const pairedRange=range;
