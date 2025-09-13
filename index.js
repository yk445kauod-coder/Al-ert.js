/**
 * Al-ert.js - مكتبة التنبيهات المتطورة مع دعم لغات متعددة
 * نسخة: 4.1.0
 * المطور: يوسف خميس
 * الترخيص: MIT
 */

class AlErt {
    constructor() {
        this.defaultOptions = {
            title: '',
            text: '',
            icon: 'info',
            iconAnimation: true,
            iconLibrary: 'fontawesome',
            iconColor: {
                success: '#10b981',
                error: '#ef4444',
                warning: '#f59e0b',
                info: '#3b82f6',
                question: '#8b5cf6'
            },
            buttons: {
                confirm: {
                    text: 'موافق',
                    visible: true,
                    className: '',
                    closeModal: true,
                    style: ''
                },
                cancel: {
                    text: 'إلغاء',
                    visible: false,
                    className: '',
                    closeModal: true,
                    style: ''
                }
            },
            input: false,
            inputValue: '',
            inputPlaceholder: '',
            inputValidator: null,
            inputType: 'text',
            showCloseButton: true,
            showLoaderOnConfirm: false,
            timer: null,
            timerProgressBar: false,
            customClass: '',
            allowOutsideClick: false,
            allowEscapeKey: true,
            rtl: true,
            animation: 'fadeIn',
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'center',
            width: '500px',
            padding: '24px',
            borderRadius: '12px',
            zIndex: 9999,
            backdropFilter: 'blur(5px)',
            theme: 'light',
            effect: 'default',
            smartIndicator: true,
            language: 'ar' // ar, en, es, fr, de, zh, ja, ko, ru, pt, it, nl, tr
        };
        
        // Language translations
        this.translations = {
            ar: {
                buttons: {
                    confirm: 'موافق',
                    cancel: 'إلغاء',
                    yes: 'نعم',
                    no: 'لا',
                    ok: 'حسناً'
                },
                placeholders: {
                    input: 'اكتب هنا...'
                },
                validation: {
                    required: 'هذا الحقل مطلوب',
                    email: 'البريد الإلكتروني غير صالح',
                    number: 'الرجاء إدخال رقم'
                }
            },
            en: {
                buttons: {
                    confirm: 'Confirm',
                    cancel: 'Cancel',
                    yes: 'Yes',
                    no: 'No',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'Type here...'
                },
                validation: {
                    required: 'This field is required',
                    email: 'Invalid email address',
                    number: 'Please enter a number'
                }
            },
            es: {
                buttons: {
                    confirm: 'Confirmar',
                    cancel: 'Cancelar',
                    yes: 'Sí',
                    no: 'No',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'Escriba aquí...'
                },
                validation: {
                    required: 'Este campo es obligatorio',
                    email: 'Dirección de correo electrónico inválida',
                    number: 'Por favor ingrese un número'
                }
            },
            fr: {
                buttons: {
                    confirm: 'Confirmer',
                    cancel: 'Annuler',
                    yes: 'Oui',
                    no: 'Non',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'Écrivez ici...'
                },
                validation: {
                    required: 'Ce champ est obligatoire',
                    email: 'Adresse e-mail invalide',
                    number: 'Veuillez entrer un nombre'
                }
            },
            de: {
                buttons: {
                    confirm: 'Bestätigen',
                    cancel: 'Abbrechen',
                    yes: 'Ja',
                    no: 'Nein',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'Hier eingeben...'
                },
                validation: {
                    required: 'Dieses Feld ist erforderlich',
                    email: 'Ungültige E-Mail-Adresse',
                    number: 'Bitte geben Sie eine Zahl ein'
                }
            },
            zh: {
                buttons: {
                    confirm: '确认',
                    cancel: '取消',
                    yes: '是',
                    no: '否',
                    ok: '确定'
                },
                placeholders: {
                    input: '在这里输入...'
                },
                validation: {
                    required: '此字段为必填项',
                    email: '无效的电子邮件地址',
                    number: '请输入数字'
                }
            },
            ja: {
                buttons: {
                    confirm: '確認',
                    cancel: 'キャンセル',
                    yes: 'はい',
                    no: 'いいえ',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'ここに入力...'
                },
                validation: {
                    required: 'このフィールドは必須です',
                    email: '無効なメールアドレス',
                    number: '数字を入力してください'
                }
            },
            ko: {
                buttons: {
                    confirm: '확인',
                    cancel: '취소',
                    yes: '예',
                    no: '아니오',
                    ok: '확인'
                },
                placeholders: {
                    input: '여기에 입력...'
                },
                validation: {
                    required: '이 필드는 필수입니다',
                    email: '잘못된 이메일 주소',
                    number: '숫자를 입력하세요'
                }
            },
            ru: {
                buttons: {
                    confirm: 'Подтвердить',
                    cancel: 'Отмена',
                    yes: 'Да',
                    no: 'Нет',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'Введите здесь...'
                },
                validation: {
                    required: 'Это поле обязательно',
                    email: 'Неверный адрес электронной почты',
                    number: 'Пожалуйста, введите число'
                }
            },
            pt: {
                buttons: {
                    confirm: 'Confirmar',
                    cancel: 'Cancelar',
                    yes: 'Sim',
                    no: 'Não',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'Digite aqui...'
                },
                validation: {
                    required: 'Este campo é obrigatório',
                    email: 'Endereço de e-mail inválido',
                    number: 'Por favor, digite um número'
                }
            },
            it: {
                buttons: {
                    confirm: 'Conferma',
                    cancel: 'Annulla',
                    yes: 'Sì',
                    no: 'No',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'Digita qui...'
                },
                validation: {
                    required: 'Questo campo è obbligatorio',
                    email: 'Indirizzo email non valido',
                    number: 'Inserisci un numero'
                }
            },
            nl: {
                buttons: {
                    confirm: 'Bevestigen',
                    cancel: 'Annuleren',
                    yes: 'Ja',
                    no: 'Nee',
                    ok: 'OK'
                },
                placeholders: {
                    input: 'Typ hier...'
                },
                validation: {
                    required: 'Dit veld is verplicht',
                    email: 'Ongeldig e-mailadres',
                    number: 'Voer een nummer in'
                }
            },
            tr: {
                buttons: {
                    confirm: 'Onayla',
                    cancel: 'İptal',
                    yes: 'Evet',
                    no: 'Hayır',
                    ok: 'Tamam'
                },
                placeholders: {
                    input: 'Buraya yazın...'
                },
                validation: {
                    required: 'Bu alan zorunludur',
                    email: 'Geçersiz e-posta adresi',
                    number: 'Lütfen bir sayı girin'
                }
            }
        };
        
        this.currentOptions = {};
        this.timerInterval = null;
        this.promiseResolve = null;
        this.components = {
            alerts: [],
            toasts: [],
            tips: [],
            progressBars: [],
            spinners: []
        };
        
        this.init();
    }
    
