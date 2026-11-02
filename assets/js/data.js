/* =====================================================================
   سلّم — بيانات المنهج
   المصدر المنهجي: إطار CEFR (مجلس أوروبا) + أوصاف "can do" المختصرة.
   ملاحظة: الساعات وحجم المفردات تقديرات إرشادية شائعة، لا يفرضها CEFR.
   ===================================================================== */
(function () {
  "use strict";

  var w = function (en, ar, ipa, pos, ex, exAr) {
    return { en: en, ar: ar, ipa: ipa, pos: pos, ex: ex, exAr: exAr };
  };
  var c = function (q, o, a, why) {
    return { type: "choice", q: q, o: o, a: a, why: why };
  };
  var f = function (q, a, why) {
    return { type: "fill", q: q, a: a, why: why };
  };
  var ord = function (target, ar) {
    return { type: "order", target: target, ar: ar };
  };
  var tr = function (q, a, why) {
    return { type: "translate", q: q, a: a, why: why };
  };
  var listen = function (word, o, why) {
    return { type: "listen", word: word, o: o, why: why };
  };

  var levels = [
    {
      code: "A1",
      label: "المبتدئ",
      en: "Breakthrough",
      ielts: "أقل من 3.0 · تقريبي",
      hours: "≈ 90 – 100 ساعة موجّهة",
      words: "500 – 800 كلمة",
      exam: "A1 Movers · Linguaskill 100–119",
      blurb: "تفهم وتستخدم تعبيرات يومية بسيطة جداً، وتعرّف نفسك وتطرح أسئلة بسيطة عن شخص تعرفه.",
      canDo: [
        "الاستماع: تفهم كلمات وعبارات مألوفة جداً عن نفسك وعائلتك والمحيط القريب.",
        "القراءة: تقرأ لافتات وقوائم ورسائل قصيرة جداً وتلتقط الأسماء والأرقام.",
        "التحدث التفاعلي: تشارك في حوار بسيط إذا كان محدّثك مستعداً للتكرار وبطء الكلام.",
        "التحدث الإنتاجي: تصف مكان سكنك والأشخاص الذين تعرفهم بجُمل معدودة.",
        "الكتابة: تكتب بطاقة بريدية قصيرة أو تملأ نموذجاً ببياناتك."
      ],
      strategy: "لا تبدأ بالقواعد. ابنِ 300 كلمة عالية التكرار أولاً، واسمع 10 دقائق يومياً بسرعة بطيئة مع نص مكتوب.",
      pitfalls: [
        "حذف فعل الكينونة: «He teacher» بدل «He is a teacher» لأن الجملة الاسمية العربية بلا فعل.",
        "لفظ /p/ كـ/b/ و/v/ كـ/f/ — يحتاج تدريباً سمعياً مقصوداً.",
        "استخدام «make» مكان «do» في التعبيرات الثابتة."
      ]
    },
    {
      code: "A2",
      label: "الأساسي",
      en: "Waystage",
      ielts: "3.0 – 4.0 · تقريبي",
      hours: "≈ 180 – 200 ساعة تراكمية",
      words: "1,000 – 1,500 كلمة",
      exam: "A2 Key (KET) · Linguaskill 120–139",
      blurb: "تتعامل مع مهام روتينية وتصف خلفيتك وبيئتك المباشرة واحتياجاتك اليومية بجُمل مترابطة.",
      canDo: [
        "الاستماع: تفهم العبارات والمفردات الأكثر تداولاً في مجالات ذات صلة مباشرة بك.",
        "القراءة: تفهم نصوصاً قصيرة بسيطة، وإعلانات وجدول مواعيد ورسائل شخصية.",
        "التحدث التفاعلي: تتواصل في مواقف بسيطة ومتكررة، وتبادل معلومات عن أمور مألوفة.",
        "التحدث الإنتاجي: تصف عائلتك وظروف معيشتك وتعليمك وعملك ببضع جُمل.",
        "الكتابة: تكتب رسائل وملاحظات قصيرة عن احتياجات فورية."
      ],
      strategy: "ابدأ الإنتاج من اليوم الأول: جملة واحدة مكتوبة ومسجّلة صوتياً كل يوم أهم من صفحة قواعد.",
      pitfalls: [
        "الخلط بين الماضي البسيط والمضارع التام لأنهما يقابلان «الماضي» في العربية.",
        "نسيان «s» مع الفاعل المفرد الغائب: «He work» بدل «He works».",
        "استخدام «very» مع أفعال: «I very like» بدل «I really like»."
      ]
    },
    {
      code: "B1",
      label: "المتوسط",
      en: "Threshold",
      ielts: "4.0 – 5.0",
      hours: "≈ 350 – 400 ساعة تراكمية",
      words: "2,000 – 2,500 كلمة",
      exam: "B1 Preliminary (PET) · Linguaskill 140–159",
      blurb: "تتعامل مع معظم المواقف اليومية، وتعبّر عن رأيك وأسبابك، وتحكي تجربة أو حدثاً.",
      canDo: [
        "الاستماع: تفهم النقاط الرئيسية في كلام واضح عن العمل والدراسة والترفيه.",
        "القراءة: تفهم نصوصاً واقعية عن مواضيع معاصرة وتحدد الحجة والموقف.",
        "التحدث التفاعلي: تتعامل مع أغلب المواقف التي تطرأ أثناء السفر، وتحاور بلا تحضير عن مواضيع مألوفة.",
        "التحدث الإنتاجي: تروي تجربة أو حدثاً، وتشرح رأياً وتدعمه بأسباب قصيرة.",
        "الكتابة: تكتب نصاً مترابطاً عن موضوع مألوف أو رسالة تعبّر فيها عن مشاعر وتجارب."
      ],
      strategy: "انتقل من «كلمات» إلى «تعبيرات»: تعلّم 5 collocations يومياً بدل 20 كلمة معزولة.",
      pitfalls: [
        "الترجمة الحرفية للتعبيرات: «I have 20 years» بدل «I am 20 years old».",
        "إسقاط حرف الجر العربي: «I discussed about it» بدل «I discussed it».",
        "الاعتماد على جُمل قصيرة متتابعة بدل الربط بـ although / however / whereas."
      ]
    },
    {
      code: "B2",
      label: "المتقدم",
      en: "Vantage",
      ielts: "5.5 – 6.5",
      hours: "≈ 500 – 600 ساعة تراكمية",
      words: "3,000 – 4,000 كلمة",
      exam: "B2 First (FCE) · Linguaskill 160–179",
      blurb: "تتفاهم بطلاقة مع الناطقين الأصليين بلا جهد ملحوظ، وتكتب نصوصاً مفصّلة واضحة وتدافع عن وجهة نظر.",
      canDo: [
        "الاستماع: تفهم خطاباً مطوّلاً ومحاضرات وتتبع الحجج المعقّدة إذا كان الموضوع مألوفاً.",
        "القراءة: تفهم مقالات وتقارير معاصرة وتفصل بين الحقيقة والرأي.",
        "التحدث التفاعلي: تتحدث بطلاقة وعفوية تجعل الحوار مع الناطق الأصلي ممكناً بلا إجهاد.",
        "التحدث الإنتاجي: تعرض موضوعاً وتشرح مزايا وعيوب خيارات مختلفة.",
        "الكتابة: تكتب مقالاً أو تقريراً واضحاً مفصّلاً تشرح فيه وجهة نظر وتوازن بين الحجج."
      ],
      strategy: "حوّل مدخلك إلى جدال: بعد كل نص اسأل «ما ادعاء الكاتب؟ وما أقوى اعتراض عليه؟» — هذه مهارة B2 الحقيقية.",
      pitfalls: [
        "الطلاقة الظاهرية تغطي دقة ضعيفة: أخطاء في أدوات التعريف وحروف الجر تبقى عند B2.",
        "الإفراط في الكلمات «الفخمة» بدل الدقة: register أهم من التعقيد.",
        "ضعف الربط المنطقي بين الفقرات (cohesion) رغم صحة الجُمل."
      ]
    },
    {
      code: "C1",
      label: "الاحترافي",
      en: "Effective Operational Proficiency",
      ielts: "7.0 – 8.0",
      hours: "≈ 700 – 800 ساعة تراكمية",
      words: "5,000 – 6,500 كلمة",
      exam: "C1 Advanced (CAE) · Linguaskill 180–199",
      blurb: "تستخدم اللغة بمرونة وفعالية لأغراض اجتماعية وأكاديمية ومهنية، وتفهم نصوصاً طويلة وصعبة.",
      canDo: [
        "الاستماع: تفهم خطاباً مطوّلاً حتى عندما لا يكون البناء واضحاً والعلاقات ضمنية.",
        "القراءة: تفهم نصوصاً أدبية وواقعية طويلة معقدة وتقدّر اختلاف الأسلوب.",
        "التحدث التفاعلي: تعبّر عن نفسك بطلاقة وتلقائية دون بحث ظاهر عن الكلمات.",
        "التحدث الإنتاجي: تعرض وصفاً واضحاً مفصّلاً لموضوع معقّد وتختم بخاتمة مناسبة.",
        "الكتابة: تكتب نصوصاً واضحة ومنظّمة جيداً ومفصّلة عن مواضيع معقّدة."
      ],
      strategy: "اشتغل على الـ register: نفس الفكرة بصياغة أكاديمية، ومهنية، وساخرة. المرونة هي C1.",
      pitfalls: [
        "التراكيب الصحيحة نحوياً لكن غير الطبيعية (non-idiomatic) — «wordy» بدل موجز.",
        "ضعف إدارة الحجج الطويلة: تكرار بدل تعميق.",
        "الفشل في التكيّف مع الجمهور: خطاب رسمي بلغة عامية أو العكس."
      ]
    },
    {
      code: "C2",
      label: "الاحتراف الكامل",
      en: "Mastery",
      ielts: "8.5 – 9.0",
      hours: "≈ 1,000 – 1,200 ساعة تراكمية",
      words: "8,000 – 10,000+ كلمة",
      exam: "C2 Proficiency (CPE) · Linguaskill 200+",
      blurb: "تفهم بسهولة كل ما تقرأه أو تسمعه تقريباً، وتلخّص المعلومات من مصادر مختلفة وتعبّر عن نفسك بدقة شديدة.",
      canDo: [
        "الاستماع: تتابع أي خطاب منطوق بسهولة، بما في ذلك البث السريع، مع تكيّف مع اللهجات.",
        "القراءة: تقرأ بسهولة تقريباً كل أشكال النص المكتوب، بما فيها النصوص المجرّدة والأدبية.",
        "التحدث التفاعلي: تشارك بسهولة في أي محادثة وتجيد التعبيرات الاصطلاحية والعامية.",
        "التحدث الإنتاجي: تقدّم وصفاً أو حجة بأسلوب مناسب للمقام وببناء منطقي يسهّل على المستمع.",
        "الكتابة: تلخّص وتعيد صياغة معلومات من مصادر مختلفة في نص متماسك بأسلوبك."
      ],
      strategy: "لا تدرس «إنجليزي» بل ادرس موضوعاً بالإنجليزية: الاقتصاد، الفلسفة، السياسة. اللغة تصبح أداة لا هدفاً.",
      pitfalls: [
        "الثقة الزائدة: أخطاء دقيقة في التلازم اللفظي (collocation) لا يلتقطها إلا قارئ متمرّس.",
        "الإطناب: C2 الحقيقي هو الاقتصاد في اللفظ مع الدقة القصوى.",
        "الفشل في التكيّف الثقافي: التلميحات والإشارات الثقافية قد تفوتك رغم إتقان اللغة."
      ]
    }
  ];

  var units = [
    /* ============================ A1 ============================ */
    {
      id: "A1-1",
      level: "A1",
      title: "التعارف",
      aim: "تعرّف بنفسك وتسأل غيرك أسئلة بسيطة.",
      words: [
        w("hello", "مرحباً", "/həˈləʊ/", "تحية", "Hello, my name is Sara.", "مرحباً، اسمي سارة."),
        w("name", "اسم", "/neɪm/", "اسم", "What is your name?", "ما اسمك؟"),
        w("friend", "صديق", "/frend/", "اسم", "He is my friend.", "هو صديقي."),
        w("country", "بلد", "/ˈkʌntri/", "اسم", "Egypt is a big country.", "مصر بلد كبير."),
        w("city", "مدينة", "/ˈsɪti/", "اسم", "I live in a small city.", "أعيش في مدينة صغيرة."),
        w("student", "طالب", "/ˈstjuːdənt/", "اسم", "She is a student.", "هي طالبة."),
        w("teacher", "معلم", "/ˈtiːtʃə/", "اسم", "My father is a teacher.", "أبي معلم."),
        w("welcome", "أهلاً وسهلاً", "/ˈwelkəm/", "تحية", "Welcome to our school.", "أهلاً بك في مدرستنا.")
      ],
      grammar: {
        title: "فعل الكينونة: am / is / are",
        idea: "العربية تسمح بجملة اسمية بلا فعل («هو معلم»)، الإنجليزية لا. لا بد من فعل ربط.",
        rules: [
          { f: "I + am", ex: "I am a student. / I'm a student." },
          { f: "he / she / it + is", ex: "He is my friend." },
          { f: "you / we / they + are", ex: "They are teachers." },
          { f: "النفي: أضف not بعد الفعل", ex: "She is not (isn't) a doctor." }
        ],
        examples: [
          { en: "I am from Egypt.", ar: "أنا من مصر." },
          { en: "Is he your teacher?", ar: "هل هو معلمك؟" },
          { en: "We are not students.", ar: "نحن لسنا طلاباً." }
        ],
        note: "لا تقل «He teacher» — أضف is دائماً."
      },
      exercises: [
        c("اختر الصحيح: ___ a student.", ["I am", "I is", "I are", "I be"], 0, "مع I نستخدم am دائماً."),
        f("She ___ my sister.", ["is"], "she مفرد غائب ← is."),
        ord("I am from Egypt", "أنا من مصر."),
        tr("هو صديقي.", ["He is my friend", "He's my friend"], "is ضرورية في الإنجليزية."),
        c("أي جملة صحيحة؟", ["They are teachers.", "They is teachers.", "They am teachers.", "They be teachers."], 0, "they ← are.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب 3 جُمل تعرّف فيها بنفسك: اسمك، بلدك، وعملك أو دراستك.",
        min: 12,
        checklist: ["استخدمت am مع I", "بدأت كل جملة بحرف كبير", "وضعت نقطة في النهاية"]
      }
    },
    {
      id: "A1-2",
      level: "A1",
      title: "البيت والعائلة",
      aim: "تصف بيتك وأفراد عائلتك.",
      words: [
        w("house", "منزل", "/haʊs/", "اسم", "Our house is small.", "منزلنا صغير."),
        w("room", "غرفة", "/ruːm/", "اسم", "This room is clean.", "هذه الغرفة نظيفة."),
        w("kitchen", "مطبخ", "/ˈkɪtʃɪn/", "اسم", "My mother is in the kitchen.", "أمي في المطبخ."),
        w("mother", "أم", "/ˈmʌðə/", "اسم", "My mother is kind.", "أمي طيبة."),
        w("father", "أب", "/ˈfɑːðə/", "اسم", "His father works here.", "أبوه يعمل هنا."),
        w("brother", "أخ", "/ˈbrʌðə/", "اسم", "I have one brother.", "لدي أخ واحد."),
        w("sister", "أخت", "/ˈsɪstə/", "اسم", "Her sister is a nurse.", "أختها ممرضة."),
        w("family", "عائلة", "/ˈfæməli/", "اسم", "My family is big.", "عائلتي كبيرة.")
      ],
      grammar: {
        title: "الملكية: my / your / his / her + have",
        idea: "ضمائر الملكية تتبع المالك لا الشيء المملوك.",
        rules: [
          { f: "my = ياء الملكية", ex: "my book = كتابي" },
          { f: "his = له (للمذكر)", ex: "his car = سيارته" },
          { f: "her = لها (للمؤنث)", ex: "her name = اسمها" },
          { f: "have / has + اسم", ex: "I have a brother. / She has a sister." }
        ],
        examples: [
          { en: "This is my house.", ar: "هذا منزلي." },
          { en: "His brother is a doctor.", ar: "أخوه طبيب." },
          { en: "They have two rooms.", ar: "لديهم غرفتان." }
        ],
        note: "لا تخلط his و her: his للمالك المذكر، her للمالك المؤنث."
      },
      exercises: [
        c("Sara is my sister. ___ name is Sara.", ["Her", "His", "My", "Their"], 0, "سارة مؤنثة ← Her."),
        f("I ___ two brothers.", ["have"], "I ← have."),
        c("He ___ a big house.", ["has", "have", "is", "are"], 0, "he ← has."),
        ord("My family is very big", "عائلتي كبيرة جداً."),
        tr("هذا منزلي.", ["This is my house", "This is my home"], "This is + my + house.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب 3 جُمل عن عائلتك: عدد أفرادها، وبيتكم.",
        min: 12,
        checklist: ["استخدمت have/has", "استخدمت my/his/her", "كتبت أرقاماً صحيحة"]
      }
    },
    {
      id: "A1-3",
      level: "A1",
      title: "الطعام والشراب",
      aim: "تطلب طعاماً وتتحدث عن ما تحب.",
      words: [
        w("water", "ماء", "/ˈwɔːtə/", "اسم", "I drink water every day.", "أشرب الماء كل يوم."),
        w("bread", "خبز", "/bred/", "اسم", "We eat bread for breakfast.", "نأكل الخبز في الفطور."),
        w("milk", "حليب", "/mɪlk/", "اسم", "She likes milk.", "هي تحب الحليب."),
        w("rice", "أرز", "/raɪs/", "اسم", "I cook rice on Friday.", "أطبخ الأرز يوم الجمعة."),
        w("apple", "تفاحة", "/ˈæpl/", "اسم", "This apple is sweet.", "هذه التفاحة حلوة."),
        w("chicken", "دجاج", "/ˈtʃɪkɪn/", "اسم", "He eats chicken.", "هو يأكل الدجاج."),
        w("tea", "شاي", "/tiː/", "اسم", "Do you want tea?", "هل تريد شاياً؟"),
        w("breakfast", "فطور", "/ˈbrekfəst/", "اسم", "Breakfast is at seven.", "الفطور في السابعة.")
      ],
      grammar: {
        title: "المضارع البسيط: I eat / he eats",
        idea: "للعادة والحقيقة العامة. مع he/she/it نضيف s للفعل.",
        rules: [
          { f: "I / you / we / they + فعل", ex: "They drink tea." },
          { f: "he / she / it + فعل + s", ex: "She drinks tea." },
          { f: "النفي: don't / doesn't + المصدر", ex: "He doesn't eat meat." },
          { f: "السؤال: Do / Does + فاعل + مصدر", ex: "Does she like rice?" }
        ],
        examples: [
          { en: "I like apples.", ar: "أحب التفاح." },
          { en: "He doesn't drink milk.", ar: "هو لا يشرب الحليب." },
          { en: "Do you want water?", ar: "هل تريد ماءً؟" }
        ],
        note: "خطأ شائع: «He don't like» — الصحيح «He doesn't like»."
      },
      exercises: [
        c("She ___ tea every morning.", ["drinks", "drink", "drinking", "is drink"], 0, "she ← drinks."),
        f("He ___ not like milk.", ["does"], "النفي مع he ← doesn't."),
        c("___ you want water?", ["Do", "Does", "Are", "Is"], 0, "you ← Do."),
        ord("I like apples and tea", "أحب التفاح والشاي."),
        tr("هي لا تأكل الدجاج.", ["She does not eat chicken", "She doesn't eat chicken"], "doesn't + المصدر.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب 3 جُمل: ماذا تأكل في الفطور، وماذا تحب من الطعام.",
        min: 12,
        checklist: ["استخدمت المضارع البسيط", "أضفت s مع he/she", "استخدمت and للربط"]
      }
    },

    /* ============================ A2 ============================ */
    {
      id: "A2-1",
      level: "A2",
      title: "التسوق والملابس",
      aim: "تشتري، تسأل عن السعر، وتقارن بين خيارين.",
      words: [
        w("shirt", "قميص", "/ʃɜːt/", "اسم", "This shirt is blue.", "هذا القميص أزرق."),
        w("trousers", "بنطال", "/ˈtraʊzəz/", "اسم", "The trousers are too long.", "البنطال طويل جداً."),
        w("shoes", "حذاء", "/ʃuːz/", "اسم", "These shoes are comfortable.", "هذا الحذاء مريح."),
        w("price", "سعر", "/praɪs/", "اسم", "What is the price?", "ما السعر؟"),
        w("cheap", "رخيص", "/tʃiːp/", "صفة", "This one is cheaper.", "هذا أرخص."),
        w("expensive", "غالٍ", "/ɪkˈspensɪv/", "صفة", "That bag is very expensive.", "تلك الحقيبة غالية جداً."),
        w("size", "مقاس", "/saɪz/", "اسم", "Do you have a bigger size?", "هل لديك مقاس أكبر؟"),
        w("receipt", "إيصال", "/rɪˈsiːt/", "اسم", "Keep the receipt, please.", "احتفظ بالإيصال، من فضلك.")
      ],
      grammar: {
        title: "المقارنة: cheaper / more expensive",
        idea: "للصفات القصيرة نضيف er + than، وللطويلة نستخدم more.",
        rules: [
          { f: "قصيرة: cheap → cheaper than", ex: "This shirt is cheaper than that one." },
          { f: "طويلة: expensive → more expensive than", ex: "This bag is more expensive than that one." },
          { f: "التفضيل: the cheapest / the most expensive", ex: "It is the cheapest in the shop." },
          { f: "شواذ: good → better → the best", ex: "This quality is better." }
        ],
        examples: [
          { en: "These shoes are more comfortable than those.", ar: "هذا الحذاء أكثر راحة من ذاك." },
          { en: "Can I try a smaller size?", ar: "هل يمكنني تجربة مقاس أصغر؟" },
          { en: "It is the best price here.", ar: "إنه أفضل سعر هنا." }
        ],
        note: "لا تقل «more cheaper» — اختر واحدة فقط: cheaper أو more cheap."
      },
      exercises: [
        c("This shirt is ___ than that one.", ["cheaper", "more cheap", "cheapest", "cheap"], 0, "صفة قصيرة ← cheaper."),
        f("This bag is ___ expensive than mine.", ["more"], "صفة طويلة ← more expensive."),
        c("What is the ___ size you have?", ["biggest", "bigger", "big", "more big"], 0, "التفضيل ← the biggest."),
        ord("Can I try a smaller size", "هل يمكنني تجربة مقاس أصغر؟"),
        tr("هذا القميص أرخص من ذاك.", ["This shirt is cheaper than that one", "This shirt is cheaper than that"], "cheaper + than.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب 3 جُمل تقارن فيها بين منتجين اشتريتهما (السعر، الجودة، الراحة).",
        min: 20,
        checklist: ["استخدمت than", "استخدمت صفة قصيرة وصفة طويلة", "لم أستخدم more مع er"]
      }
    },
    {
      id: "A2-2",
      level: "A2",
      title: "السفر والمواصلات",
      aim: "تحكي رحلة ماضية وتحجز تذكرة.",
      words: [
        w("ticket", "تذكرة", "/ˈtɪkɪt/", "اسم", "I bought two tickets.", "اشتريت تذكرتين."),
        w("station", "محطة", "/ˈsteɪʃn/", "اسم", "The station is near here.", "المحطة قريبة من هنا."),
        w("airport", "مطار", "/ˈeəpɔːt/", "اسم", "We arrived at the airport early.", "وصلنا المطار مبكراً."),
        w("luggage", "أمتعة", "/ˈlʌɡɪdʒ/", "اسم", "My luggage was heavy.", "كانت أمتعتي ثقيلة."),
        w("journey", "رحلة", "/ˈdʒɜːni/", "اسم", "The journey took five hours.", "استغرقت الرحلة خمس ساعات."),
        w("arrive", "يصل", "/əˈraɪv/", "فعل", "We arrived late.", "وصلنا متأخرين."),
        w("depart", "يغادر", "/dɪˈpɑːt/", "فعل", "The train departs at six.", "القطار يغادر في السادسة."),
        w("book", "يحجز", "/bʊk/", "فعل", "I booked a hotel online.", "حجزت فندقاً عبر الإنترنت.")
      ],
      grammar: {
        title: "الماضي البسيط: worked / went",
        idea: "للأحداث المنتهية. الأفعال المنتظمة تأخذ ed، وغير المنتظمة تُحفظ.",
        rules: [
          { f: "منتظم: work → worked", ex: "I worked all day." },
          { f: "شاذ: go → went / buy → bought / take → took", ex: "We went to Cairo." },
          { f: "النفي والسؤال: did + المصدر", ex: "I didn't go. / Did you go?" },
          { f: "كان/كانت: was / were", ex: "I was tired. They were late." }
        ],
        examples: [
          { en: "I bought the ticket yesterday.", ar: "اشتريت التذكرة أمس." },
          { en: "Did you arrive on time?", ar: "هل وصلت في الوقت المحدد؟" },
          { en: "The journey wasn't long.", ar: "لم تكن الرحلة طويلة." }
        ],
        note: "بعد did استخدم المصدر: «Did you went؟» خطأ، الصحيح «Did you go؟»."
      },
      exercises: [
        c("I ___ to Alexandria last week.", ["went", "go", "goed", "gone"], 0, "go ← went."),
        f("Did you ___ the tickets?", ["buy"], "بعد did ← المصدر."),
        c("We ___ at the hotel at noon.", ["arrived", "arrive", "arrives", "arriving"], 0, "حدث منتهٍ ← arrived."),
        ord("The journey took five hours", "استغرقت الرحلة خمس ساعات."),
        tr("لم أذهب إلى المطار أمس.", ["I did not go to the airport yesterday", "I didn't go to the airport yesterday"], "didn't + go.")
      ],
      produce: {
        type: "write",
        prompt: "احكِ رحلة قصيرة: إلى أين ذهبت، وكيف سافرت، وماذا حدث.",
        min: 25,
        checklist: ["استخدمت الماضي البسيط", "استخدمت did في النفي أو السؤال", "رتّبت الأحداث زمنياً (first, then, after that)"]
      }
    },
    {
      id: "A2-3",
      level: "A2",
      title: "العمل والدراسة",
      aim: "تتحدث عن عملك ودراستك ومهامك الحالية.",
      words: [
        w("job", "وظيفة", "/dʒɒb/", "اسم", "I have a new job.", "لدي وظيفة جديدة."),
        w("interview", "مقابلة", "/ˈɪntəvjuː/", "اسم", "My interview is on Sunday.", "مقابلتي يوم الأحد."),
        w("salary", "راتب", "/ˈsæləri/", "اسم", "The salary is good.", "الراتب جيد."),
        w("meeting", "اجتماع", "/ˈmiːtɪŋ/", "اسم", "We have a meeting now.", "لدينا اجتماع الآن."),
        w("deadline", "موعد نهائي", "/ˈdedlaɪn/", "اسم", "The deadline is tomorrow.", "الموعد النهائي غداً."),
        w("colleague", "زميل عمل", "/ˈkɒliːɡ/", "اسم", "My colleague is helpful.", "زميلي متعاون."),
        w("apply", "يتقدّم بطلب", "/əˈplaɪ/", "فعل", "I applied for a job.", "تقدّمت لوظيفة."),
        w("experience", "خبرة", "/ɪkˈspɪəriəns/", "اسم", "She has five years of experience.", "لديها خمس سنوات خبرة.")
      ],
      grammar: {
        title: "المضارع المستمر مقابل البسيط",
        idea: "البسيط للعادة، والمستمر لما يحدث الآن أو هذه الفترة.",
        rules: [
          { f: "بسيط: كل يوم / عادة", ex: "I work from home every day." },
          { f: "مستمر: am/is/are + فعل + ing", ex: "I am working on a report now." },
          { f: "أفعال الحالة لا تُستخدم في المستمر", ex: "I know (not I am knowing)" },
          { f: "للمستقبل القريب المتفق عليه", ex: "I am meeting the client tomorrow." }
        ],
        examples: [
          { en: "She usually starts at nine.", ar: "عادة تبدأ في التاسعة." },
          { en: "We are preparing the presentation this week.", ar: "نحضّر العرض هذا الأسبوع." },
          { en: "Are you applying for the new job?", ar: "هل تتقدم للوظيفة الجديدة؟" }
        ],
        note: "«I am wanting» خطأ — want فعل حالة، استخدم I want."
      },
      exercises: [
        c("I ___ a report right now.", ["am writing", "write", "writes", "wrote"], 0, "الآن ← مضارع مستمر."),
        f("She usually ___ at nine.", ["starts"], "عادة ← مضارع بسيط + s."),
        c("Which is correct?", ["I want a break.", "I am wanting a break.", "I wanting a break.", "I wants a break."], 0, "want فعل حالة."),
        ord("I am working on a new project", "أعمل على مشروع جديد."),
        tr("تقدّمت لوظيفة في شركة كبيرة.", ["I applied for a job at a big company", "I applied for a job in a big company"], "apply for + job.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب 4 جُمل: وظيفتك أو دراستك، مهامك اليومية، وما تعمل عليه الآن.",
        min: 25,
        checklist: ["فرّقت بين البسيط والمستمر", "استخدمت apply for", "استخدمت usually / now"]
      }
    },

    /* ============================ B1 ============================ */
    {
      id: "B1-1",
      level: "B1",
      title: "الصحة والعافية",
      aim: "تصف أعراضاً وتحكي تجربة صحية.",
      words: [
        w("symptom", "عَرَض مرضي", "/ˈsɪmptəm/", "اسم", "A cough is a common symptom.", "الكحة عَرَض شائع."),
        w("treatment", "علاج", "/ˈtriːtmənt/", "اسم", "The treatment lasted two weeks.", "استمر العلاج أسبوعين."),
        w("exercise", "تمرين/ممارسة رياضة", "/ˈeksəsaɪz/", "اسم", "Regular exercise reduces stress.", "التمرين المنتظم يقلل التوتر."),
        w("diet", "نظام غذائي", "/ˈdaɪət/", "اسم", "A balanced diet is important.", "النظام الغذائي المتوازن مهم."),
        w("sleep", "نوم", "/sliːp/", "اسم", "Lack of sleep affects memory.", "قلة النوم تؤثر على الذاكرة."),
        w("stress", "توتر", "/stres/", "اسم", "He suffers from stress.", "هو يعاني من التوتر."),
        w("recover", "يتعافى", "/rɪˈkʌvə/", "فعل", "She recovered quickly.", "تعافت بسرعة."),
        w("appointment", "موعد", "/əˈpɔɪntmənt/", "اسم", "I have an appointment at four.", "لدي موعد في الرابعة.")
      ],
      grammar: {
        title: "المضارع التام: have/has + التصريف الثالث",
        idea: "يربط الماضي بالحاضر: تجربة في حياتك، أو شيء بدأ ولم ينته.",
        rules: [
          { f: "تجربة (بدون زمن محدد)", ex: "I have visited London." },
          { f: "for + مدة / since + نقطة بداية", ex: "I have lived here for three years." },
          { f: "ever / never / already / yet", ex: "Have you ever tried it?" },
          { f: "لا تستخدمه مع زمن منتهٍ", ex: "I saw him yesterday (لا I have seen him yesterday)" }
        ],
        examples: [
          { en: "I have had this pain for two days.", ar: "أعاني من هذا الألم منذ يومين." },
          { en: "She has never broken a bone.", ar: "لم تكسر عظماً قط." },
          { en: "Have you taken your medicine yet?", ar: "هل تناولت دواءك بعد؟" }
        ],
        note: "الفرق الجوهري: «I have lost my keys» (الآن لا أجدها) مقابل «I lost my keys yesterday» (حدث منتهٍ)."
      },
      exercises: [
        c("I ___ this pain for two days.", ["have had", "had", "have", "am having"], 0, "for + مدة ← مضارع تام."),
        f("She has ___ smoked.", ["never"], "تجربة في الحياة ← never."),
        c("Which sentence is correct?", ["I saw the doctor yesterday.", "I have seen the doctor yesterday.", "I have saw the doctor yesterday.", "I seen the doctor yesterday."], 0, "yesterday زمن منتهٍ ← ماضي بسيط."),
        ord("I have lived here since 2020", "أعيش هنا منذ 2020."),
        tr("هل سبق أن كسرت ذراعك؟", ["Have you ever broken your arm", "Have you ever broken an arm"], "ever + المضارع التام.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب فقرة قصيرة (40–60 كلمة) عن عادة صحية تغيّرت في حياتك: ماذا كانت، وماذا صارت، ومتى بدأت.",
        min: 40,
        checklist: ["استخدمت for/since", "استخدمت المضارع التام مرة على الأقل", "وضعت سبباً واحداً على الأقل"]
      }
    },
    {
      id: "B1-2",
      level: "B1",
      title: "التكنولوجيا والإنترنت",
      aim: "تشرح كيف تُستخدم الأشياء وتحمي حسابك.",
      words: [
        w("device", "جهاز", "/dɪˈvaɪs/", "اسم", "This device supports Wi-Fi.", "هذا الجهاز يدعم الواي فاي."),
        w("software", "برمجيات", "/ˈsɒftweə/", "اسم", "The software needs an update.", "البرنامج يحتاج تحديثاً."),
        w("update", "تحديث", "/ˈʌpdeɪt/", "اسم", "Install the latest update.", "ثبّت آخر تحديث."),
        w("account", "حساب", "/əˈkaʊnt/", "اسم", "I created a new account.", "أنشأت حساباً جديداً."),
        w("password", "كلمة مرور", "/ˈpɑːswɜːd/", "اسم", "Use a strong password.", "استخدم كلمة مرور قوية."),
        w("download", "يُنزّل", "/ˌdaʊnˈləʊd/", "فعل", "You can download the file.", "يمكنك تنزيل الملف."),
        w("online", "عبر الإنترنت", "/ˌɒnˈlaɪn/", "ظرف", "The course is online.", "الدورة عبر الإنترنت."),
        w("privacy", "خصوصية", "/ˈprɪvəsi/", "اسم", "Privacy settings matter.", "إعدادات الخصوصية مهمة.")
      ],
      grammar: {
        title: "المبني للمجهول: is used / was built",
        idea: "نركّز على الشيء أو الحدث لا على من فعله.",
        rules: [
          { f: "مضارع: am/is/are + التصريف الثالث", ex: "The app is used by millions." },
          { f: "ماضي: was/were + التصريف الثالث", ex: "The website was created in 2020." },
          { f: "مع الفاعل: by", ex: "The data is stored by the company." },
          { f: "السبب في استخدامه: الفاعل مجهول أو غير مهم", ex: "My account was hacked." }
        ],
        examples: [
          { en: "Passwords should be changed regularly.", ar: "ينبغي تغيير كلمات المرور بانتظام." },
          { en: "The update was released last night.", ar: "أُصدر التحديث ليلة أمس." },
          { en: "This feature is not supported.", ar: "هذه الميزة غير مدعومة." }
        ],
        note: "لا تنسَ التصريف الثالث: «is use» خطأ، الصحيح «is used»."
      },
      exercises: [
        c("The app ___ by millions of people.", ["is used", "uses", "is using", "used"], 0, "مبني للمجهول ← is used."),
        f("The website ___ created in 2020.", ["was"], "ماضي مبني للمجهول ← was."),
        c("Choose the passive sentence.", ["My account was hacked.", "Someone hacked my account.", "My account hacked.", "I hacked my account."], 0, "المبني للمجهول يركّز على الحساب."),
        ord("Passwords should be changed regularly", "ينبغي تغيير كلمات المرور بانتظام."),
        tr("أُصدر التحديث ليلة أمس.", ["The update was released last night", "The update was released yesterday night"], "was + released.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب 4 جُمل تشرح فيها إعدادات خصوصية تستخدمها، ولماذا. استخدم المبني للمجهول مرتين.",
        min: 35,
        checklist: ["استخدمت is/are + التصريف الثالث", "استخدمت was/were مرة", "ذكرت سبباً"]
      }
    },
    {
      id: "B1-3",
      level: "B1",
      title: "البيئة والمجتمع",
      aim: "تناقش مشكلة بيئية وتقترح حلاً.",
      words: [
        w("pollution", "تلوث", "/pəˈluːʃn/", "اسم", "Air pollution is rising.", "تلوث الهواء يزداد."),
        w("waste", "نفايات/هدر", "/weɪst/", "اسم", "Food waste is a serious problem.", "هدر الطعام مشكلة خطيرة."),
        w("recycle", "يعيد التدوير", "/ˌriːˈsaɪkl/", "فعل", "We recycle plastic at home.", "نعيد تدوير البلاستيك في المنزل."),
        w("climate", "مناخ", "/ˈklaɪmət/", "اسم", "Climate change affects farming.", "تغير المناخ يؤثر على الزراعة."),
        w("energy", "طاقة", "/ˈenədʒi/", "اسم", "Solar energy is renewable.", "الطاقة الشمسية متجددة."),
        w("reduce", "يقلّل", "/rɪˈdjuːs/", "فعل", "We must reduce plastic use.", "علينا تقليل استخدام البلاستيك."),
        w("renewable", "متجدّد", "/rɪˈnjuːəbl/", "صفة", "Renewable sources are cheaper now.", "المصادر المتجددة أرخص الآن."),
        w("damage", "ضرر/يتلف", "/ˈdæmɪdʒ/", "اسم", "The damage was permanent.", "كان الضرر دائماً.")
      ],
      grammar: {
        title: "الشرط الأول + أفعال الوجوب",
        idea: "الشرط الأول لاحتمال واقعي، والوجوب لتحديد المسؤولية.",
        rules: [
          { f: "If + مضارع بسيط, will + مصدر", ex: "If we recycle, we will reduce waste." },
          { f: "must = إلزام داخلي/قوي", ex: "We must act now." },
          { f: "have to = إلزام خارجي", ex: "Companies have to follow the law." },
          { f: "should = نصيحة", ex: "Governments should invest in renewables." }
        ],
        examples: [
          { en: "If the city improves public transport, traffic will decrease.", ar: "إذا حسّنت المدينة المواصلات العامة، سينخفض الازدحام." },
          { en: "We should not ignore the damage.", ar: "لا ينبغي أن نتجاهل الضرر." },
          { en: "Everyone has to play a role.", ar: "على الجميع أن يؤدي دوره." }
        ],
        note: "لا تستخدم will في جملة الشرط: «If we will recycle» خطأ."
      },
      exercises: [
        c("If we recycle more, we ___ less waste.", ["will produce", "produce will", "produced", "are produce"], 0, "الشرط الأول ← will + مصدر."),
        f("Governments ___ invest in clean energy.", ["should"], "نصيحة ← should."),
        c("Which is correct?", ["If it rains, we will stay home.", "If it will rain, we will stay home.", "If it rains, we stay will home.", "If it rained, we will stay home."], 0, "لا will بعد if."),
        ord("We must reduce plastic waste", "علينا تقليل نفايات البلاستيك."),
        tr("إذا زاد التلوث، ستزداد الأمراض.", ["If pollution increases, diseases will increase", "If pollution rises, diseases will rise"], "if + مضارع, will + مصدر.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب فقرة (50–70 كلمة): مشكلة بيئية في مدينتك، سببها، وحلّان مقترحان.",
        min: 50,
        checklist: ["استخدمت جملة شرطية واحدة", "استخدمت should أو must", "ذكرت حلّين"]
      }
    },

    /* ============================ B2 ============================ */
    {
      id: "B2-1",
      level: "B2",
      title: "العمل المهني",
      aim: "تدير اجتماعاً وتتفاوض على أولويات.",
      words: [
        w("stakeholder", "صاحب مصلحة", "/ˈsteɪkhəʊldə/", "اسم", "We informed all stakeholders.", "أبلغنا جميع أصحاب المصلحة."),
        w("proposal", "مقترح", "/prəˈpəʊzl/", "اسم", "The proposal was rejected.", "رُفض المقترح."),
        w("revenue", "إيرادات", "/ˈrevənjuː/", "اسم", "Revenue grew by 12%.", "نمت الإيرادات 12%."),
        w("budget", "ميزانية", "/ˈbʌdʒɪt/", "اسم", "The budget is tight.", "الميزانية محدودة."),
        w("delegate", "يفوّض", "/ˈdelɪɡeɪt/", "فعل", "Good managers delegate tasks.", "المديرون الجيدون يفوّضون المهام."),
        w("feedback", "تغذية راجعة", "/ˈfiːdbæk/", "اسم", "I need honest feedback.", "أحتاج تغذية راجعة صادقة."),
        w("promotion", "ترقية", "/prəˈməʊʃn/", "اسم", "She earned a promotion.", "استحقت ترقية."),
        w("resignation", "استقالة", "/ˌrezɪɡˈneɪʃn/", "اسم", "He handed in his resignation.", "قدّم استقالته.")
      ],
      grammar: {
        title: "الشرط الثاني + التلطيف المهني",
        idea: "الشرط الثاني لافتراض غير واقعي الآن، والتلطيف يجعل الطلب مهنياً.",
        rules: [
          { f: "If + ماضي بسيط, would + مصدر", ex: "If we had more time, we would improve it." },
          { f: "would like / could / might للتلطيف", ex: "Could you clarify the deadline?" },
          { f: "I'm afraid / I'd suggest / It might be worth", ex: "It might be worth revisiting the budget." },
          { f: "was/were في الشرط", ex: "If I were the client, I would ask for a discount." }
        ],
        examples: [
          { en: "If the budget were larger, we would hire two more people.", ar: "لو كانت الميزانية أكبر، لوظّفنا شخصين إضافيين." },
          { en: "I'd suggest we postpone the launch.", ar: "أقترح تأجيل الإطلاق." },
          { en: "Would you mind sharing the figures?", ar: "هل تمانع مشاركة الأرقام؟" }
        ],
        note: "الشرط الثاني افتراضي، لا حقيقي: «If I were you» لا «If I was you» في الكتابة الرسمية."
      },
      exercises: [
        c("If we had a bigger budget, we ___ more staff.", ["would hire", "will hire", "hired", "hire"], 0, "الشرط الثاني ← would + مصدر."),
        f("I'd suggest we ___ the deadline.", ["extend", "extended", "will extend", "extending"], "بعد suggest نستخدم المصدر."),
        c("Which is the most professional request?", ["Could you clarify the deadline?", "Explain the deadline.", "I want the deadline now.", "Tell me the deadline."], 0, "التلطيف مهني أكثر."),
        ord("If I were you I would ask for a discount", "لو كنت مكانك لطلبت خصماً."),
        tr("أقترح أن نراجع الميزانية.", ["I suggest we review the budget", "I'd suggest we review the budget", "I would suggest we review the budget"], "suggest + we + مصدر.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب رسالة بريد مهنية قصيرة (60–80 كلمة) تطلب فيها تمديد موعد تسليم، مع سبب ومقترح بديل.",
        min: 60,
        checklist: ["استخدمت صيغة تلطيف واحدة على الأقل", "ذكرت سبباً محدداً", "قدمت بديلاً", "ختمت بطلب واضح"]
      }
    },
    {
      id: "B2-2",
      level: "B2",
      title: "الإعلام والرأي",
      aim: "تفصل الخبر عن الرأي وتنقل كلام الآخرين.",
      words: [
        w("headline", "عنوان رئيسي", "/ˈhedlaɪn/", "اسم", "The headline was misleading.", "كان العنوان مضللاً."),
        w("bias", "تحيّز", "/ˈbaɪəs/", "اسم", "The report shows clear bias.", "يُظهر التقرير تحيزاً واضحاً."),
        w("source", "مصدر", "/sɔːs/", "اسم", "Always check the source.", "تحقّق من المصدر دائماً."),
        w("coverage", "تغطية", "/ˈkʌvərɪdʒ/", "اسم", "The coverage was one-sided.", "كانت التغطية منحازة لطرف."),
        w("misleading", "مضلّل", "/ˌmɪsˈliːdɪŋ/", "صفة", "The claim was misleading.", "كان الادعاء مضللاً."),
        w("editorial", "مقال افتتاحي", "/ˌedɪˈtɔːriəl/", "اسم", "The editorial criticised the policy.", "انتقد المقال الافتتاحي السياسة."),
        w("audience", "جمهور", "/ˈɔːdiəns/", "اسم", "The audience reacted strongly.", "تفاعل الجمهور بقوة."),
        w("claim", "ادعاء", "/kleɪm/", "اسم", "They repeated the claim without evidence.", "كرروا الادعاء بلا دليل.")
      ],
      grammar: {
        title: "الكلام المنقول: said / told / reported",
        idea: "ننقل كلاماً بتغيير الزمن والضمائر والزمن المكاني.",
        rules: [
          { f: "said + (that) + جملة", ex: "He said (that) he was tired." },
          { f: "told + شخص + (that)", ex: "She told me she would call." },
          { f: "تراجع الزمن خطوة", ex: "\"I am busy\" → He said he was busy." },
          { f: "الأسئلة: asked + if / wh- + ترتيب خبرى", ex: "He asked if I had seen it." }
        ],
        examples: [
          { en: "The minister said the figures were accurate.", ar: "قال الوزير إن الأرقام دقيقة." },
          { en: "She asked whether the source was reliable.", ar: "سألت إن كان المصدر موثوقاً." },
          { en: "They claimed that the report had been edited.", ar: "ادّعوا أن التقرير قد عُدّل." }
        ],
        note: "لا تقل «He said me» — الصحيح «He told me» أو «He said to me»."
      },
      exercises: [
        c("He said he ___ busy.", ["was", "is", "be", "were"], 0, "تراجع الزمن ← was."),
        f("She told ___ she would call.", ["me"], "told + شخص."),
        c("Convert: \"Have you seen it?\" → He asked ___", ["if I had seen it", "if I have seen it", "did I see it", "that I saw it"], 0, "سؤال منقول ← if + تراجع الزمن."),
        ord("The headline was misleading and biased", "كان العنوان مضللاً ومنحازاً."),
        tr("قال إن التقرير غير دقيق.", ["He said that the report was not accurate", "He said the report was not accurate", "He said that the report wasn't accurate"], "said + that + was.")
      ],
      produce: {
        type: "write",
        prompt: "لخّص خبراً قرأته (60–80 كلمة): ما الادعاء؟ من المصدر؟ وهل تجد تحيزاً؟ استخدم الكلام المنقول.",
        min: 60,
        checklist: ["استخدمت said/told/asked", "أعدت صياغة الادعاء لا نسخه", "ذكرت مصدراً", "فصلت الرأي عن الخبر"]
      }
    },
    {
      id: "B2-3",
      level: "B2",
      title: "المال والاقتصاد",
      aim: "تشرح قراراً مالياً وتقيّم مخاطره.",
      words: [
        w("income", "دخل", "/ˈɪnkʌm/", "اسم", "Her income doubled.", "تضاعف دخلها."),
        w("expense", "مصروف", "/ɪkˈspens/", "اسم", "Travel is our biggest expense.", "السفر أكبر مصروفاتنا."),
        w("loan", "قرض", "/ləʊn/", "اسم", "He took a small loan.", "أخذ قرضاً صغيراً."),
        w("invest", "يستثمر", "/ɪnˈvest/", "فعل", "They invest in index funds.", "يستثمرون في صناديق مؤشرة."),
        w("debt", "دَين", "/det/", "اسم", "Debt limits your options.", "الدَّين يقيّد خياراتك."),
        w("inflation", "تضخّم", "/ɪnˈfleɪʃn/", "اسم", "Inflation reduces purchasing power.", "التضخم يقلّل القوة الشرائية."),
        w("savings", "مدخرات", "/ˈseɪvɪŋz/", "اسم", "Keep three months of savings.", "احتفظ بمدخرات ثلاثة أشهر."),
        w("profit", "ربح", "/ˈprɒfɪt/", "اسم", "The company reported a small profit.", "أعلنت الشركة ربحاً صغيراً.")
      ],
      grammar: {
        title: "الجمل الوصلية: which / who / whose",
        idea: "نضيف معلومة عن اسم دون جملة جديدة، ونتحكم في الضرورة بوجود الفاصلة.",
        rules: [
          { f: "تعريفية (ضرورية) بلا فواصل", ex: "People who save early retire earlier." },
          { f: "غير تعريفية (إضافة) بفواصل", ex: "My bank, which is local, charges no fees." },
          { f: "whose للملكية", ex: "A family whose income is fixed plans carefully." },
          { f: "that في التعريفية فقط", ex: "The loan that he took was small." }
        ],
        examples: [
          { en: "Inflation, which reached 20%, hit savings hard.", ar: "التضخم، الذي بلغ 20%، أضرّ بالمدخرات بشدة." },
          { en: "The adviser who helped me was honest.", ar: "المستشار الذي ساعدني كان صادقاً." },
          { en: "A strategy whose goal is stability beats hype.", ar: "استراتيجية هدفها الاستقرار تتفوق على الضجيج." }
        ],
        note: "لا تضع that بعد فاصلة: «, that» خطأ في غير التعريفية."
      },
      exercises: [
        c("Inflation, ___ reached 20%, hit savings.", ["which", "that", "who", "whose"], 0, "بعد فاصلة ← which."),
        f("The adviser ___ helped me was honest.", ["who", "that"], "للعاقل في جملة تعريفية."),
        c("Choose the correct sentence.", ["A family whose income is fixed plans carefully.", "A family which income is fixed plans carefully.", "A family who income is fixed plans carefully.", "A family that income is fixed plans carefully."], 0, "الملكية ← whose."),
        ord("Debt limits your options over time", "الدَّين يقيّد خياراتك مع الوقت."),
        tr("التضخم الذي بلغ 20% قلّل مدخراتنا.", ["Inflation, which reached 20%, reduced our savings", "Inflation which reached 20% reduced our savings"], "which + فاصلة للجملة غير التعريفية.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب فقرة (70–90 كلمة) تصف قراراً مالياً اتخذته: الخيار، السبب، المخاطرة، والنتيجة.",
        min: 70,
        checklist: ["استخدمت جملة وصلية واحدة على الأقل", "ذكرت مخاطرة", "استخدمت مفردات الدرس (3 على الأقل)"]
      }
    },

    /* ============================ C1 ============================ */
    {
      id: "C1-1",
      level: "C1",
      title: "الأكاديمي والبحث",
      aim: "تكتب وتناقش بحثاً بأسلوب أكاديمي دقيق.",
      words: [
        w("hypothesis", "فرضية", "/haɪˈpɒθəsɪs/", "اسم", "The hypothesis was not supported.", "لم تُدعم الفرضية."),
        w("methodology", "منهجية", "/ˌmeθəˈdɒlədʒi/", "اسم", "The methodology has clear limitations.", "للمنهجية قيود واضحة."),
        w("evidence", "دليل", "/ˈevɪdəns/", "اسم", "The evidence is inconclusive.", "الأدلة غير حاسمة."),
        w("peer review", "تحكيم الأقران", "/ˌpɪə rɪˈvjuː/", "اسم", "The paper passed peer review.", "اجتاز البحث تحكيم الأقران."),
        w("cite", "يستشهد", "/saɪt/", "فعل", "Always cite your sources.", "استشهد بمصادرك دائماً."),
        w("findings", "نتائج", "/ˈfaɪndɪŋz/", "اسم", "The findings contradict earlier work.", "النتائج تخالف أعمالاً سابقة."),
        w("validity", "صلاحية/مصداقية", "/vəˈlɪdəti/", "اسم", "Sample size affects validity.", "حجم العينة يؤثر على الصلاحية."),
        w("sample", "عيّنة", "/ˈsɑːmpl/", "اسم", "The sample included 400 adults.", "شملت العينة 400 بالغ.")
      ],
      grammar: {
        title: "البناء الأكاديمي: It is argued that…",
        idea: "الأسلوب الأكاديمي يخفض الفاعل الشخصي ويرفع الموضوعية.",
        rules: [
          { f: "مبني للمجهول للتقرير", ex: "It is widely believed that…" },
          { f: "اسمية (nominalisation) للتكثيف", ex: "The implementation of the policy → implementing the policy" },
          { f: "التحفّظ الأكاديمي (hedging)", ex: "The data suggest / may indicate / appear to" },
          { f: "الربط المنطقي الدقيق", ex: "whereas / albeit / insofar as" }
        ],
        examples: [
          { en: "It is argued that the sample was too narrow to generalise from.", ar: "يُقال إن العيّنة كانت أضيق من أن يُعمّم منها." },
          { en: "The findings appear to support the hypothesis, albeit weakly.", ar: "يبدو أن النتائج تدعم الفرضية، وإن كان ذلك بشكل ضعيف." },
          { en: "Further research is required before conclusions are drawn.", ar: "يلزم بحث إضافي قبل استخلاص النتائج." }
        ],
        note: "تجنّب «I think» في الكتابة الأكاديمية؛ استخدم «This suggests» أو «It appears»."
      },
      exercises: [
        c("Choose the most academic phrasing.", ["It is argued that the sample was too narrow.", "I think the sample is too small.", "The sample is small, obviously.", "Everybody knows the sample is small."], 0, "مبني للمجهول + تحفّظ."),
        f("The findings ___ to support the hypothesis.", ["appear"], "hedging أكاديمي ← appear to."),
        c("Which is the best hedging verb?", ["suggest", "prove", "guarantee", "confirm absolutely"], 0, "التحفّظ: suggest."),
        ord("Further research is required before conclusions are drawn", "يلزم بحث إضافي قبل استخلاص النتائج."),
        tr("تشير البيانات إلى أن المنهجية محدودة.", ["The data suggest that the methodology is limited", "The data suggests that the methodology is limited"], "suggest + that.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب ملخصاً بحثياً (100–120 كلمة): سؤال البحث، المنهج، النتائج، والقيود. استخدم أسلوباً موضوعياً.",
        min: 100,
        checklist: ["استخدمت It is… مصدرها مجهول", "استخدمت hedging (suggest/appear)", "ذكرت قيداً واحداً", "لم أستخدم I think"]
      }
    },
    {
      id: "C1-2",
      level: "C1",
      title: "الأعمال والتفاوض",
      aim: "تتفاوض على شروط وتدير خلافاً مهنياً.",
      words: [
        w("leverage", "نفوذ/ورقة ضغط", "/ˈliːvərɪdʒ/", "اسم", "We have little leverage here.", "لدينا نفوذ ضعيف هنا."),
        w("concession", "تنازل", "/kənˈseʃn/", "اسم", "Each side made a concession.", "قدّم كل طرف تنازلاً."),
        w("margin", "هامش ربح", "/ˈmɑːdʒɪn/", "اسم", "The margin is too thin.", "الهامش ضعيف جداً."),
        w("terms", "شروط", "/tɜːmz/", "اسم", "We agreed on the terms.", "اتفقنا على الشروط."),
        w("clause", "بند", "/klɔːz/", "اسم", "The payment clause is unclear.", "بند الدفع غير واضح."),
        w("dispute", "نزاع", "/dɪˈspjuːt/", "اسم", "The dispute was settled quietly.", "سُوّي النزاع بهدوء."),
        w("comply", "يمتثل", "/kəmˈplaɪ/", "فعل", "Both parties must comply.", "على الطرفين الامتثال."),
        w("mutual", "متبادل", "/ˈmjuːtʃuəl/", "صفة", "We reached a mutual agreement.", "توصلنا إلى اتفاق متبادل.")
      ],
      grammar: {
        title: "الشرط الثالث والمختلط + التلطيف المتقدم",
        idea: "الشرط الثالث لماضٍ لم يحدث، والمختلط يربط ماضياً بنتيجة حاضرة.",
        rules: [
          { f: "الثالث: If + had + p.p., would have + p.p.", ex: "If we had signed, we would have lost money." },
          { f: "المختلط: If + had + p.p., would + مصدر", ex: "If we had negotiated better, we would be profitable now." },
          { f: "التلطيف: I wonder if / I'd be grateful if", ex: "I'd be grateful if you could reconsider." },
          { f: "الاعتراض المهني: I take your point, however…", ex: "I take your point, but the margin is thin." }
        ],
        examples: [
          { en: "Had we known the terms, we would have declined.", ar: "لو عرفنا الشروط لرفضنا." },
          { en: "If the clause were clearer, we would sign today.", ar: "لو كان البند أوضح لوقّعنا اليوم." },
          { en: "I'd be grateful if you could revisit the margin.", ar: "سأكون ممتناً لو أعدت النظر في الهامش." }
        ],
        note: "«Had we known» = if we had known — أسلوب رسمي مكثّف، بلا if."
      },
      exercises: [
        c("If we had signed, we ___ money.", ["would have lost", "would lose", "will lose", "lost"], 0, "الشرط الثالث ← would have + p.p."),
        f("___ we known the terms, we would have declined.", ["Had"], "inversion رسمية = If we had."),
        c("Most professional objection:", ["I take your point, however the margin is thin.", "You are wrong.", "That makes no sense.", "No, impossible."], 0, "اعتراض مهني."),
        ord("I would be grateful if you could reconsider", "سأكون ممتناً لو أعدت النظر."),
        tr("لو تفاوضنا أفضل، لكنا مربحين الآن.", ["If we had negotiated better, we would be profitable now", "If we'd negotiated better, we'd be profitable now"], "شرط مختلط.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب بريداً تفاوضياً (120–150 كلمة): موقفك، تنازل واحد تقدمه، شرط واحد تطلبه، وحدودك.",
        min: 120,
        checklist: ["استخدمت شرطاً ثالثاً أو مختلطاً", "قدّمت تنازلاً وطلبت مقابلاً", "استخدمت لغة تلطيف", "حدّدت موعداً أو خطوة تالية"]
      }
    },
    {
      id: "C1-3",
      level: "C1",
      title: "الثقافة والأدب",
      aim: "تحلّل نصاً وتصف أسلوبه وموقفه.",
      words: [
        w("metaphor", "استعارة", "/ˈmetəfə/", "اسم", "The metaphor runs through the novel.", "تسري الاستعارة في الرواية."),
        w("irony", "سخرية/مفارقة", "/ˈaɪrəni/", "اسم", "The irony is deliberate.", "المفارقة مقصودة."),
        w("narrative", "سرد", "/ˈnærətɪv/", "اسم", "The narrative shifts between voices.", "يتنقل السرد بين أصوات."),
        w("theme", "فكرة/موضوع", "/θiːm/", "اسم", "Exile is the central theme.", "المنفى هو الفكرة المركزية."),
        w("nuance", "فارق دقيق", "/ˈnjuːɑːns/", "اسم", "The translation loses the nuance.", "تضيع الترجمة الفارق الدقيق."),
        w("allusion", "تلميح", "/əˈluːʒn/", "اسم", "The title is an allusion to Homer.", "العنوان تلميح لهوميروس."),
        w("prose", "نثر", "/prəʊz/", "اسم", "Her prose is spare and exact.", "نثرها مقتصد ودقيق."),
        w("satire", "هجاء", "/ˈsætaɪə/", "اسم", "The play is a satire on power.", "المسرحية هجاء للسلطة.")
      ],
      grammar: {
        title: "الجمل الوصفية والقلب (inversion) الأسلوبي",
        idea: "المشاركات (participles) تختصر، والقلب يضع التوكيد في البداية.",
        rules: [
          { f: "مشاركة حاضرة للسبب", ex: "Writing in exile, the author…" },
          { f: "مشاركة ماضية للنتيجة", ex: "Published in 1950, the novel…" },
          { f: "القلب بعد النفي/الظرف", ex: "Rarely does the narrator explain." },
          { f: "التوكيد بـ what/it", ex: "What strikes the reader is the silence." }
        ],
        examples: [
          { en: "Rarely has a novel captured exile so precisely.", ar: "نادراً ما صوّرت رواية المنفى بهذه الدقة." },
          { en: "Written in a spare prose, the memoir avoids sentimentality.", ar: "المذكّرات المكتوبة بنثر مقتصد تتجنب العاطفية." },
          { en: "Not until the final page does the irony land.", ar: "لا تصل المفارقة إلا في الصفحة الأخيرة." }
        ],
        note: "بعد الظرف المنفي في البداية، اقلب ترتيب الفعل المساعد: «Rarely does he…» لا «Rarely he does»."
      },
      exercises: [
        c("Rarely ___ a novel captured exile so precisely.", ["has", "have", "does", "is"], 0, "قلب بعد rarely ← has + الفاعل."),
        f("___ in a spare prose, the memoir avoids sentimentality.", ["Written"], "مشاركة ماضية."),
        c("Which is an allusion?", ["The title references Homer.", "The title is short.", "The title is written in bold.", "The title is translated."], 0, "التلميح = إشارة ثقافية."),
        ord("Not until the final page does the irony land", "لا تصل المفارقة إلا في الصفحة الأخيرة."),
        tr("نادراً ما يشرح الراوي.", ["Rarely does the narrator explain", "Rarely does the narrator explain himself"], "قلب بعد rarely.")
      ],
      produce: {
        type: "write",
        prompt: "حلّل فقرة من نص تحبه (120–150 كلمة): الأسلوب، الاستعارة أو السخرية، والموقف الضمني.",
        min: 120,
        checklist: ["استخدمت مصطلحاً أدبياً واحداً على الأقل", "استخدمت مشاركة (participle) واحدة", "قدمت اقتباساً أو إشارة محددة", "تجنبت التلخيص فقط"]
      }
    },

    /* ============================ C2 ============================ */
    {
      id: "C2-1",
      level: "C2",
      title: "الدقة اللغوية",
      aim: "تضبط التلازم اللفظي والمستوى اللغوي والفروق الدقيقة.",
      words: [
        w("collocation", "تلازم لفظي", "/ˌkɒləˈkeɪʃn/", "اسم", "“Heavy rain” is a strong collocation.", "«مطر غزير» تلازم قوي."),
        w("register", "مستوى اللغة", "/ˈredʒɪstə/", "اسم", "The register is too formal for an email.", "المستوى رسمي أكثر من اللازم لبريد."),
        w("connotation", "دلالة ضمنية", "/ˌkɒnəˈteɪʃn/", "اسم", "“Cheap” carries a negative connotation.", "«رخيص» تحمل دلالة سلبية."),
        w("euphemism", "تلطيف لفظي", "/ˈjuːfəmɪzəm/", "اسم", "“Let go” is a euphemism for firing.", "«تسريح» تلطيف لفظي للفصل."),
        w("understatement", "تهوين مقصود", "/ˈʌndəsteɪtmənt/", "اسم", "Calling it a setback is an understatement.", "وصفه بأنه انتكاسة تهوين."),
        w("idiom", "تعبير اصطلاحي", "/ˈɪdiəm/", "اسم", "The idiom does not translate literally.", "التعبير الاصطلاحي لا يُترجم حرفياً."),
        w("precision", "دقة", "/prɪˈsɪʒn/", "اسم", "Precision matters more than ornament.", "الدقة أهم من الزخرفة."),
        w("ambiguity", "غموض/التباس", "/ˌæmbɪˈɡjuːəti/", "اسم", "The sentence suffers from ambiguity.", "تعاني الجملة من الالتباس.")
      ],
      grammar: {
        title: "البنى المشقوقة (cleft) والحذف",
        idea: "C2 ليس تعقيداً بل تحكّماً: تضع المعلومة حيث تريد، وتحذف ما يُفهم.",
        rules: [
          { f: "It-cleft للتوكيد", ex: "It was the silence that struck me." },
          { f: "What-cleft", ex: "What struck me was the silence." },
          { f: "الحذف بعد المساعد", ex: "Some agreed; others didn't." },
          { f: "الاستبدال بـ so/not", ex: "I think so. / I'm afraid not." }
        ],
        examples: [
          { en: "It is not the words but the pauses that carry the meaning.", ar: "ليست الكلمات بل الوقفات هي التي تحمل المعنى." },
          { en: "What the report omits is more revealing than what it states.", ar: "ما يحذفه التقرير أبلغ مما يذكره." },
          { en: "He said he would resign, and he did.", ar: "قال إنه سيستقيل، وقد فعل." }
        ],
        note: "الحذف لا يعني الإبهام: احذف فقط ما يستطيع القارئ استعادته فوراً."
      },
      exercises: [
        c("___ the silence that struck me.", ["It was", "There was", "That was", "This is"], 0, "It-cleft للتوكيد."),
        f("What struck me ___ the silence.", ["was"], "what-cleft: What … was …"),
        c("“Some agreed; others ___.”", ["didn't", "did not agreed", "not", "were not"], 0, "حذف بعد المساعد."),
        ord("What the report omits is more revealing than what it states", "ما يحذفه التقرير أبلغ مما يذكره."),
        tr("ليست الكلمات بل الوقفات هي التي تحمل المعنى.", ["It is not the words but the pauses that carry the meaning", "It's not the words but the pauses that carry the meaning"], "It-cleft.")
      ],
      produce: {
        type: "write",
        prompt: "خُذ فقرة كتبتها سابقاً وأعد كتابتها (100–120 كلمة) بثلاث تعديلات: حذف 20% من الكلمات، استبدال كلمة عامية بأخرى مناسبة، وإضافة بنية مشقوقة واحدة.",
        min: 100,
        checklist: ["قلّصت الطول دون فقدان معنى", "وحّدت المستوى اللغوي", "استخدمت cleft واحدة", "لا حشو (very, really, actually)"]
      }
    },
    {
      id: "C2-2",
      level: "C2",
      title: "الخطاب الرسمي والسياسة",
      aim: "تكتب خطاباً رسمياً وتفكّك خطاباً سياسياً.",
      words: [
        w("policy", "سياسة عامة", "/ˈpɒləsi/", "اسم", "The policy failed in practice.", "فشلت السياسة عملياً."),
        w("mandate", "تفويض شعبي", "/ˈmændeɪt/", "اسم", "The government claims a mandate.", "تزعم الحكومة تفويضاً."),
        w("rhetoric", "بلاغة خطابية", "/ˈretərɪk/", "اسم", "The rhetoric outpaced the detail.", "سبقت البلاغة التفاصيل."),
        w("consensus", "توافق", "/kənˈsensəs/", "اسم", "No consensus was reached.", "لم يُتوصل إلى توافق."),
        w("accountability", "مساءلة", "/əˌkaʊntəˈbɪləti/", "اسم", "Accountability requires transparency.", "المساءلة تتطلب الشفافية."),
        w("legislation", "تشريع", "/ˌledʒɪsˈleɪʃn/", "اسم", "The legislation passed narrowly.", "مرّ التشريع بفارق ضيق."),
        w("constituency", "دائرة انتخابية", "/kənˈstɪtjuənsi/", "اسم", "He visited his constituency.", "زار دائرته الانتخابية."),
        w("reform", "إصلاح", "/rɪˈfɔːm/", "اسم", "Reform without funding is sloganeering.", "الإصلاح بلا تمويل شعارات.")
      ],
      grammar: {
        title: "المجموعات الاسمية المعقّدة والتنازل",
        idea: "الخطاب الرسمي يكدّس الأسماء ويستخدم روابط تنازلية دقيقة.",
        rules: [
          { f: "اسمية السلسلة", ex: "the gradual erosion of public trust in institutions" },
          { f: "التنازل: albeit / notwithstanding / while", ex: "Notwithstanding the cost, the reform proceeded." },
          { f: "الشرط الرسمي: should", ex: "Should the bill fail, the minister will resign." },
          { f: "التلطيف البلاغي", ex: "There is reason to believe that…" }
        ],
        examples: [
          { en: "Notwithstanding widespread opposition, the legislation passed.", ar: "على الرغم من المعارضة الواسعة، مرّ التشريع." },
          { en: "Should the policy fail, accountability will be demanded.", ar: "إذا فشلت السياسة، ستُطالب المساءلة." },
          { en: "The gradual erosion of trust is the deeper problem.", ar: "التآكل التدريجي للثقة هو المشكلة الأعمق." }
        ],
        note: "الرسمية ليست طولاً: جملة واحدة طويلة واضحة أفضل من ثلاث غامضة."
      },
      exercises: [
        c("___ the bill fail, the minister will resign.", ["Should", "If", "Would", "Were"], 0, "شرط رسمي مقلوب ← Should."),
        f("___ widespread opposition, the legislation passed.", ["Notwithstanding", "Despite of", "Although", "However"], "notwithstanding + اسم."),
        c("Most formal noun phrase:", ["the gradual erosion of public trust", "trust getting worse slowly", "people trust less and less", "the trust thing"], 0, "اسمية مكدّسة."),
        ord("Should the policy fail accountability will be demanded", "إذا فشلت السياسة ستُطالب المساءلة."),
        tr("على الرغم من التكلفة، استمر الإصلاح.", ["Notwithstanding the cost, the reform proceeded", "Notwithstanding the cost the reform proceeded"], "notwithstanding + اسم.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب بياناً رسمياً (130–160 كلمة) عن قضية عامة: المشكلة، الالتزام، الإجراء، والمساءلة.",
        min: 130,
        checklist: ["استخدمت Notwithstanding أو Should", "استخدمت مجموعة اسمية معقّدة", "حددت جهة مسؤولة", "تجنبت الشعارات"]
      }
    },
    {
      id: "C2-3",
      level: "C2",
      title: "الفلسفة والأخلاق",
      aim: "تبني حجة أخلاقية وتفنّد اعتراضاً.",
      words: [
        w("ethics", "أخلاق", "/ˈeθɪks/", "اسم", "The ethics of the decision are contested.", "أخلاقيات القرار محل خلاف."),
        w("premise", "مقدمة/مسلّمة", "/ˈpremɪs/", "اسم", "The argument rests on a false premise.", "تقوم الحجة على مسلّمة خاطئة."),
        w("implication", "تضمين/تبعة", "/ˌɪmplɪˈkeɪʃn/", "اسم", "The implications are far-reaching.", "التبعات بعيدة المدى."),
        w("autonomy", "استقلالية", "/ɔːˈtɒnəmi/", "اسم", "Autonomy requires informed consent.", "الاستقلالية تتطلب موافقة مستنيرة."),
        w("justice", "عدالة", "/ˈdʒʌstɪs/", "اسم", "Justice is not only distributive.", "العدالة ليست توزيعية فقط."),
        w("virtue", "فضيلة", "/ˈvɜːtʃuː/", "اسم", "Virtue lies between two extremes.", "الفضيلة تقع بين طرفين."),
        w("dilemma", "مأزق أخلاقي", "/dɪˈlemə/", "اسم", "The dilemma has no clean solution.", "المأزق بلا حل نظيف."),
        w("contradiction", "تناقض", "/ˌkɒntrəˈdɪkʃn/", "اسم", "There is a contradiction in his position.", "ثمة تناقض في موقفه.")
      ],
      grammar: {
        title: "أفعال الاحتمال التامة والتنازل",
        idea: "التكهّن عن الماضي يحتاج modal + have + p.p.، والتنازل يمنح الحجة عمقاً.",
        rules: [
          { f: "must have + p.p. = استنتاج قوي", ex: "They must have known the risk." },
          { f: "should have + p.p. = نقد/ندم", ex: "The committee should have consulted patients." },
          { f: "could/might have + p.p. = احتمال فائت", ex: "A different rule might have produced a fairer outcome." },
          { f: "التنازل: Granted that… / Even so…", ex: "Granted that autonomy matters, it is not absolute." }
        ],
        examples: [
          { en: "Granted that consent matters, it cannot justify every risk.", ar: "بفرض أن الموافقة مهمة، لا يمكنها تبرير كل خطر." },
          { en: "The board must have anticipated this objection.", ar: "لا بد أن المجلس توقّع هذا الاعتراض." },
          { en: "A more inclusive process might have avoided the dilemma.", ar: "ربما تجنّبت عملية أكثر شمولاً هذا المأزق." }
        ],
        note: "«must have known» استنتاج، و«had to know» إلزام — لا تخلط بينهما."
      },
      exercises: [
        c("They ___ known the risk.", ["must have", "must", "had to", "should"], 0, "استنتاج عن الماضي ← must have + p.p."),
        f("The committee should ___ consulted patients.", ["have"], "should have + p.p. = نقد."),
        c("“Granted that autonomy matters, ___ it is not absolute.”", ["even so", "therefore", "because", "so that"], 0, "تنازل ← even so."),
        ord("Granted that consent matters it cannot justify every risk", "بفرض أن الموافقة مهمة لا يمكنها تبرير كل خطر."),
        tr("ربما تجنّبت عملية أكثر شمولاً هذا المأزق.", ["A more inclusive process might have avoided the dilemma", "A more inclusive process could have avoided the dilemma"], "might have + p.p.")
      ],
      produce: {
        type: "write",
        prompt: "اكتب حجة فلسفية قصيرة (150–180 كلمة): مسلّمة، استدلال، اعتراض قوي، وردّك عليه، وخاتمة.",
        min: 150,
        checklist: ["صرّحت بالمسلّمة", "قدّمت أقوى اعتراض لا أضعفه", "استخدمت بنية تنازلية", "ختمت بموقف واضح"]
      }
    }
  ];

  /* ---------------------- بنك المفردات الموسّع ---------------------- */
  /* صيغة مختصرة: [الكلمة, المعنى, النطق, نوع الكلمة] — بدون أمثلة، للتصفح والسحب إلى المراجعة. */
  var vocab = (function () {
    var groups = {
    A1: [
    ["time", "وقت", "/taɪm/", "اسم"],
    ["day", "يوم", "/deɪ/", "اسم"],
    ["week", "أسبوع", "/wiːk/", "اسم"],
    ["month", "شهر", "/mʌnθ/", "اسم"],
    ["year", "سنة", "/jɪə/", "اسم"],
    ["school", "مدرسة", "/skuːl/", "اسم"],
    ["work", "عمل", "/wɜːk/", "اسم/فعل"],
    ["money", "مال", "/ˈmʌni/", "اسم"],
    ["car", "سيارة", "/kɑː/", "اسم"],
    ["phone", "هاتف", "/fəʊn/", "اسم"],
    ["door", "باب", "/dɔː/", "اسم"],
    ["window", "نافذة", "/ˈwɪndəʊ/", "اسم"],
    ["table", "طاولة", "/ˈteɪbl/", "اسم"],
    ["chair", "كرسي", "/tʃeə/", "اسم"],
    ["big", "كبير", "/bɪɡ/", "صفة"],
    ["small", "صغير", "/smɔːl/", "صفة"],
    ["good", "جيد", "/ɡʊd/", "صفة"],
    ["bad", "سيئ", "/bæd/", "صفة"],
    ],
    A2: [
    ["travel", "يسافر", "/ˈtrævl/", "فعل"],
    ["holiday", "عطلة", "/ˈhɒlədeɪ/", "اسم"],
    ["weather", "طقس", "/ˈweðə/", "اسم"],
    ["health", "صحة", "/helθ/", "اسم"],
    ["change", "يغيّر", "/tʃeɪndʒ/", "فعل"],
    ["choose", "يختار", "/tʃuːz/", "فعل"],
    ["decide", "يقرر", "/dɪˈsaɪd/", "فعل"],
    ["explain", "يشرح", "/ɪkˈspleɪn/", "فعل"],
    ["describe", "يصف", "/dɪˈskraɪb/", "فعل"],
    ["agree", "يوافق", "/əˈɡriː/", "فعل"],
    ["improve", "يحسّن", "/ɪmˈpruːv/", "فعل"],
    ["possible", "ممكن", "/ˈpɒsəbl/", "صفة"],
    ["difficult", "صعب", "/ˈdɪfɪkəlt/", "صفة"],
    ["quiet", "هادئ", "/ˈkwaɪət/", "صفة"],
    ["busy", "مشغول", "/ˈbɪzi/", "صفة"],
    ["careful", "حذر", "/ˈkeəfl/", "صفة"],
    ["danger", "خطر", "/ˈdeɪndʒə/", "اسم"],
    ["safety", "أمان", "/ˈseɪfti/", "اسم"],
    ],
    B1: [
    ["achieve", "يحقق", "/əˈtʃiːv/", "فعل"],
    ["avoid", "يتجنب", "/əˈvɔɪd/", "فعل"],
    ["consider", "يعتبر/يفكر في", "/kənˈsɪdə/", "فعل"],
    ["suggest", "يقترح", "/səˈdʒest/", "فعل"],
    ["influence", "يؤثر في", "/ˈɪnfluəns/", "فعل/اسم"],
    ["opportunity", "فرصة", "/ˌɒpəˈtjuːnəti/", "اسم"],
    ["decision", "قرار", "/dɪˈsɪʒn/", "اسم"],
    ["responsibility", "مسؤولية", "/rɪˌspɒnsəˈbɪləti/", "اسم"],
    ["environment", "بيئة", "/ɪnˈvaɪrənmənt/", "اسم"],
    ["society", "مجتمع", "/səˈsaɪəti/", "اسم"],
    ["culture", "ثقافة", "/ˈkʌltʃə/", "اسم"],
    ["media", "إعلام", "/ˈmiːdiə/", "اسم"],
    ["average", "متوسط", "/ˈævərɪdʒ/", "صفة/اسم"],
    ["recent", "حديث", "/ˈriːsnt/", "صفة"],
    ["likely", "محتمل", "/ˈlaɪkli/", "صفة"],
    ["depend", "يعتمد", "/dɪˈpend/", "فعل"],
    ["prevent", "يمنع", "/prɪˈvent/", "فعل"],
    ["provide", "يوفر", "/prəˈvaɪd/", "فعل"],
    ],
    B2: [
    ["analysis", "تحليل", "/əˈnæləsɪs/", "اسم"],
    ["approach", "نهج", "/əˈprəʊtʃ/", "اسم"],
    ["benefit", "فائدة", "/ˈbenɪfɪt/", "اسم/فعل"],
    ["challenge", "تحدٍّ", "/ˈtʃælɪndʒ/", "اسم"],
    ["consequence", "نتيجة/تبعة", "/ˈkɒnsɪkwəns/", "اسم"],
    ["context", "سياق", "/ˈkɒntekst/", "اسم"],
    ["factor", "عامل", "/ˈfæktə/", "اسم"],
    ["impact", "أثر", "/ˈɪmpækt/", "اسم"],
    ["issue", "مسألة/قضية", "/ˈɪʃuː/", "اسم"],
    ["range", "نطاق/مدى", "/reɪndʒ/", "اسم"],
    ["relevant", "ذو صلة", "/ˈreləvənt/", "صفة"],
    ["significant", "مهم/دال", "/sɪɡˈnɪfɪkənt/", "صفة"],
    ["assume", "يفترض", "/əˈsjuːm/", "فعل"],
    ["estimate", "يقدّر", "/ˈestɪmeɪt/", "فعل"],
    ["maintain", "يحافظ على/يؤكد", "/meɪnˈteɪn/", "فعل"],
    ["obtain", "يحصل على", "/əbˈteɪn/", "فعل"],
    ["require", "يتطلب", "/rɪˈkwaɪə/", "فعل"],
    ["tend", "يميل إلى", "/tend/", "فعل"],
    ],
    C1: [
    ["ambiguous", "غامض/ملتبس", "/æmˈbɪɡjuəs/", "صفة"],
    ["coherent", "متماسك", "/kəʊˈhɪərənt/", "صفة"],
    ["comprehensive", "شامل", "/ˌkɒmprɪˈhensɪv/", "صفة"],
    ["crucial", "حاسم", "/ˈkruːʃl/", "صفة"],
    ["implicit", "ضمني", "/ɪmˈplɪsɪt/", "صفة"],
    ["inevitable", "حتمي", "/ɪnˈevɪtəbl/", "صفة"],
    ["integrate", "يدمج", "/ˈɪntɪɡreɪt/", "فعل"],
    ["interpret", "يفسّر", "/ɪnˈtɜːprɪt/", "فعل"],
    ["justify", "يبرّر", "/ˈdʒʌstɪfaɪ/", "فعل"],
    ["perceive", "يدرك/يرى", "/pəˈsiːv/", "فعل"],
    ["persistent", "مستمر/عنيد", "/pəˈsɪstənt/", "صفة"],
    ["preliminary", "أولي/تمهيدي", "/prɪˈlɪmɪnəri/", "صفة"],
    ["profound", "عميق", "/prəˈfaʊnd/", "صفة"],
    ["reluctant", "متردد", "/rɪˈlʌktənt/", "صفة"],
    ["substantial", "جوهري/كبير", "/səbˈstænʃl/", "صفة"],
    ["undermine", "يقوّض", "/ˌʌndəˈmaɪn/", "فعل"],
    ["viable", "قابل للتطبيق", "/ˈvaɪəbl/", "صفة"],
    ["whereas", "بينما/في حين", "/weərˈæz/", "رابط"],
    ],
    C2: [
    ["advocate", "يدافع عن/يناصر", "/ˈædvəkeɪt/", "فعل"],
    ["arbitrary", "تعسفي/اعتباطي", "/ˈɑːbɪtrəri/", "صفة"],
    ["compelling", "مقنع/آسر", "/kəmˈpelɪŋ/", "صفة"],
    ["contentious", "مثير للجدل", "/kənˈtenʃəs/", "صفة"],
    ["discrepancy", "تباين/تفاوت", "/dɪsˈkrepənsi/", "اسم"],
    ["empirical", "تجريبي/قائم على الملاحظة", "/ɪmˈpɪrɪkl/", "صفة"],
    ["inherent", "متأصل/ملازم", "/ɪnˈhɪərənt/", "صفة"],
    ["paradox", "مفارقة", "/ˈpærədɒks/", "اسم"],
    ["scrutiny", "تدقيق/فحص دقيق", "/ˈskruːtəni/", "اسم"],
    ["tentative", "مبدئي/حذر", "/ˈtentətɪv/", "صفة"],
    ["sustain", "يحافظ على/يدعم", "/səˈsteɪn/", "فعل"],
    ["transcend", "يتجاوز", "/trænˈsend/", "فعل"],
    ["validate", "يتحقق من صحة", "/ˈvælɪdeɪt/", "فعل"],
    ["yield", "ينتج/يسفر عن", "/jiːld/", "فعل"],
    ["arguably", "يمكن القول إن", "/ˈɑːɡjuəbli/", "ظرف"],
    ["notwithstanding", "بالرغم من", "/ˌnɒtwɪθˈstændɪŋ/", "حرف جر"],
    ["albeit", "وإن كان", "/ɔːlˈbiːɪt/", "رابط"],
    ["hence", "من ثم/لذلك", "/hens/", "ظرف"]
    ]
    };
    var out = [];
    Object.keys(groups).forEach(function (lvl) {
      groups[lvl].forEach(function (v) {
        out.push([v[0], v[1], v[2], v[3], lvl]);
      });
    });
    return out;
  })();

  /* ---------------------- اختبار تحديد المستوى ---------------------- */
  var placement = [
    { lvl: "A1", q: "She ___ a doctor.", o: ["is", "are", "am", "be"], a: 0 },
    { lvl: "A1", q: "I ___ two brothers.", o: ["have", "has", "am", "is"], a: 0 },
    { lvl: "A1", q: "___ you like tea?", o: ["Do", "Does", "Are", "Is"], a: 0 },
    { lvl: "A2", q: "This bag is ___ than that one.", o: ["more expensive", "expensiver", "most expensive", "expensive"], a: 0 },
    { lvl: "A2", q: "We ___ to Cairo last year.", o: ["went", "go", "gone", "goed"], a: 0 },
    { lvl: "A2", q: "Did you ___ the tickets?", o: ["buy", "bought", "buying", "buys"], a: 0 },
    { lvl: "B1", q: "I ___ here since 2020.", o: ["have lived", "live", "lived", "am living"], a: 0 },
    { lvl: "B1", q: "The app ___ by millions.", o: ["is used", "uses", "using", "used"], a: 0 },
    { lvl: "B1", q: "If it rains, we ___ at home.", o: ["will stay", "stayed", "would stay", "stay will"], a: 0 },
    { lvl: "B2", q: "If I ___ you, I would ask for a discount.", o: ["were", "was", "am", "be"], a: 0 },
    { lvl: "B2", q: "He said he ___ busy.", o: ["was", "is", "be", "were"], a: 0 },
    { lvl: "B2", q: "Inflation, ___ reached 20%, hit savings.", o: ["which", "that", "who", "whose"], a: 0 },
    { lvl: "C1", q: "___ we known the terms, we would have declined.", o: ["Had", "If", "Have", "Were"], a: 0 },
    { lvl: "C1", q: "Rarely ___ a novel captured exile so precisely.", o: ["has", "have", "does", "is"], a: 0 },
    { lvl: "C1", q: "The findings ___ to support the hypothesis.", o: ["appear", "appears", "appearing", "appeared to be"], a: 0 },
    { lvl: "C2", q: "___ the bill fail, the minister will resign.", o: ["Should", "If", "Would", "Were"], a: 0 },
    { lvl: "C2", q: "They ___ known the risk.", o: ["must have", "must", "had to", "should"], a: 0 },
    { lvl: "C2", q: "“Some agreed; others ___.”", o: ["didn't", "did not agreed", "not", "were not"], a: 0 }
  ];

  /* ---------------------- أصوات العربية ← الإنجليزية ---------------------- */
  var sounds = [
    {
      id: "s-pb",
      title: "/p/ مقابل /b/",
      why: "العربية لا تعرف /p/، فيُلفظ pen كـben. الفرق يغيّر المعنى تماماً.",
      pairs: [["pen", "ben"], ["cap", "cab"], ["pack", "back"], ["pray", "bray"]],
      tip: "ضع ورقة أمام فمك: مع /p/ تتحرك بقوة. /p/ مهموس، /b/ مجهور."
    },
    {
      id: "s-vf",
      title: "/v/ مقابل /f/",
      why: "كثير من اللهجات لا تملك /v/، فتصبح very مثل ferry وsave مثل safe.",
      pairs: [["very", "ferry"], ["save", "safe"], ["vine", "fine"], ["leave", "leaf"]],
      tip: "/v/ صوت مجهور: اهتزاز في الحلق. /f/ مهموس بلا اهتزاز."
    },
    {
      id: "s-th",
      title: "/θ/ و /ð/",
      why: "أصوات «th» تُستبدل غالباً بـ/s/ أو /z/ أو /t/ و/d/.",
      pairs: [["think", "sink"], ["three", "tree"], ["they", "day"], ["breathe", "breed"]],
      tip: "أخرج طرف اللسان بين الأسنان قليلاً. /θ/ مهموس (think)، /ð/ مجهور (they)."
    },
    {
      id: "s-ee",
      title: "/ɪ/ مقابل /iː/",
      why: "الخلط بين القصير والطويل يغيّر الكلمة: ship/sheep، live/leave.",
      pairs: [["ship", "sheep"], ["live", "leave"], ["fit", "feet"], ["sit", "seat"]],
      tip: "القصير /ɪ/ مرتخٍ وقصير. الطويل /iː/ مشدود وأطول بوضوح."
    },
    {
      id: "s-ae",
      title: "/æ/ مقابل /e/",
      why: "الفتحة الواسعة /æ/ غير موجودة في العربية، فتُلفظ bad مثل bed.",
      pairs: [["bad", "bed"], ["man", "men"], ["sat", "set"], ["ran", "wren"]],
      tip: "افتح الفم أوسع وأخفِ الصوت في /æ/؛ /e/ أقرب إلى «إِ» المصرية القصيرة."
    },
    {
      id: "s-cluster",
      title: "تجمعات الحروف الساكنة",
      why: "العربية تفصل السواكن بإدخال حركة، فتصبح street «إستريت».",
      pairs: [["street", "sit-rit"], ["asked", "ask-id"], ["texts", "tek-sits"], ["splash", "siplash"]],
      tip: "لا تُدخل حركة بين السواكن. ابدأ بطيئاً ثم سرّع: s-t-r-eet."
    },
    {
      id: "s-ng",
      title: "/ŋ/ مقابل /n/",
      why: "نهاية -ing تُلفظ أحياناً «إن» بدل الصوت الأنفي الحلقي.",
      pairs: [["sing", "sin"], ["thing", "thin"], ["wing", "win"], ["long", "lawn"]],
      tip: "أخرِج الصوت من أنفك دون لمس سقف الفم بطرف اللسان (ng)."
    },
    {
      id: "s-stress",
      title: "النبر (Stress)",
      why: "النبر الخاطئ يربك المستمع أكثر من لفظ الصوت نفسه.",
      pairs: [["REcord (اسم)", "reCORD (فعل)"], ["PREsent (اسم)", "preSENT (فعل)"], ["EXport (اسم)", "exPORT (فعل)"], ["CONtent (اسم)", "conTENT (رضا)"]],
      tip: "في الإنجليزية مقطع واحد أقوى وأطول. اضغط عليه ولا تُساوِ بين المقاطع."
    }
  ];

  /* ---------------------- الشارات ---------------------- */
  var badges = [
    { id: "first-step", name: "الخطوة الأولى", desc: "أكملت أول تمرين.", icon: "footprints" },
    { id: "streak-3", name: "ثلاثة أيام", desc: "٣ أيام متتالية.", icon: "flame" },
    { id: "streak-7", name: "أسبوع كامل", desc: "٧ أيام متتالية.", icon: "flame" },
    { id: "streak-30", name: "شهر بلا انقطاع", desc: "٣٠ يوماً متتالياً.", icon: "trophy" },
    { id: "words-25", name: "٢٥ كلمة", desc: "٢٥ كلمة في ذاكرتك.", icon: "book" },
    { id: "words-100", name: "مئة كلمة", desc: "١٠٠ كلمة في ذاكرتك.", icon: "book" },
    { id: "unit-1", name: "أول وحدة", desc: "أكملت وحدة كاملة.", icon: "check" },
    { id: "level-a2", name: "تجاوزت A1", desc: "أكملت كل وحدات A1.", icon: "ladder" },
    { id: "level-b1", name: "تجاوزت A2", desc: "أكملت كل وحدات A2.", icon: "ladder" },
    { id: "level-b2", name: "تجاوزت B1", desc: "أكملت كل وحدات B1.", icon: "ladder" },
    { id: "level-c1", name: "تجاوزت B2", desc: "أكملت كل وحدات B2.", icon: "ladder" },
    { id: "level-c2", name: "تجاوزت C1", desc: "أكملت كل وحدات C1.", icon: "ladder" },
    { id: "writing-5", name: "كاتب", desc: "٥ مهام كتابة.", icon: "pen" },
    { id: "speaking-5", name: "متحدث", desc: "٥ تسجيلات صوتية.", icon: "mic" },
    { id: "review-50", name: "مراجع مثابر", desc: "٥٠ مراجعة صحيحة.", icon: "repeat" }
  ];

  window.SULLAM = {
    version: 1,
    levels: levels,
    units: units,
    vocab: vocab,
    placement: placement,
    sounds: sounds,
    badges: badges,
    dailyTarget: 60,
    /* أوصاف CEFR العامة — مصدرها إطار CEFR (مجلس أوروبا) */
    sources: [
      { name: "Council of Europe — CEFR", url: "https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions", note: "المستويات الستة وأوصاف القدرة (can-do)." },
      { name: "Cambridge English — CEFR", url: "https://www.cambridgeenglish.org/exams-and-tests/cefr/", note: "سلم المستويات وربط الامتحانات." },
      { name: "Cambridge English — Guided learning hours", url: "https://www.cambridgeenglish.org/images/126011-using-cefr-principles-of-good-practice.pdf", note: "الساعات الموجّهة لكل مستوى (تقديرية)." },
      { name: "IELTS — CEFR mapping", url: "https://www.ielts.org/about-ielts/ielts-in-cefr-scale", note: "ربط درجات IELTS بالمستويات؛ الربط الرسمي يغطي B1–C1." }
    ]
  };
})();
