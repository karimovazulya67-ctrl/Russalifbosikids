import { Language } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  stages: {
    intro: string;
    attendance: string;
    review: string;
    newTopic: string;
    practice: string;
    games: string;
    quiz: string;
    evaluation: string;
  };
  stagesDesc: {
    intro: string;
    attendance: string;
    review: string;
    newTopic: string;
    practice: string;
    games: string;
    quiz: string;
    evaluation: string;
  };
  mascot: {
    greeting: string;
    name: string;
    role: string;
    introSpeech: string;
    correct: string[];
    tryAgain: string[];
    hintHelp: string;
  };
  common: {
    next: string;
    prev: string;
    start: string;
    continue: string;
    help: string;
    listen: string;
    slowListen: string;
    clear: string;
    check: string;
    restart: string;
    congrats: string;
    stars: string;
    score: string;
    level: string;
    easy: string;
    medium: string;
    hard: string;
    vowel: string;
    consonant: string;
    sign: string;
    printed: string;
    cursive: string;
    uppercase: string;
    lowercase: string;
    sound: string;
    words: string;
    print: string;
    downloadPdf: string;
    settings: string;
    alphabetMap: string;
    parentsGuide: string;
    teacherPanel: string;
    close: string;
  };
  attendance: {
    title: string;
    subtitle: string;
    present: string;
    absent: string;
    markAllPresent: string;
    addStudent: string;
    enterName: string;
    countingTitle: string;
    countingDesc: string;
    kidsPresentCount: string;
    startLesson: string;
  };
  review: {
    title: string;
    subtitle: string;
    clickToHear: string;
    matchPrompt: string;
    completedCount: string;
    nextCard: string;
  };
  newTopic: {
    title: string;
    selectLetter: string;
    penDirection: string;
    strokeOrder: string;
    watchPen: string;
    soundExpl: string;
    sampleWords: string;
    funFactTitle: string;
  };
  practice: {
    title: string;
    tracingTab: string;
    wordBuildTab: string;
    tracePrompt: string;
    traceCursivePrompt: string;
    penSize: string;
    guideLines: string;
    wellDoneTrace: string;
    wordBuildPrompt: string;
    dragOrClick: string;
    successWord: string;
  };
  games: {
    title: string;
    selectGame: string;
    game1Title: string;
    game1Desc: string;
    game2Title: string;
    game2Desc: string;
    game3Title: string;
    game3Desc: string;
    game4Title: string;
    game4Desc: string;
    game5Title: string;
    game5Desc: string;
    findTheLetter: string;
    tapWhenHear: string;
    pairsFound: string;
    rainCatchTarget: string;
    rainScore: string;
    trainInstruction: string;
    trainSuccess: string;
    gameOver: string;
    playAgain: string;
  };
  quiz: {
    title: string;
    question: string;
    questionOf: string;
    resultTitle: string;
    resultDesc: string;
    perfectScore: string;
    goodScore: string;
    keepPracticing: string;
    getCertificate: string;
  };
  evaluation: {
    title: string;
    subtitle: string;
    overview: string;
    totalStars: string;
    attendanceRate: string;
    averageScore: string;
    studentsList: string;
    generateCertificate: string;
    certificateTitle: string;
    certificateAwardedTo: string;
    certificateReason: string;
    certificateDate: string;
    certificateTeacherSig: string;
    printWorksheet: string;
    worksheetDesc: string;
  };
  parents: {
    title: string;
    subtitle: string;
    tip1Title: string;
    tip1Text: string;
    tip2Title: string;
    tip2Text: string;
    tip3Title: string;
    tip3Text: string;
    tip4Title: string;
    tip4Text: string;
  };
  settingsModal: {
    title: string;
    language: string;
    theme: string;
    light: string;
    dark: string;
    difficulty: string;
    slowMode: string;
    slowModeDesc: string;
    voiceGuidance: string;
    voiceGuidanceDesc: string;
    largeFont: string;
    highContrast: string;
    soundEffects: string;
    bgMusic: string;
  };
}