    init() {
        this.injectStyles();
        this.createContainer();
    }
    
    injectStyles() {
        if (document.getElementById('al-ert-styles')) return;
        
        const styles = `
            #al-ert-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
            }
            
            .al-ert-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(5px);
                pointer-events: all;
            }
            
            .al-ert-overlay.show {
                opacity: 1;
            }
            
            .al-ert {
                background: white;
                border-radius: 12px;
                padding: 24px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transform: scale(0.8);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                position: relative;
                direction: rtl;
                text-align: right;
                border: 1px solid rgba(255, 255, 255, 0.2);
                pointer-events: all;
            }
            
            .al-ert.ltr {
                direction: ltr;
                text-align: left;
            }
            
            .al-ert.show {
                transform: scale(1);
                opacity: 1;
            }
            
            .al-ert.dark {
                background: #1f2937;
                color: #f9fafb;
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .al-ert-icon {
                font-size: 64px;
                margin-bottom: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 80px;
            }
            
            .al-ert-icon i {
                transition: all 0.3s;
            }
            
            .al-ert-icon.animated i {
                animation: al-ert-icon-bounce 1s ease infinite alternate;
            }
            
            @keyframes al-ert-icon-bounce {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
            }
            
            .al-ert-title {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 16px;
                color: #1f2937;
                line-height: 1.3;
            }
            
            .al-ert.dark .al-ert-title {
                color: #f9fafb;
            }
            
            .al-ert-text {
                font-size: 18px;
                color: #4b5563;
                margin-bottom: 30px;
                line-height: 1.6;
            }
            
            .al-ert.dark .al-ert-text {
                color: #d1d5db;
            }
            
            .al-ert-input {
                width: 100%;
                padding: 16px;
                border: 2px solid #e5e7eb;
                border-radius: 10px;
                font-size: 16px;
                margin-bottom: 30px;
                outline: none;
                transition: all 0.3s;
                background: rgba(255, 255, 255, 0.9);
            }
            
            .al-ert-input:focus {
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
            }
            
            .al-ert.dark .al-ert-input {
                background: rgba(31, 41, 55, 0.9);
                border-color: #4b5563;
                color: #f9fafb;
            }
            
            .al-ert-buttons {
                display: flex;
                gap: 16px;
                justify-content: flex-end;
                flex-wrap: wrap;
            }
            
            .al-ert-button {
                padding: 14px 28px;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                outline: none;
                position: relative;
                overflow: hidden;
                min-width: 120px;
            }
            
            .al-ert-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            }
            
            .al-ert-button.confirm {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                color: white;
            }
            
            .al-ert-button.cancel {
                background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
                color: #374151;
            }
            
            .al-ert-timer-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 6px;
                background: linear-gradient(90deg, #3b82f6, #60a5fa);
                border-radius: 0 0 12px 12px;
                transition: width linear;
                box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
            }
            
            .al-ert-toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            }
            
            .al-ert-toast {
                background: white;
                border-radius: 10px;
                padding: 16px 20px;
                margin-bottom: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 15px;
                min-width: 300px;
                max-width: 500px;
                transform: translateX(400px);
                transition: all 0.3s ease;
                pointer-events: all;
                position: relative;
                overflow: hidden;
            }
            
            .al-ert-toast.show {
                transform: translateX(0);
            }
            
            .al-ert-toast.dark {
                background: #1f2937;
                color: #f9fafb;
            }
            
            .al-ert-toast-icon {
                font-size: 24px;
                flex-shrink: 0;
            }
            
            .al-ert-toast-content {
                flex: 1;
            }
            
            .al-ert-toast-title {
                font-weight: bold;
                margin-bottom: 4px;
            }
            
            .al-ert-toast-text {
                font-size: 14px;
                opacity: 0.8;
            }
            
            .al-ert-tip {
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 10001;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.2s;
                white-space: nowrap;
                max-width: 300px;
                word-wrap: break-word;
            }
            
            .al-ert-tip.show {
                opacity: 1;
            }
            
            .al-ert-tip::before {
                content: '';
                position: absolute;
                border: 6px solid transparent;
            }
            
            .al-ert-tip.top::before {
                bottom: -12px;
                left: 50%;
                transform: translateX(-50%);
                border-top-color: #1f2937;
            }
            
            .al-ert-tip.bottom::before {
                top: -12px;
                left: 50%;
                transform: translateX(-50%);
                border-bottom-color: #1f2937;
            }
            
            .al-ert-tip.left::before {
                right: -12px;
                top: 50%;
                transform: translateY(-50%);
                border-left-color: #1f2937;
            }
            
            .al-ert-tip.right::before {
                left: -12px;
                top: 50%;
                transform: translateY(-50%);
                border-right-color: #1f2937;
            }
            
            /* Effects Styles */
            .al-ert.effect-hover {
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .al-ert.effect-hover:hover {
                transform: translateY(-10px) scale(1.02);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            }
            
            .al-ert.effect-pixelated {
                image-rendering: pixelated;
                image-rendering: -moz-crisp-edges;
                image-rendering: crisp-edges;
                font-family: 'Courier New', monospace;
                border: 4px solid #000;
                box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.8);
            }
            
            .al-ert.effect-3d {
                transform-style: preserve-3d;
                perspective: 1000px;
            }
            
            .al-ert.effect-3d .al-ert-content {
                transform: rotateY(0deg);
                transition: transform 0.6s;
            }
            
            .al-ert.effect-3d:hover .al-ert-content {
                transform: rotateY(10deg);
            }
            
            .al-ert.effect-neo {
                background: linear-gradient(145deg, #e6e6e6, #ffffff);
                box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
                border: none;
            }
            
            .al-ert.effect-neo.dark {
                background: linear-gradient(145deg, #2d2d2d, #4a4a4a);
                box-shadow: 20px 20px 60px #1a1a1a, -20px -20px 60px #5a5a5a;
            }
            
            .al-ert.effect-console {
                background: #1e1e1e;
                color: #00ff00;
                font-family: 'Courier New', monospace;
                border: 2px solid #333;
                border-radius: 0;
            }
            
            .al-ert.effect-console .al-ert-title {
                color: #00ff00;
                font-family: 'Courier New', monospace;
            }
            
            .al-ert.effect-console .al-ert-text {
                color: #ffffff;
                font-family: 'Courier New', monospace;
            }
            
            .al-ert.effect-game {
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
                font-family: 'Press Start 2P', cursive;
                font-size: 14px;
                border: 4px solid #fff;
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
            }
            
            .al-ert.effect-kitchen {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                border-radius: 50px;
                position: relative;
                overflow: hidden;
            }
            
            .al-ert.effect-kitchen::before {
                content: '🍳';
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 24px;
            }
            
            .al-ert.effect-alien {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #00ff00;
                font-family: 'Orbitron', monospace;
                border: 2px solid #00ff00;
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
                position: relative;
                overflow: hidden;
            }
            
            .al-ert.effect-alien::before {
                content: '👽';
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 24px;
                animation: alien-float 2s ease-in-out infinite;
            }
            
            @keyframes alien-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            .al-ert.effect-fork {
                background: linear-gradient(135deg, #24292e, #586069);
                color: white;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                border: 1px solid #0366d6;
            }
            
            .al-ert.effect-fork::before {
                content: '🍴';
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 24px;
            }
            
            .al-ert.effect-dummy {
                background: linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%);
                color: #333;
                font-family: 'Comic Sans MS', cursive;
                border: 3px dashed #ff6b6b;
                border-radius: 20px;
                position: relative;
            }
            
            .al-ert.effect-dummy::before {
                content: '🤪';
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 24px;
                animation: dummy-wiggle 1s ease-in-out infinite;
            }
            
            @keyframes dummy-wiggle {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(10deg); }
                75% { transform: rotate(-10deg); }
            }
            
            @media (max-width: 768px) {
                .al-ert {
                    width: 95% !important;
                    margin: 10px;
                }
                
                .al-ert-toast-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                }
                
                .al-ert-toast {
                    min-width: auto;
                }
                
                .al-ert-tip {
                    max-width: 200px;
                    font-size: 12px;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'al-ert-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    createContainer() {
        if (!document.getElementById('al-ert-container')) {
            const container = document.createElement('div');
            container.id = 'al-ert-container';
            document.body.appendChild(container);
        }
    }
    
    // Get translation for current language
    getTranslation(key, subKey = null) {
        const lang = this.currentOptions.language || 'ar';
        if (this.translations[lang] && this.translations[lang][key]) {
            return subKey ? this.translations[lang][key][subKey] : this.translations[lang][key];
        }
        // Fallback to Arabic
        return subKey ? this.translations.ar[key][subKey] : this.translations.ar[key];
    }
    
    // Set language
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentOptions.language = lang;
            return true;
        }
        return false;
    }
    
    fire(options = {}) {
        return new Promise((resolve) => {
            this.promiseResolve = resolve;
            this.currentOptions = { ...this.defaultOptions, ...options };
            
            // Auto-detect RTL for some languages
            const rtlLanguages = ['ar', 'fa', 'he'];
            if (!options.rtl && rtlLanguages.includes(this.currentOptions.language)) {
                this.currentOptions.rtl = true;
            } else if (options.rtl === undefined && !rtlLanguages.includes(this.currentOptions.language)) {
                this.currentOptions.rtl = false;
            }
            
            this.renderAlert();
            this.showAlert();
        });
    }
    
    renderAlert() {
        const overlay = document.getElementById('al-ert-overlay') || this.createAlertOverlay();
        const alert = overlay.querySelector('.al-ert') || this.createAlert();
        
        // Apply effect class and RTL/LTR
        const effectClass = this.currentOptions.effect ? `effect-${this.currentOptions.effect}` : '';
        const rtlClass = this.currentOptions.rtl ? '' : 'ltr';
        alert.className = `al-ert ${this.currentOptions.customClass || ''} ${rtlClass} ${this.currentOptions.theme === 'dark' ? 'dark' : ''} ${effectClass}`;
        
        overlay.className = `al-ert-overlay position-${this.currentOptions.position}`;
        
        // Icon
        const iconContainer = alert.querySelector('.al-ert-icon');
        if (this.currentOptions.icon) {
            iconContainer.style.display = 'flex';
            iconContainer.innerHTML = this.getIconHTML(this.currentOptions.icon);
            const iconElement = iconContainer.querySelector('i');
            if (iconElement) {
                iconElement.style.color = this.defaultOptions.iconColor[this.currentOptions.icon] || '#3b82f6';
            }
            
            if (this.currentOptions.iconAnimation) {
                iconContainer.classList.add('animated');
            } else {
                iconContainer.classList.remove('animated');
            }
        } else {
            iconContainer.style.display = 'none';
        }
        
        // Title and text
        alert.querySelector('.al-ert-title').textContent = this.currentOptions.title || '';
        alert.querySelector('.al-ert-text').innerHTML = this.currentOptions.text || '';
        
        // Input
        const input = alert.querySelector('.al-ert-input');
        if (this.currentOptions.input) {
            input.style.display = 'block';
            input.value = this.currentOptions.inputValue || '';
            input.placeholder = this.currentOptions.inputPlaceholder || this.getTranslation('placeholders', 'input');
            input.type = this.currentOptions.inputType || 'text';
        } else {
            input.style.display = 'none';
        }
        
        // Buttons - Fixed confirm buttons issue
        const buttonsContainer = alert.querySelector('.al-ert-buttons');
        buttonsContainer.innerHTML = '';
        
        // Create cancel button if visible
        if (this.currentOptions.buttons.cancel.visible) {
            const cancelButton = this.createButton('cancel', {
                ...this.currentOptions.buttons.cancel,
                text: this.currentOptions.buttons.cancel.text || this.getTranslation('buttons', 'cancel')
            });
            buttonsContainer.appendChild(cancelButton);
        }
        
        // Create confirm button
        const confirmButton = this.createButton('confirm', {
            ...this.currentOptions.buttons.confirm,
            text: this.currentOptions.buttons.confirm.text || this.getTranslation('buttons', 'confirm')
        });
        buttonsContainer.appendChild(confirmButton);
        
        // Timer bar
        const timerBar = alert.querySelector('.al-ert-timer-bar');
        if (this.currentOptions.timer && this.currentOptions.timerProgressBar) {
            timerBar.style.display = 'block';
            timerBar.style.width = '100%';
        } else {
            timerBar.style.display = 'none';
        }
    }
    
    createAlertOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'al-ert-overlay';
        overlay.innerHTML = `
            <div class="al-ert">
                <div class="al-ert-icon"></div>
                <h2 class="al-ert-title"></h2>
                <div class="al-ert-text"></div>
                <input type="text" class="al-ert-input">
                <div class="al-ert-buttons"></div>
                <div class="al-ert-timer-bar"></div>
            </div>
        `;
        document.getElementById('al-ert-container').appendChild(overlay);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay && this.currentOptions.allowOutsideClick) {
                this.closeAlert('overlay');
            }
        });
        
        return overlay;
    }
    
    createAlert() {
        const overlay = document.getElementById('al-ert-overlay');
        return overlay.querySelector('.al-ert');
    }
    
    showAlert() {
        const overlay = document.getElementById('al-ert-overlay');
        const alert = overlay.querySelector('.al-ert');
        
        overlay.style.display = 'flex';
        
        setTimeout(() => {
            overlay.classList.add('show');
            alert.classList.add('show');
        }, 10);
        
        if (this.currentOptions.timer) {
            this.startTimer();
        }
        
        if (this.currentOptions.allowEscapeKey) {
            document.addEventListener('keydown', this.handleEscape);
        }
    }
    
    closeAlert(result = null) {
        const overlay = document.getElementById('al-ert-overlay');
        const alert = overlay.querySelector('.al-ert');
        
        overlay.classList.remove('show');
        alert.classList.remove('show');
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        document.removeEventListener('keydown', this.handleEscape);
        
        setTimeout(() => {
            overlay.style.display = 'none';
            if (this.promiseResolve) {
                this.promiseResolve(result);
            }
        }, 300);
    }
    
    toast(options = {}) {
        const toastOptions = {
            title: '',
            text: '',
            icon: 'info',
            duration: 5000,
            theme: 'light',
            effect: 'default',
            close: true,
            ...options
        };
        
        const toast = this.createToast(toastOptions);
        this.showToast(toast);
        
        if (toastOptions.duration > 0) {
            setTimeout(() => {
                this.removeToast(toast);
            }, toastOptions.duration);
        }
        
        return toast;
    }
    
    createToast(options) {
        const container = document.querySelector('.al-ert-toast-container') || this.createToastContainer();
        
        const toast = document.createElement('div');
        const effectClass = options.effect ? `effect-${options.effect}` : '';
        toast.className = `al-ert-toast ${options.theme === 'dark' ? 'dark' : ''} ${effectClass}`;
        
        const iconColor = this.defaultOptions.iconColor[options.icon] || '#3b82f6';
        
        toast.innerHTML = `
            <div class="al-ert-toast-icon" style="color: ${iconColor}">
                ${this.getIconHTML(options.icon)}
            </div>
            <div class="al-ert-toast-content">
                <div class="al-ert-toast-title">${options.title}</div>
                <div class="al-ert-toast-text">${options.text}</div>
            </div>
            ${options.close ? '<button class="al-ert-toast-close">&times;</button>' : ''}
        `;
        
        if (options.close) {
            toast.querySelector('.al-ert-toast-close').addEventListener('click', () => {
                this.removeToast(toast);
            });
        }
        
        container.appendChild(toast);
        this.components.toasts.push(toast);
        
        return toast;
    }
    
    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'al-ert-toast-container';
        document.getElementById('al-ert-container').appendChild(container);
        return container;
    }
    
    showToast(toast) {
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
    }
    
    removeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
            const index = this.components.toasts.indexOf(toast);
            if (index > -1) {
                this.components.toasts.splice(index, 1);
            }
        }, 300);
    }
    
    // Fixed tooltip function
    tip(element, text, options = {}) {
        const tipOptions = {
            position: 'top',
            theme: 'dark',
            effect: 'default',
            ...options
        };
        
        // Remove any existing tips for this element
        this.removeExistingTips(element);
        
        const tip = document.createElement('div');
        const effectClass = tipOptions.effect ? `effect-${tipOptions.effect}` : '';
        tip.className = `al-ert-tip ${tipOptions.position} ${tipOptions.theme === 'light' ? 'light' : ''} ${effectClass}`;
        
        // Set tooltip content
        tip.textContent = text;
        
        // Add to body
        document.body.appendChild(tip);
        this.components.tips.push({ element, tip, options: tipOptions });
        
        // Position tooltip
        this.positionTip(element, tip, tipOptions.position);
        
        // Show tooltip
        setTimeout(() => {
            tip.classList.add('show');
        }, 10);
        
        // Create hide function
        const hideTip = () => {
            tip.classList.remove('show');
            setTimeout(() => {
                tip.remove();
                const index = this.components.tips.findIndex(t => t.tip === tip);
                if (index > -1) {
                    this.components.tips.splice(index, 1);
                }
            }, 200);
        };
        
        // Add event listeners
        const events = ['mouseleave', 'click'];
        events.forEach(event => {
            element.addEventListener(event, hideTip, { once: true });
        });
        
        return tip;
    }
    
    // Remove existing tips for element
    removeExistingTips(element) {
        this.components.tips = this.components.tips.filter(tipData => {
            if (tipData.element === element) {
                tipData.tip.remove();
                return false;
            }
            return true;
        });
    }
    
    positionTip(element, tip, position) {
        const elementRect = element.getBoundingClientRect();
        const tipRect = tip.getBoundingClientRect();
        
        let top, left;
        
        switch (position) {
            case 'top':
                top = elementRect.top - tipRect.height - 10;
                left = elementRect.left + (elementRect.width / 2) - (tipRect.width / 2);
                break;
            case 'bottom':
                top = elementRect.bottom + 10;
                left = elementRect.left + (elementRect.width / 2) - (tipRect.width / 2);
                break;
            case 'left':
                top = elementRect.top + (elementRect.height / 2) - (tipRect.height / 2);
                left = elementRect.left - tipRect.width - 10;
                break;
            case 'right':
                top = elementRect.top + (elementRect.height / 2) - (tipRect.height / 2);
                left = elementRect.right + 10;
                break;
        }
        
        // Ensure tooltip stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (left < 10) left = 10;
        if (left + tipRect.width > viewportWidth - 10) left = viewportWidth - tipRect.width - 10;
        if (top < 10) top = 10;
        if (top + tipRect.height > viewportHeight - 10) top = viewportHeight - tipRect.height - 10;
        
        tip.style.top = `${top}px`;
        tip.style.left = `${left}px`;
    }
    
    getIconHTML(icon = 'info') {
        const icons = {
            fontawesome: {
                success: '<i class="fas fa-check-circle"></i>',
                error: '<i class="fas fa-times-circle"></i>',
                warning: '<i class="fas fa-exclamation-triangle"></i>',
                info: '<i class="fas fa-info-circle"></i>',
                question: '<i class="fas fa-question-circle"></i>'
            },
            emoji: {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ',
                question: '?'
            }
        };
        
        const library = this.currentOptions.iconLibrary || 'fontawesome';
        return icons[library][icon] || icons.fontawesome.info;
    }
    
    createButton(type, options) {
        const button = document.createElement('button');
        button.className = `al-ert-button ${type} ${options.className || ''}`;
        button.textContent = options.text;
        button.style.cssText = options.style || '';
        
        button.addEventListener('click', () => {
            if (type === 'confirm' && this.currentOptions.showLoaderOnConfirm) {
                button.classList.add('loading');
                button.disabled = true;
            }
            
            if (this.currentOptions.input && type === 'confirm') {
                const input = document.querySelector('.al-ert-input');
                const inputValue = input.value;
                
                if (this.currentOptions.inputValidator) {
                    const validationResult = this.currentOptions.inputValidator(inputValue);
                    if (validationResult) {
                        input.style.borderColor = '#ef4444';
                        // Show validation error message
                        const errorMsg = document.createElement('div');
                        errorMsg.style.color = '#ef4444';
                        errorMsg.style.fontSize = '12px';
                        errorMsg.style.marginTop = '5px';
                        errorMsg.textContent = validationResult;
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                        
                        setTimeout(() => {
                            errorMsg.remove();
                        }, 3000);
                        return;
                    }
                }
                
                if (options.closeModal) {
                    this.closeAlert({ value: inputValue });
                }
            } else {
                if (options.closeModal) {
                    this.closeAlert(type);
                }
            }
        });
        
        return button;
    }
    
    startTimer() {
        const timerBar = document.querySelector('.al-ert-timer-bar');
        const duration = this.currentOptions.timer;
        let remaining = duration;
        
        this.timerInterval = setInterval(() => {
            remaining -= 100;
            const progress = (remaining / duration) * 100;
            
            if (this.currentOptions.timerProgressBar) {
                timerBar.style.width = `${progress}%`;
            }
            
            if (remaining <= 0) {
                clearInterval(this.timerInterval);
                this.closeAlert('timer');
            }
        }, 100);
    }
    
    handleEscape = (e) => {
        if (e.key === 'Escape') {
            this.closeAlert('esc');
        }
    };
    
    // Shortcuts with effects
    success(title, text = '', options = {}) {
        return this.fire({ title, text, icon: 'success', ...options });
    }
    
    error(title, text = '', options = {}) {
        return this.fire({ title, text, icon: 'error', ...options });
    }
    
    warning(title, text = '', options = {}) {
        return this.fire({ title, text, icon: 'warning', ...options });
    }
    
    info(title, text = '', options = {}) {
        return this.fire({ title, text, icon: 'info', ...options });
    }
    
    question(title, text = '', options = {}) {
        // Fixed question with proper yes/no buttons
        const lang = options.language || this.currentOptions.language || 'ar';
        const yesText = this.translations[lang]?.buttons?.yes || this.translations.ar.buttons.yes;
        const noText = this.translations[lang]?.buttons?.no || this.translations.ar.buttons.no;
        
        return this.fire({ 
            title, 
            text, 
            icon: 'question',
            buttons: {
                confirm: { text: yesText },
                cancel: { text: noText, visible: true }
            },
            ...options
        });
    }
    
    input(options = {}) {
        return this.fire({
            input: true,
            ...options
        });
    }
    
    // Effect shortcuts
    hover(title, text, options = {}) {
        return this.fire({ title, text, effect: 'hover', ...options });
    }
    
    pixelated(title, text, options = {}) {
        return this.fire({ title, text, effect: 'pixelated', ...options });
    }
    
    threeD(title, text, options = {}) {
        return this.fire({ title, text, effect: '3d', ...options });
    }
    
    neo(title, text, options = {}) {
        return this.fire({ title, text, effect: 'neo', ...options });
    }
    
    console(title, text, options = {}) {
        return this.fire({ title, text, effect: 'console', ...options });
    }
    
    game(title, text, options = {}) {
        return this.fire({ title, text, effect: 'game', ...options });
    }
    
    kitchen(title, text, options = {}) {
        return this.fire({ title, text, effect: 'kitchen', ...options });
    }
    
    alien(title, text, options = {}) {
        return this.fire({ title, text, effect: 'alien', ...options });
    }
    
    fork(title, text, options = {}) {
        return this.fire({ title, text, effect: 'fork', ...options });
    }
    
    dummy(title, text, options = {}) {
        return this.fire({ title, text, effect: 'dummy', ...options });
    }
}

// Create global instance
const alErt = new AlErt();

// Support CommonJS and ES Modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = alErt;
} else if (typeof window !== 'undefined') {
    window.alErt = alErt;
}