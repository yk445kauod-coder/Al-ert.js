// التنبيهات الرئيسية
allErt.success('تم بنجاح!', 'تم حفظ التغييرات بنجاح');

// Toasts
allErt.toast({
    title: 'تم الحفظ',
    text: 'تم حفظ التغييرات في قاعدة البيانات',
    icon: 'success',
    duration: 3000
});

// Tips
const button = document.querySelector('#myButton');
allErt.tip(button, 'انقر هنا للحفظ', { position: 'top' });

// Progress Bar
const progress = allErt.progressBar({
    value: 0,
    max: 100,
    showText: true
});

// تحديث شريط التقدم
let value = 0;
const interval = setInterval(() => {
    value += 10;
    progress.update(value);
    
    if (value >= 100) {
        clearInterval(interval);
        progress.complete();
    }
}, 500);

// Spinner
const spinner = allErt.spinner({
    size: 'large',
    text: 'جاري التحميل...'
});

// إظهار/إخفاء الـ spinner
spinner.show();
setTimeout(() => spinner.hide(), 3000);

// Desktop Notification
allErt.desktop('رسالة جديدة', 'لديك رسالة جديدة من النظام', {
    icon: 'success',
    onClick: () => {
        console.log('تم النقر على الإشعار');
    }
});

// تدمير جميع المكونات
// allErt.destroyAll();