export const translations: Record<Language, Translations> = {
  uz: {
    appName: 'Rus tili alifbosi',
    appSubtitle: '5-6 yoshli bog\'cha tarbiyalanuvchilari uchun quvnoq ta\'lim',
    stages: {
      intro: 'Salomlashish',
      attendance: 'Davomat',
      review: 'Takrorlash',
      newTopic: 'Yangi harf',
      practice: 'Mashq qilish',
      games: 'O\'yinlar',
      quiz: 'Viktorina',
      evaluation: 'Baholash',
    },
    stagesDesc: {
      intro: 'Darsni boshlash va maskot bilan tanishish',
      attendance: 'Guruh davomati va quvnoq sanash',
      review: 'Oldingi o\'rganilgan harflarni mustahkamlash',
      newTopic: 'Bugungi yangi harf, tovush va so\'zlar',
      practice: 'Barmoq bilan harf chizish va so\'z yasash',
      games: '5 xil interaktiv alifbo o\'yinlari',
      quiz: 'Kichik sinov va yulduzlar yig\'ish',
      evaluation: 'Natijalar tahlili va diplom berish',
    },
    mascot: {
      name: 'Alifbek',
      role: 'Sizning quvnoq do\'stingiz va yordamchingiz',
      greeting: 'Salom, jajji bilimdon! Keling, birgalikda rus alifbosini o\'rganamiz!',
      introSpeech: 'Здравствуйте, ребята! Bugun biz ajoyib harflar olamiga sayohat qilamiz!',
      correct: ['Barakalla!', 'Ajoyib!', 'Juda to\'g\'ri!', 'Ofarin, bilimdonim!', 'Super natija!'],
      tryAgain: ['Yana bir bor urinib ko\'r!', 'Hechqisi yo\'q, qaytadan bos!', 'Sen albatta uddalaysan!'],
      hintHelp: 'Harfni diqqat bilan eshit va rangiga e\'tibor ber!',
    },
    common: {
      next: 'Keyingisi',
      prev: 'Oldingisi',
      start: 'Boshlash',
      continue: 'Davom etish',
      help: 'Yordam',
      listen: 'Tinglash',
      slowListen: 'Sekin eshitish',
      clear: 'Tozalash',
      check: 'Tekshirish',
      restart: 'Qaytadan',
      congrats: 'Tabriklaymiz!',
      stars: 'Yulduzlar',
      score: 'Ball',
      level: 'Daraja',
      easy: 'Oson',
      medium: 'O\'rta',
      hard: 'Qiyin',
      vowel: 'Unli tovush',
      consonant: 'Undosh tovush',
      sign: 'Belgi',
      printed: 'Bosma',
      cursive: 'Yozma',
      uppercase: 'Katta',
      lowercase: 'Kichik',
      sound: 'Tovush',
      words: 'So\'zlar',
      print: 'Chop etish',
      downloadPdf: 'Yuklab olish',
      settings: 'Sozlamalar',
      alphabetMap: 'Alifbo xaritasi',
      parentsGuide: 'Ota-onalarga',
      teacherPanel: 'Tarbiyachi',
      close: 'Yopish',
    },
    attendance: {
      title: 'Davomat daftari',
      subtitle: 'Bugun darsimizda kimlar qatnashyapti?',
      present: 'Bor',
      absent: 'Kelmadi',
      markAllPresent: 'Barchasi keldi',
      addStudent: 'Bola qo\'shish',
      enterName: 'Bola ismini yozing...',
      countingTitle: 'Guruhda nechta bola bor?',
      countingDesc: 'Keling, qatnashayotgan bolalarni birgalikda sanaymiz!',
      kidsPresentCount: 'Hozir xonada bor bolalar soni',
      startLesson: 'Darsni boshlaymiz!',
    },
    review: {
      title: 'O\'tgan darsni takrorlash',
      subtitle: 'Oldingi o\'rganilgan harflarni xotirlaymiz!',
      clickToHear: 'Harf kartasini bosing va tovushni eshiting',
      matchPrompt: 'Eshitilgan tovushga mos rasmni tanlang:',
      completedCount: 'Takrorlangan harflar',
      nextCard: 'Keyingi harf',
    },
    newTopic: {
      title: 'Bugungi yangi harf',
      selectLetter: 'O\'rganiladigan harfni tanlang:',
      penDirection: 'Qalam harakati yo\'nalishi',
      strokeOrder: 'Harf qanday yoziladi?',
      watchPen: 'Qalam qanday chizishini diqqat bilan kuzating:',
      soundExpl: 'Harf talaffuzi va tavsifi',
      sampleWords: 'Bu harfdan boshlanuvchi so\'zlar:',
      funFactTitle: 'Qiziqarli ma\'lumot',
    },
    practice: {
      title: 'Amaliy mashqlar',
      tracingTab: 'Harf ustidan yurish (Tracing)',
      wordBuildTab: 'So\'z tuzish',
      tracePrompt: 'Barmoq yoki sichqoncha bilan harf konturi ustidan yuring!',
      traceCursivePrompt: 'Endi yozma harf ustidan chiroyli qilib yuring!',
      penSize: 'Qalam qalinligi',
      guideLines: 'Yo\'l chiziqlar',
      wellDoneTrace: 'Qoyilmaqom chizdingiz! Yulduzcha yutib oldingiz!',
      wordBuildPrompt: 'Harflarni to\'g\'ri tartibda joylashtirib so\'zni yig\'ing:',
      dragOrClick: 'Harflarni bosing yoki kerakli katakchaga torting',
      successWord: 'So\'z to\'g\'ri yig\'ildi!',
    },
    games: {
      title: 'Interaktiv o\'yinlar maydonchasi',
      selectGame: 'O\'ynash uchun o\'yinni tanlang:',
      game1Title: 'Harfni top',
      game1Desc: 'Ovozni eshitib, to\'g\'ri harfni bosing',
      game2Title: 'Juftini top',
      game2Desc: 'Bosma va yozma shakllarni juftlashtiring',
      game3Title: 'Harf yomg\'iri',
      game3Desc: 'Tushayotgan harflar ichidan keraklisini ushlang',
      game4Title: 'So\'z konstruktori',
      game4Desc: 'Rasmga qarab harflardan so\'z tuzing',
      game5Title: 'Alifbo poezdi',
      game5Desc: 'Harflarni vagonlarga alifbo tartibida joylang',
      findTheLetter: 'Mana bu harfni toping:',
      tapWhenHear: 'Tovushni eshitib to\'g\'ri kartani bosing',
      pairsFound: 'Topilgan juftliklar',
      rainCatchTarget: 'Ushlab oling:',
      rainScore: 'Yig\'ilgan ochko',
      trainInstruction: 'Vagonchalarni alifbo tartibida to\'g\'rilang:',
      trainSuccess: 'Poyezd to\'liq yig\'ildi va yo\'lga chiqmoqda!',
      gameOver: 'O\'yin yakunlandi!',
      playAgain: 'Yana o\'ynash',
    },
    quiz: {
      title: 'Kichik bilimdonlar viktorinasi',
      question: 'Savol',
      questionOf: 'dan',
      resultTitle: 'Sinov natijalari',
      resultDesc: 'Siz bugun juda ajoyib bilim ko\'rsatdingiz!',
      perfectScore: 'A\'lo! Barcha savollarga to\'g\'ri javob berildi!',
      goodScore: 'Yaxshi natija! Siz haqiqiy bilimdonsiz!',
      keepPracticing: 'Yana biroz mashq qilsak, yanada a\'lo bo\'ladi!',
      getCertificate: 'Sertifikatni ko\'rish',
    },
    evaluation: {
      title: 'Tarbiyachi xulosasi va baholash',
      subtitle: 'Bolalarning o\'zlashtirish darajasi va guruh statistikasi',
      overview: 'Umumiy ko\'rsatkichlar',
      totalStars: 'Jami yulduzlar',
      attendanceRate: 'Davomat foizi',
      averageScore: 'O\'rtacha test balli',
      studentsList: 'Bolalar ro\'yxati va yutuqlari',
      generateCertificate: 'Bolaga diplom chiqarish',
      certificateTitle: 'RUS TILI ALIFBOSI BILIMDONI',
      certificateAwardedTo: 'Ushbu diplom taqdim etiladi:',
      certificateReason: 'Rus tili alifbosi harflarini a\'lo darajada o\'zlashtirgani va faol qatnashgani uchun',
      certificateDate: 'Sana',
      certificateTeacherSig: 'Tarbiyachi imzosi',
      printWorksheet: 'Yozuv daftarini chop etish',
      worksheetDesc: 'Uyga vazifa va harf mashqlari uchun varaq',
    },
    parents: {
      title: 'Ota-onalar uchun tavsiyalar',
      subtitle: 'Farzandingiz bilan uyda rus tili harflarini qanday mustahkamlash mumkin?',
      tip1Title: 'Kuniga 10-15 daqiqa kifoya',
      tip1Text: '5-6 yoshli bola uzoq vaqt bir joyda o\'tira olmaydi. Har kuni 1 ta harfni o\'yin shaklida o\'rganish eng samarali usuldir.',
      tip2Title: 'Kundalik hayotda harflarni qidiring',
      tip2Text: 'Ko\'chada, do\'konda yoki kitob varaqlayotganda tanish harflarni (masalan: "Qara, bu \'M\' harfi, \'Мама\' kabi") ko\'rsating.',
      tip3Title: 'Hech qachon xato uchun koyimang',
      tip3Text: 'Xatolar — o\'rganishning tabiiy qismi. Bolani har bir kichik yutug\'i uchun maqtang va quchoqlang.',
      tip4Title: 'Harf bilan boshlanadigan buyumlarni topish',
      tip4Text: 'Uyda "A harfiga nima bor?" deb qiziqarli topishmoq o\'ynang (Apelsin, Avtobus). Bu so\'z boyligini kengaytiradi.',
    },
    settingsModal: {
      title: 'Ilova sozlamalari',
      language: 'Interfeys tili',
      theme: 'Rang mavzusi',
      light: 'Yorug\' (Kun)',
      dark: 'Qorong\'u (Tun)',
      difficulty: 'Qiyinlik darajasi',
      slowMode: '"Astalik bilan" rejimi',
      slowModeDesc: 'Animatsiyalar sekinlashadi, ovoz sekinroq va aniqroq o\'qiladi',
      voiceGuidance: 'Ovozli yo\'riqnoma',
      voiceGuidanceDesc: 'Barcha matn va tugmalar ovoz chiqarib o\'qiladi',
      largeFont: 'Katta shrift rejimi',
      highContrast: 'Yuqori kontrast',
      soundEffects: 'Ovoz effektlari',
      bgMusic: 'Yumshoq fon musiqasi',
    },
  },
  ru: {
    appName: 'Русский алфавит',
    appSubtitle: 'Интерактивное обучение для детей 5-6 лет',
    stages: {
      intro: 'Приветствие',
      attendance: 'Перекличка',
      review: 'Повторение',
      newTopic: 'Новая буква',
      practice: 'Практика',
      games: 'Игры',
      quiz: 'Викторина',
      evaluation: 'Итоги',
    },
    stagesDesc: {
      intro: 'Начало урока и знакомство с маскотом',
      attendance: 'Отметка присутствующих и весёлый счёт',
      review: 'Закрепление пройденных букв',
      newTopic: 'Изучение новой буквы, звука и слов',
      practice: 'Пропись буквы пальчиком и сборка слов',
      games: '5 развивающих игр с буквами',
      quiz: 'Проверочный тест и звёзды',
      evaluation: 'Успехи детей и вручение диплома',
    },
    mascot: {
      name: 'Алифбек',
      role: 'Твой весёлый друг и помощник',
      greeting: 'Привет, юный знаток! Давай вместе учить русский алфавит!',
      introSpeech: 'Здравствуйте, ребята! Сегодня нас ждёт увлекательное путешествие в мир букв!',
      correct: ['Молодец!', 'Отлично!', 'Так держать!', 'Умничка!', 'Супер результат!'],
      tryAgain: ['Попробуй ещё раз!', 'Ничего страшного, давай снова!', 'У тебя обязательно получится!'],
      hintHelp: 'Послушай звук внимательно и обрати внимание на цвет буквы!',
    },
    common: {
      next: 'Далее',
      prev: 'Назад',
      start: 'Начать',
      continue: 'Продолжить',
      help: 'Помощь',
      listen: 'Слушать',
      slowListen: 'Медленно',
      clear: 'Очистить',
      check: 'Проверить',
      restart: 'Заново',
      congrats: 'Поздравляем!',
      stars: 'Звёзды',
      score: 'Баллы',
      level: 'Уровень',
      easy: 'Легко',
      medium: 'Средне',
      hard: 'Сложно',
      vowel: 'Гласный звук',
      consonant: 'Согласный звук',
      sign: 'Знак',
      printed: 'Печатная',
      cursive: 'Письменная',
      uppercase: 'Заглавная',
      lowercase: 'Строчная',
      sound: 'Звук',
      words: 'Слова',
      print: 'Печать',
      downloadPdf: 'Скачать PDF',
      settings: 'Настройки',
      alphabetMap: 'Карта букв',
      parentsGuide: 'Родителям',
      teacherPanel: 'Воспитатель',
      close: 'Закрыть',
    },
    attendance: {
      title: 'Журнал переклички',
      subtitle: 'Кто сегодня пришёл на наш урок?',
      present: 'Здесь',
      absent: 'Нет',
      markAllPresent: 'Все на месте',
      addStudent: 'Добавить ребёнка',
      enterName: 'Введите имя ребёнка...',
      countingTitle: 'Сколько нас сегодня?',
      countingDesc: 'Давайте вместе посчитаем присутствующих детей!',
      kidsPresentCount: 'Количество детей в группе',
      startLesson: 'Начать занятие!',
    },
    review: {
      title: 'Повторение пройденного',
      subtitle: 'Вспомним буквы, которые мы уже выучили!',
      clickToHear: 'Нажмите на карточку, чтобы услышать звук',
      matchPrompt: 'Выберите картинку к прозвучавшей букве:',
      completedCount: 'Повторено букв',
      nextCard: 'Следующая буква',
    },
    newTopic: {
      title: 'Изучаем новую букву',
      selectLetter: 'Выберите букву для изучения:',
      penDirection: 'Движение карандаша',
      strokeOrder: 'Как пишется буква?',
      watchPen: 'Внимательно смотрите, как рисуется линия:',
      soundExpl: 'Звучание и особенности',
      sampleWords: 'Слова на эту букву:',
      funFactTitle: 'Интересный факт',
    },
    practice: {
      title: 'Практические упражнения',
      tracingTab: 'Обведи букву (Трейсинг)',
      wordBuildTab: 'Собери слово',
      tracePrompt: 'Веди пальчиком или мышкой точно по контуру буквы!',
      traceCursivePrompt: 'А теперь красиво обведи прописную букву!',
      penSize: 'Толщина линии',
      guideLines: 'Линии-помощники',
      wellDoneTrace: 'Прекрасно получилось! Ты заработал звёздочку!',
      wordBuildPrompt: 'Расставь буквы в правильном порядке, чтобы получилось слово:',
      dragOrClick: 'Нажимай на буквы или перетаскивай в клеточки',
      successWord: 'Слово собрано правильно!',
    },
    games: {
      title: 'Игровая площадка',
      selectGame: 'Выбери игру:',
      game1Title: 'Найди букву',
      game1Desc: 'Слушай звук и нажимай правильную букву',
      game2Title: 'Найди пару',
      game2Desc: 'Соедини печатную и прописную буквы',
      game3Title: 'Буквенный дождь',
      game3Desc: 'Лови нужную букву из падающих с неба',
      game4Title: 'Конструктор слов',
      game4Desc: 'Собери название предмета по картинке',
      game5Title: 'Поезд алфавита',
      game5Desc: 'Расставь вагоны с буквами по порядку',
      findTheLetter: 'Найди вот эту букву:',
      tapWhenHear: 'Слушай звук и нажимай нужную карточку',
      pairsFound: 'Собрано пар',
      rainCatchTarget: 'Поймай букву:',
      rainScore: 'Набранные очки',
      trainInstruction: 'Расставь вагончики по алфавиту:',
      trainSuccess: 'Поезд собран и готов отправляться в путь!',
      gameOver: 'Игра окончена!',
      playAgain: 'Сыграть снова',
    },
    quiz: {
      title: 'Викторина маленьких эрудитов',
      question: 'Вопрос',
      questionOf: 'из',
      resultTitle: 'Результаты викторины',
      resultDesc: 'Ты отлично справился со всеми заданиями!',
      perfectScore: 'Великолепно! Все ответы правильные!',
      goodScore: 'Хороший результат! Ты настоящий молодец!',
      keepPracticing: 'Ещё немного практики — и будет идеально!',
      getCertificate: 'Получить диплом',
    },
    evaluation: {
      title: 'Итоги занятия и оценка',
      subtitle: 'Статистика группы и успехи каждого воспитанника',
      overview: 'Общие показатели',
      totalStars: 'Всего звёздочек',
      attendanceRate: 'Посещаемость',
      averageScore: 'Средний балл теста',
      studentsList: 'Список детей и достижения',
      generateCertificate: 'Распечатать диплом ребёнку',
      certificateTitle: 'ДИПЛОМ ЗНАТОКА РУССКОГО АЛФАВИТА',
      certificateAwardedTo: 'Настоящий диплом вручается:',
      certificateReason: 'За отличное знание букв русского алфавита, старание и активное участие в занятиях',
      certificateDate: 'Дата',
      certificateTeacherSig: 'Подпись воспитателя',
      printWorksheet: 'Распечатать пропись',
      worksheetDesc: 'Лист с заданиями и контурами для домашней работы',
    },
    parents: {
      title: 'Советы родителям',
      subtitle: 'Как легко и с удовольствием закреплять буквы дома?',
      tip1Title: 'Достаточно 10–15 минут в день',
      tip1Text: 'В возрасте 5-6 лет концентрация внимания невелика. Лучше заниматься недолго, но каждый день и только в хорошем настроении.',
      tip2Title: 'Ищите буквы вокруг',
      tip2Text: 'На прогулке, в магазине или на вывесках обращайте внимание: «Смотри, это буква М, как слово Мама!».',
      tip3Title: 'Никакой критики за ошибки',
      tip3Text: 'Ошибаться полезно! Хвалите за попытку и поддерживайте добрыми словами: «Ты стараешься, и скоро всё получится!».',
      tip4Title: 'Игра «Назови слово»',
      tip4Text: 'Придумывайте слова на заданную букву по очереди. Это развивает фонематический слух и расширяет кругозор.',
    },
    settingsModal: {
      title: 'Настройки приложения',
      language: 'Язык интерфейса',
      theme: 'Тема оформления',
      light: 'Светлая (День)',
      dark: 'Тёмная (Ночь)',
      difficulty: 'Уровень сложности',
      slowMode: 'Режим «Не спеша»',
      slowModeDesc: 'Плавные анимации, медленная и чёткая озвучка',
      voiceGuidance: 'Голосовые подсказки',
      voiceGuidanceDesc: 'Озвучивание всех кнопок и инструкций для малышей',
      largeFont: 'Крупный шрифт',
      highContrast: 'Высокая контрастность',
      soundEffects: 'Звуковые эффекты',
      bgMusic: 'Мягкая фоновая музыка',
    },
  },
};
