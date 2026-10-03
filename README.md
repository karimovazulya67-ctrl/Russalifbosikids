# Rus tili alifbosi (Русский алфавит) 🐻✨

5-6 yoshli bog'cha tarbiyalanuvchilari uchun interaktiv, professional darajadagi ta'limiy veb-ilova. Ushbu platforma tarbiyachilar guruh xonasida interaktiv doska, kompyuter yoki planshet orqali dars o'tishi uchun, shuningdek ota-onalar uyda bola bilan mashq qilishi uchun mo'ljallangan.

---

## 🌟 Asosiy imkoniyatlar

1. **8 Bosqichli To'liq Dars Tizimi**:
   - **Kirish (Приветствие)**: Quvnoq "Alifbek" maskoti bilan salomlashish, bugungi harf taqdimoti, fon musiqasi.
   - **Davomat (Перекличка)**: Guruhdagi bolalar ro'yxati, "Nechta bola bor?" interaktiv sanash o'yini.
   - **Takrorlash (Повторение)**: O'tgan mavzulardagi harflarni flashcard orqali eslash, tovush va rasm moslashtirish.
   - **Yangi harf (Новая буква)**: Katta va kichik bosma hamda yozma (kursiv) shakllar, harakatli qalam animatsiyasi (stroke order), 4 ta namunaviy so'z va qiziqarli faktlar.
   - **Mashq qilish (Практика)**: Interaktiv harf yozish (tracing) doskasi, qalam rangi va qalinligi sozlamasi, "So'z tuzish" konstruktori.
   - **5 xil O'yinlar (Игры)**:
     1. *Harfni top* (Найди букву) — ovozga qarab to'g'ri harfni bosish
     2. *Juftini top* (Найди пару) — bosma va yozma harflar juftligi xotira o'yini
     3. *Harf yomg'iri* (Буквенный дождь) — osmondan tushayotgan harflarni ushlash
     4. *So'z konstruktori* (Конструктор слов) — rasmga qarab so'z yig'ish
     5. *Alifbo poezdi* (Поезд алфавита) — harflarni alifbo tartibida vagonlarga joylash
   - **Viktorina (Тест-викторина)**: 5 ta interaktiv savol, darhol fikr-mulohaza, yulduzchalar va natijalar foizi.
   - **Baholash va Sertifikat (Итоги и Сертификат)**: Tarbiyachi statistikasi, CSV eksport, chop etishga tayyor rasmiy bolalar diplomi va yozuv daftari (worksheet).

2. **Ko'p tilli (i18n)**:
   - 🇺🇿 O'zbek tili
   - 🇷🇺 Русский язык
   - 1 ta tugma orqali butun interfeys tarjimasi (rus alifbosi kontenti saqlanadi).

3. **Inklyuzivlik va Qulaylik (Accessibility)**:
   - "Astalik bilan" (Slow mode) sekinlashtirilgan rejim
   - Ovozli yo'riqnoma rejimi (matnni o'qiy olmaydigan bolalar uchun)
   - Katta barmoqqa mos sensorli tugmalar (48–60px)
   - Unlilar (qizil), Undoshlar (ko'k) va Belgilar (binafsha) rang kodlash
   - Katta shrift va yuqori kontrast rejimlari.

4. **100% Offline va Xavfsiz**:
   - Hech qanday pulli API kaliti talab qilmaydi.
   - Web Audio API + Browser SpeechSynthesis orqali ishlaydi.

---

## 🚀 O'rnatish va Ishga tushirish

Loyihani o'zingizning kompyuteringizda ishga tushirish uchun:

```bash
# 1. Bog'liqliklarni o'rnating
npm install

# 2. Dasturni rivojlantirish (dev) rejimida yoqing
npm run dev

# 3. Brauzerda http://localhost:3000 manzilini oching
```

### Loyihani yig'ish (Build):
```bash
npm run build
```

---

## ☁️ Vercel'ga deploy qilish

Loyiha toza static SPA bo'lgani sababli Vercel'da hech qanday qo'shimcha sozlamasiz ishlaydi:
1. Loyihani GitHub repozitoriyasiga yuklang (push).
2. [Vercel](https://vercel.com) saytiga kiring va ushbu repozitoriyani tanlang.
3. Build Command: `npm run build`, Output Directory: `dist`.
4. **Deploy** tugmasini bosing!
