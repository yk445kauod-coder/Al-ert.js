

```markdown
# Al-Ert.js - مكتبة التنبيهات المتطورة | Advanced Alert Library

**النسخة: 4.1.0 | Version: 4.1.0**  
**المطور: يوسف خميس | Developer: Yusuf Khamees**  
**الترخيص: MIT | License: MIT**

## الوصف | Description
Al-Ert.js هي مكتبة جافاسكريبت لإنشاء نوافذ حوارية متقدمة، إشعارات، وتلميحات مع دعم متعدد اللغات. توفر بديلاً حديثاً لنوافذ المتصفح الافتراضية مع إمكانيات تخصيص عالية.

Al-Ert.js is a JavaScript library for creating advanced dialogs, notifications, and tooltips with multilingual support. It provides a modern alternative to browser's default dialogs with high customization capabilities.

## المميزات | Features
- دعم متعدد اللغات (13 لغة) مع اتجاه RTL تلقائي | Multilingual support (13 languages) with automatic RTL detection
- أنواع مختلفة من التنبيهات: حوارية، إدخال، تأكيد، إشعارات، وتلميحات | Different alert types: dialog, input, confirmation, toast, and tooltip
- تأثيرات بصرية فريدة وفريدة من نوعها | Unique and creative visual effects
- واجهة مستخدم سريعة الاستجابة | Responsive user interface
- واجهة برمجية قائمة على الوعود (Promise-based API) | Promise-based API
- تصميم مظلم/فاتح | Dark/light theme
- دعم الأيقونات (FontAwesome أو إيموجي) | Icon support (FontAwesome or emoji)
- مؤقت زمني مع شريط تقدم | Timer with progress bar
- إمكانية التخصيص الكاملة | Full customization capabilities

## التأثيرات البصرية | Visual Effects
- تأثير التمرير (Hover) | Hover effect
- تأثير البكسل (Pixelated) | Pixelated effect
- تأثير ثلاثي الأبعاد (3D) | 3D effect
- تأثير نيو مورفيك (Neomorphic) | Neomorphic effect
- تأثير وحدة التحكم (Console) | Console effect
- تأثير ألعاب (Game) | Game effect
- تأثير المطبخ (Kitchen) | Kitchen effect
- تأثير فضائي (Alien) | Alien effect
- تأثير شوكة (Fork) | Fork effect
- تأثير وهمي (Dummy) | Dummy effect

## التثبيت | Installation
```html
<script src="https://cdn.example.com/al-ert.min.js"></script>
```

## الاستخدام | Usage
### تنبيه بسيط | Simple Alert
```javascript
alErt.fire({
  title: 'مرحباً بالعالم',
  text: 'هذا تنبيه بسيط'
});

alErt.fire({
  title: 'Hello World',
  text: 'This is a simple alert'
});
```

### تنبيه نجاح | Success Alert
```javascript
alErt.success('تمت العملية بنجاح', 'تم حفظ التغييرات');
alErt.success('Operation Successful', 'Changes have been saved');
```

### حوار تأكيد | Confirmation Dialog
```javascript
alErt.question('هل أنت متأكد؟', 'لا يمكن التراجع عن هذا الإجراء')
  .then((result) => {
    if (result === 'confirm') {
      // المستخدم أكد | User confirmed
    }
  });

alErt.question('Are you sure?', 'This action cannot be undone')
  .then((result) => {
    if (result === 'confirm') {
      // User confirmed
    }
  });
```

### إشعار منبثق | Toast Notification
```javascript
alErt.toast({
  title: 'إشعار',
  text: 'حدث شيء ما',
  icon: 'info'
});

alErt.toast({
  title: 'Notification',
  text: 'Something happened',
  icon: 'info'
});
```

### حوار إدخال | Input Dialog
```javascript
alErt.input({
  title: 'أدخل بريدك الإلكتروني',
  inputPlaceholder: 'example@email.com',
  inputValidator: (value) => {
    if (!value) return 'البريد الإلكتروني مطلوب';
    if (!/^\S+@\S+\.\S+$/.test(value)) return 'صيغة البريد الإلكتروني غير صحيحة';
  }
});

alErt.input({
  title: 'Enter your email',
  inputPlaceholder: 'example@email.com',
  inputValidator: (value) => {
    if (!value) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email format';
  }
});
```

### تأثيرات خاصة | Special Effects
```javascript
alErt.alien('تحياتي أيها البشري', 'خذني إلى قائدك!');
alErt.alien('Greetings Earthling', 'Take me to your leader!');
```

## التوافق | Compatibility
- متصفحات حديثة تدعم ES6+ | Modern browsers supporting ES6+
- تصميم متجاوب يعمل على الأجهزة المحمولة | Responsive design that works on mobile devices

## الترخيص | License
MIT
```
