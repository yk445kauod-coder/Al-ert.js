/**
 * Al-Ert.js - مكتبة التنبيهات المتطورة
 * نسخة: 5.0.0
 * المطور: يوسف خميس
 * الترخيص: MIT
 * مدمجة مع أفضل مميزات SweetAlert2, Notyf, Toastify
 */
class AlErt {
    constructor() {
        this.version = '5.0.0';
        this.defaultOptions = {
            title: '',
            text: '',
            html: '',
            icon: 'info',
            iconHtml: null,
            iconColor: null,
            imageUrl: null,
            imageWidth: null,
            imageHeight: null,
            imageAlt: '',
            animation: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
                backdrop: 'animate__animated animate__fadeIn'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
                backdrop: 'animate__animated animate__fadeOut'
            },
            customClass: {
                container: '',
                popup: '',
                title: '',
                htmlContainer: '',
                input: '',
                inputLabel: '',
                validationMessage: '',
                actions: '',
                confirmButton: '',
                denyButton: '',
                cancelButton: '',
                loader: '',
                footer: '',
                timerProgressBar: ''
            },
            target: 'body',
            backdrop: true,
            backdropColor: 'rgba(0, 0, 0, 0.4)',
            position: 'center',
            grow: false,
            width: null,
            padding: '1.25rem',
            color: null,
            background: null,
            timer: null,
            timerProgressBar: false,
            heightAuto: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            stopKeydownPropagation: true,
            keydownListenerCapture: false,
            showConfirmButton: true,
            showDenyButton: false,
            showCancelButton: false,
            preConfirm: null,
            preDeny: null,
            confirmButtonText: 'موافق',
            denyButtonText: 'لا',
            cancelButtonText: 'إلغاء',
            confirmButtonColor: '#3085d6',
            denyButtonColor: '#dd3344',
            cancelButtonColor: '#6e7881',
            confirmButtonAriaLabel: '',
            denyButtonAriaLabel: '',
            cancelButtonAriaLabel: '',
            buttonsStyling: true,
            reverseButtons: false,
            focusConfirm: true,
            focusDeny: false,
            focusCancel: false,
            returnFocus: true,
            showCloseButton: false,
            closeButtonHtml: '&times;',
            closeButtonAriaLabel: 'إغلاق هذا التنبيه',
            loaderHtml: '',
            showLoaderOnConfirm: false,
            showLoaderOnDeny: false,
            imageUrl: null,
            imageWidth: null,
            imageHeight: null,
            imageAlt: '',
            input: undefined,
            inputPlaceholder: '',
            inputLabel: '',
            inputValue: '',
            inputOptions: {},
            inputAutoTrim: true,
            inputAttributes: {},
            inputValidator: null,
            returnInputValueOnDeny: false,
            validationMessage: null,
            footer: '',
            toast: false,
            rtl: true,
            theme: 'light',
            language: 'ar',
            animationType: 'fade',
            progressSteps: [],
            currentProgressStep: null,
            progressStepsDistance: '40px',
            scrollbarPadding: true
        };

        this.translations = {
            ar: {
                confirmButtonText: 'موافق',
                denyButtonText: 'لا',
                cancelButtonText: 'إلغاء',
                inputPlaceholder: 'اكتب هنا...',
                validationMessage: 'هذا الحقل مطلوب',
                closeButtonText: 'إغلاق'
            },
            en: {
                confirmButtonText: 'Confirm',
                denyButtonText: 'No',
                cancelButtonText: 'Cancel',
                inputPlaceholder: 'Type here...',
                validationMessage: 'This field is required',
                closeButtonText: 'Close'
            }
        };

        this.queue = [];
        this.currentInstance = null;
        this.isVisible = false;
        this.timer = null;
        this.keydownHandler = null;
        this.clickHandler = null;

        this.init();
    }

    init() {
        this.injectStyles();
        this.createGlobalContainer();
        this.bindGlobalEvents();
    }

    injectStyles() {
        if (document.getElementById('al-ert-styles')) return;

        const styles = `
            @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
            
            :root {
                --al-ert-bg: #fff;
                --al-ert-text: #333;
                --al-ert-primary: #3085d6;
                --al-ert-success: #10b981;
                --al-ert-error: #ef4444;
                --al-ert-warning: #f59e0b;
                --al-ert-info: #3b82f6;
                --al-ert-border-radius: 0.5rem;
                --al-ert-padding: 1.25rem;
                --al-ert-spacing: 0.625rem;
            }

            .al-ert-container {
                position: fixed;
                direction: rtl;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 1rem;
                background-color: rgba(0, 0, 0, 0.4);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .al-ert-container.show {
                opacity: 1;
                visibility: visible;
            }

            .al-ert-container.ltr {
                direction: ltr;
            }

            .al-ert {
                background-color: var(--al-ert-bg);
                border-radius: var(--al-ert-border-radius);
                max-width: 32rem;
                width: 100%;
                padding: var(--al-ert-padding);
                text-align: center;
                color: var(--al-ert-text);
                position: relative;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                transform: scale(0.8);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .al-ert.show {
                transform: scale(1);
                opacity: 1;
            }

            .al-ert.dark {
                background-color: #1f2937;
                color: #f9fafb;
            }

            .al-ert-toast {
                background-color: var(--al-ert-bg);
                border-radius: var(--al-ert-border-radius);
                padding: 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                min-width: 16rem;
                max-width: 24rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                position: relative;
                overflow: hidden;
            }

            .al-ert-toast.dark {
                background-color: #1f2937;
                color: #f9fafb;
            }

            .al-ert-icon {
                margin: 0 auto 1rem;
                font-size: 3rem;
                line-height: 1;
            }

            .al-ert-icon.success { color: var(--al-ert-success); }
            .al-ert-icon.error { color: var(--al-ert-error); }
            .al-ert-icon.warning { color: var(--al-ert-warning); }
            .al-ert-icon.info { color: var(--al-ert-info); }
            .al-ert-icon.question { color: var(--al-ert-primary); }

            .al-ert-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                line-height: 1.2;
            }

            .al-ert-text {
                font-size: 1rem;
                line-height: 1.5;
                margin-bottom: 1rem;
            }

            .al-ert-html-container {
                font-size: 1rem;
                line-height: 1.5;
                margin-bottom: 1rem;
                text-align: initial;
            }

            .al-ert-input {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e5e7eb;
                border-radius: 0.375rem;
                font-size: 1rem;
                margin-bottom: 1rem;
                outline: none;
                transition: border-color 0.2s;
            }

            .al-ert-input:focus {
                border-color: var(--al-ert-primary);
            }

            .al-ert-validation-message {
                background-color: var(--al-ert-error);
                color: white;
                padding: 0.5rem 0.75rem;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                margin-bottom: 1rem;
                display: none;
            }

            .al-ert-validation-message.show {
                display: block;
            }

            .al-ert-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                flex-wrap: wrap;
            }

            .al-ert-button {
                padding: 0.625rem 1.25rem;
                border: none;
                border-radius: 0.375rem;
                font-size: 1rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                outline: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .al-ert-button:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .al-ert-button:active {
                transform: translateY(0);
            }

            .al-ert-button.confirm {
                background-color: var(--al-ert-primary);
                color: white;
            }

            .al-ert-button.deny {
                background-color: var(--al-ert-error);
                color: white;
            }

            .al-ert-button.cancel {
                background-color: #6b7280;
                color: white;
            }

            .al-ert-button.loading {
                opacity: 0.7;
                cursor: not-allowed;
            }

            .al-ert-button.loading::after {
                content: '';
                width: 1rem;
                height: 1rem;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-radius: 50%;
                animation: al-ert-spin 0.8s linear infinite;
            }

            @keyframes al-ert-spin {
                to { transform: rotate(360deg); }
            }

            .al-ert-footer {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid #e5e7eb;
                font-size: 0.875rem;
                color: #6b7280;
                text-align: center;
            }

            .al-ert-timer-progress-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 0.25rem;
                background-color: var(--al-ert-primary);
                border-radius: 0 0 var(--al-ert-border-radius) var(--al-ert-border-radius);
                transition: width linear;
            }

            .al-ert-close-button {
                position: absolute;
                top: 0.75rem;
                left: 0.75rem;
                width: 2rem;
                height: 2rem;
                border: none;
                background: transparent;
                color: #6b7280;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 0.375rem;
                transition: all 0.2s;
            }

            .al-ert-close-button:hover {
                background-color: #f3f4f6;
                color: #374151;
            }

            .al-ert-image {
                max-width: 100%;
                margin: 1.5rem auto;
                border-radius: 0.375rem;
            }

            .al-ert-progress-steps {
                display: flex;
                justify-content: center;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }

            .al-ert-progress-step {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                background-color: #e5e7eb;
                color: #6b7280;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                margin: 0 0.25rem;
                position: relative;
            }

            .al-ert-progress-step.active {
                background-color: var(--al-ert-primary);
                color: white;
            }

            .al-ert-progress-step::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 100%;
                width: 0.625rem;
                height: 2px;
                background-color: #e5e7eb;
                transform: translateY(-50%);
            }

            .al-ert-progress-step:last-child::after {
                display: none;
            }

            .al-ert-progress-step.active::after {
                background-color: var(--al-ert-primary);
            }

            /* Toast Container */
            .al-ert-toast-container {
                position: fixed;
                z-index: 9999;
                pointer-events: none;
            }

            .al-ert-toast-container.top-right {
                top: 1rem;
                right: 1rem;
            }

            .al-ert-toast-container.top-left {
                top: 1rem;
                left: 1rem;
            }

            .al-ert-toast-container.bottom-right {
                bottom: 1rem;
                right: 1rem;
            }

            .al-ert-toast-container.bottom-left {
                bottom: 1rem;
                left: 1rem;
            }

            .al-ert-toast-container.top-center {
                top: 1rem;
                left: 50%;
                transform: translateX(-50%);
            }

            .al-ert-toast-container.bottom-center {
                bottom: 1rem;
                left: 50%;
                transform: translateX(-50%);
            }

            .al-ert-toast-item {
                margin-bottom: 0.75rem;
                transform: translateX(120%);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: all;
            }

            .al-ert-toast-item.show {
                transform: translateX(0);
                opacity: 1;
            }

            .al-ert-toast-item.ltr {
                direction: ltr;
            }

            /* Responsive */
            @media (max-width: 640px) {
                .al-ert {
                    margin: 0.5rem;
                    max-width: calc(100% - 1rem);
                }

                .al-ert-toast-container {
                    left: 0.5rem !important;
                    right: 0.5rem !important;
                    transform: none !important;
                }

                .al-ert-actions {
                    flex-direction: column;
                }

                .al-ert-button {
                    width: 100%;
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = 'al-ert-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    createGlobalContainer() {
        if (!document.getElementById('al-ert-global-container')) {
            const container = document.createElement('div');
            container.id = 'al-ert-global-container';
            document.body.appendChild(container);
        }
    }

    bindGlobalEvents() {
        this.keydownHandler = (e) => {
            if (this.isVisible && this.currentInstance) {
                const instance = this.currentInstance;
                
                if (e.key === 'Escape' && instance.params.allowEscapeKey) {
                    this.close('esc');
                } else if (e.key === 'Enter' && instance.params.allowEnterKey) {
                    const confirmButton = this.getConfirmButton();
                    if (confirmButton && document.activeElement !== confirmButton) {
                        confirmButton.click();
                    }
                }
            }
        };

        document.addEventListener('keydown', this.keydownHandler, true);
    }

    getTranslation(key) {
        const lang = this.currentInstance?.params?.language || 'ar';
        return this.translations[lang]?.[key] || this.translations.ar[key];
    }

    fire(params = {}) {
        return new Promise((resolve) => {
            const instance = {
                params: { ...this.defaultOptions, ...params },
                resolve
            };

            // Auto-detect RTL
            const rtlLanguages = ['ar', 'fa', 'he'];
            if (!params.rtl && rtlLanguages.includes(instance.params.language)) {
                instance.params.rtl = true;
            } else if (params.rtl === undefined && !rtlLanguages.includes(instance.params.language)) {
                instance.params.rtl = false;
            }

            // Auto-detect theme
            if (instance.params.theme === 'auto') {
                instance.params.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }

            this.queue.push(instance);
            this.processQueue();
        });
    }

    processQueue() {
        if (this.isVisible || this.queue.length === 0) return;

        this.currentInstance = this.queue.shift();
        this.render();
        this.show();
    }

    render() {
        const instance = this.currentInstance;
        const params = instance.params;

        // Remove existing alert
        const existingAlert = document.querySelector('.al-ert-container');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create container
        const container = document.createElement('div');
        container.className = `al-ert-container ${params.rtl ? '' : 'ltr'} ${params.customClass.container || ''}`;
        container.style.backgroundColor = params.backdropColor;

        // Create alert
        const alert = document.createElement('div');
        alert.className = `al-ert ${params.theme === 'dark' ? 'dark' : ''} ${params.customClass.popup || ''}`;
        
        if (params.toast) {
            alert.className += ' al-ert-toast';
        }

        // Build alert content
        let alertHTML = '';

        // Progress steps
        if (params.progressSteps && params.progressSteps.length) {
            alertHTML += '<div class="al-ert-progress-steps">';
            params.progressSteps.forEach((step, index) => {
                const isActive = index === params.currentProgressStep;
                alertHTML += `<div class="al-ert-progress-step ${isActive ? 'active' : ''}">${index + 1}</div>`;
            });
            alertHTML += '</div>';
        }

        // Icon
        if (params.icon && !params.toast) {
            alertHTML += `<div class="al-ert-icon ${params.icon}">${this.getIconHTML(params.icon)}</div>`;
        }

        // Image
        if (params.imageUrl) {
            const imageStyles = [
                params.imageWidth ? `width: ${params.imageWidth}` : '',
                params.imageHeight ? `height: ${params.imageHeight}` : ''
            ].filter(Boolean).join('; ');
            
            alertHTML += `<img class="al-ert-image" src="${params.imageUrl}" alt="${params.imageAlt || ''}" style="${imageStyles}">`;
        }

        // Title
        if (params.title) {
            alertHTML += `<h2 class="al-ert-title ${params.customClass.title || ''}">${params.title}</h2>`;
        }

        // Content
        if (params.html) {
            alertHTML += `<div class="al-ert-html-container ${params.customClass.htmlContainer || ''}">${params.html}</div>`;
        } else if (params.text) {
            alertHTML += `<div class="al-ert-text">${params.text}</div>`;
        }

        // Input
        if (params.input) {
            const inputAttributes = Object.entries(params.inputAttributes || {})
                .map(([key, value]) => `${key}="${value}"`)
                .join(' ');
            
            alertHTML += `
                <input class="al-ert-input ${params.customClass.input || ''}" 
                       type="${params.input}" 
                       placeholder="${params.inputPlaceholder || ''}" 
                       value="${params.inputValue || ''}"
                       ${inputAttributes}>
            `;
            
            if (params.inputLabel) {
                alertHTML = `<label class="al-ert-input-label">${params.inputLabel}</label>` + alertHTML;
            }
        }

        // Validation message
        alertHTML += `<div class="al-ert-validation-message ${params.customClass.validationMessage || ''}"></div>`;

        // Actions (buttons)
        if (!params.toast) {
            alertHTML += '<div class="al-ert-actions">';
            
            if (params.showDenyButton) {
                alertHTML += `<button class="al-ert-button deny ${params.customClass.denyButton || ''}" 
                                     style="background-color: ${params.denyButtonColor}">
                                     ${params.denyButtonText || this.getTranslation('denyButtonText')}
                               </button>`;
            }
            
            if (params.showCancelButton) {
                alertHTML += `<button class="al-ert-button cancel ${params.customClass.cancelButton || ''}" 
                                     style="background-color: ${params.cancelButtonColor}">
                                     ${params.cancelButtonText || this.getTranslation('cancelButtonText')}
                               </button>`;
            }
            
            if (params.showConfirmButton) {
                alertHTML += `<button class="al-ert-button confirm ${params.customClass.confirmButton || ''}" 
                                     style="background-color: ${params.confirmButtonColor}">
                                     ${params.confirmButtonText || this.getTranslation('confirmButtonText')}
                               </button>`;
            }
            
            alertHTML += '</div>';
        }

        // Footer
        if (params.footer) {
            alertHTML += `<div class="al-ert-footer ${params.customClass.footer || ''}">${params.footer}</div>`;
        }

        // Timer progress bar
        if (params.timer && params.timerProgressBar) {
            alertHTML += '<div class="al-ert-timer-progress-bar"></div>';
        }

        // Close button
        if (params.showCloseButton) {
            alertHTML += `<button class="al-ert-close-button" aria-label="${params.closeButtonAriaLabel || this.getTranslation('closeButtonText')}">${params.closeButtonHtml}</button>`;
        }

        alert.innerHTML = alertHTML;

        // Apply custom styles
        if (params.width) {
            alert.style.width = typeof params.width === 'number' ? `${params.width}px` : params.width;
        }
        if (params.padding) {
            alert.style.padding = typeof params.padding === 'number' ? `${params.padding}px` : params.padding;
        }
        if (params.color) {
            alert.style.color = params.color;
        }
        if (params.background) {
            alert.style.background = params.background;
        }

        container.appendChild(alert);
        document.getElementById('al-ert-global-container').appendChild(container);

        // Store references
        instance.container = container;
        instance.alert = alert;

        // Bind events
        this.bindEvents(instance);
    }

    bindEvents(instance) {
        const { container, alert, params } = instance;

        // Close button
        const closeButton = alert.querySelector('.al-ert-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close('close'));
        }

        // Confirm button
        const confirmButton = alert.querySelector('.al-ert-button.confirm');
        if (confirmButton) {
            confirmButton.addEventListener('click', () => this.handleConfirm(instance));
        }

        // Deny button
        const denyButton = alert.querySelector('.al-ert-button.deny');
        if (denyButton) {
            denyButton.addEventListener('click', () => this.handleDeny(instance));
        }

        // Cancel button
        const cancelButton = alert.querySelector('.al-ert-button.cancel');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => this.handleCancel(instance));
        }

        // Outside click
        if (params.allowOutsideClick) {
            container.addEventListener('click', (e) => {
                if (e.target === container) {
                    this.close('outside');
                }
            });
        }

        // Input events
        const input = alert.querySelector('.al-ert-input');
        if (input) {
            input.addEventListener('input', () => {
                this.hideValidation();
            });
        }
    }

    handleConfirm(instance) {
        const { alert, params } = instance;
        const confirmButton = alert.querySelector('.al-ert-button.confirm');
        
        if (params.showLoaderOnConfirm) {
            confirmButton.classList.add('loading');
            confirmButton.disabled = true;
        }

        if (params.input) {
            const input = alert.querySelector('.al-ert-input');
            const value = input.value;

            if (params.inputValidator) {
                const validationResult = params.inputValidator(value);
                if (validationResult) {
                    this.showValidation(validationResult);
                    confirmButton.classList.remove('loading');
                    confirmButton.disabled = false;
                    return;
                }
            }

            if (params.preConfirm) {
                params.preConfirm(value).then((preConfirmResult) => {
                    instance.resolve({ value, isConfirmed: true, ...preConfirmResult });
                    this.close();
                }).catch((error) => {
                    this.showValidation(error);
                    confirmButton.classList.remove('loading');
                    confirmButton.disabled = false;
                });
                return;
            }

            instance.resolve({ value, isConfirmed: true });
        } else {
            if (params.preConfirm) {
                params.preConfirm().then((preConfirmResult) => {
                    instance.resolve({ isConfirmed: true, ...preConfirmResult });
                    this.close();
                }).catch((error) => {
                    this.showValidation(error);
                    confirmButton.classList.remove('loading');
                    confirmButton.disabled = false;
                });
                return;
            }

            instance.resolve({ isConfirmed: true });
        }

        this.close();
    }

    handleDeny(instance) {
        const { alert, params } = instance;
        const denyButton = alert.querySelector('.al-ert-button.deny');
        
        if (params.showLoaderOnDeny) {
            denyButton.classList.add('loading');
            denyButton.disabled = true;
        }

        if (params.input && params.returnInputValueOnDeny) {
            const input = alert.querySelector('.al-ert-input');
            const value = input.value;

            if (params.preDeny) {
                params.preDeny(value).then((preDenyResult) => {
                    instance.resolve({ value, isDenied: true, ...preDenyResult });
                    this.close();
                }).catch((error) => {
                    this.showValidation(error);
                    denyButton.classList.remove('loading');
                    denyButton.disabled = false;
                });
                return;
            }

            instance.resolve({ value, isDenied: true });
        } else {
            if (params.preDeny) {
                params.preDeny().then((preDenyResult) => {
                    instance.resolve({ isDenied: true, ...preDenyResult });
                    this.close();
                }).catch((error) => {
                    this.showValidation(error);
                    denyButton.classList.remove('loading');
                    denyButton.disabled = false;
                });
                return;
            }

            instance.resolve({ isDenied: true });
        }

        this.close();
    }

    handleCancel(instance) {
        instance.resolve({ isDismissed: true, dismiss: 'cancel' });
        this.close();
    }

    showValidation(message) {
        const validationElement = this.currentInstance.alert.querySelector('.al-ert-validation-message');
        if (validationElement) {
            validationElement.textContent = message;
            validationElement.classList.add('show');
        }
    }

    hideValidation() {
        const validationElement = this.currentInstance.alert.querySelector('.al-ert-validation-message');
        if (validationElement) {
            validationElement.classList.remove('show');
        }
    }

    getConfirmButton() {
        return this.currentInstance?.alert?.querySelector('.al-ert-button.confirm');
    }

    getDenyButton() {
        return this.currentInstance?.alert?.querySelector('.al-ert-button.deny');
    }

    getCancelButton() {
        return this.currentInstance?.alert?.querySelector('.al-ert-button.cancel');
    }

    getInput() {
        return this.currentInstance?.alert?.querySelector('.al-ert-input');
    }

    show() {
        if (!this.currentInstance) return;

        const { container, alert, params } = this.currentInstance;

        // Show container
        setTimeout(() => {
            container.classList.add('show');
        }, 10);

        // Show alert with animation
        setTimeout(() => {
            alert.classList.add('show');
        }, 50);

        this.isVisible = true;

        // Start timer
        if (params.timer) {
            this.startTimer();
        }

        // Focus management
        if (params.focusConfirm) {
            const confirmButton = this.getConfirmButton();
            if (confirmButton) confirmButton.focus();
        } else if (params.focusDeny) {
            const denyButton = this.getDenyButton();
            if (denyButton) denyButton.focus();
        } else if (params.focusCancel) {
            const cancelButton = this.getCancelButton();
            if (cancelButton) cancelButton.focus();
        }
    }

    close(dismiss = null) {
        if (!this.currentInstance || !this.isVisible) return;

        const { container, alert, params, resolve } = this.currentInstance;

        // Stop timer
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // Hide alert
        alert.classList.remove('show');

        // Hide container
        setTimeout(() => {
            container.classList.remove('show');
        }, 100);

        // Remove from DOM after animation
        setTimeout(() => {
            container.remove();
            this.isVisible = false;
            this.currentInstance = null;

            // Resolve with dismiss reason
            if (dismiss) {
                resolve({ isDismissed: true, dismiss });
            }

            // Process next in queue
            this.processQueue();
        }, 300);
    }

    startTimer() {
        if (!this.currentInstance) return;

        const { alert, params } = this.currentInstance;
        const timerBar = alert.querySelector('.al-ert-timer-progress-bar');
        
        if (!timerBar) return;

        const duration = params.timer;
        let remaining = duration;
        let startTime = Date.now();

        timerBar.style.width = '100%';

        this.timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            remaining = duration - elapsed;
            const progress = (remaining / duration) * 100;

            timerBar.style.width = `${progress}%`;

            if (remaining <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.close('timer');
            }
        }, 16); // ~60fps
    }

    getIconHTML(icon) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            question: '<i class="fas fa-question-circle"></i>'
        };

        return icons[icon] || '';
    }

    // Toast methods
    toast(params = {}) {
        return this.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            ...params
        });
    }

    // Shortcut methods
    success(title, text, options = {}) {
        return this.fire({ title, text, icon: 'success', ...options });
    }

    error(title, text, options = {}) {
        return this.fire({ title, text, icon: 'error', ...options });
    }

    warning(title, text, options = {}) {
        return this.fire({ title, text, icon: 'warning', ...options });
    }

    info(title, text, options = {}) {
        return this.fire({ title, text, icon: 'info', ...options });
    }

    question(title, text, options = {}) {
        return this.fire({ 
            title, 
            text, 
            icon: 'question',
            showCancelButton: true,
            ...options 
        });
    }

    input(options = {}) {
        return this.fire({
            input: 'text',
            showCancelButton: true,
            ...options
        });
    }

    // Queue methods
    queue(steps) {
        return new Promise((resolve) => {
            const results = [];
            let currentStep = 0;

            const executeStep = () => {
                if (currentStep >= steps.length) {
                    resolve(results);
                    return;
                }

                const step = steps[currentStep];
                this.fire(step).then((result) => {
                    results.push(result);
                    currentStep++;
                    executeStep();
                });
            };

            executeStep();
        });
    }

    // Static methods
    static isVisible() {
        return window.alErtInstance?.isVisible || false;
    }

    static close() {
        if (window.alErtInstance) {
            window.alErtInstance.close();
        }
    }

    static getQueue() {
        return window.alErtInstance?.queue || [];
    }

    static isLoading() {
        const confirmButton = window.alErtInstance?.getConfirmButton();
        return confirmButton?.classList.contains('loading') || false;
    }

    static getInputValue() {
        const input = window.alErtInstance?.getInput();
        return input?.value || '';
    }

    static stopTimer() {
        if (window.alErtInstance?.timer) {
            clearInterval(window.alErtInstance.timer);
            window.alErtInstance.timer = null;
        }
    }

    static resumeTimer() {
        if (window.alErtInstance?.currentInstance?.params?.timer) {
            window.alErtInstance.startTimer();
        }
    }

    static toggleTimer() {
        if (window.alErtInstance?.timer) {
            this.stopTimer();
        } else {
            this.resumeTimer();
        }
    }

    static increaseTimer(amount) {
        if (window.alErtInstance?.currentInstance?.params?.timer) {
            window.alErtInstance.currentInstance.params.timer += amount;
        }
    }

    static isTimerRunning() {
        return !!window.alErtInstance?.timer;
    }
}

// Create global instance
const alErt = new AlErt();
window.alErt = alErt;
window.alErtInstance = alErt;

// Support CommonJS and ES Modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = alErt;
} else if (typeof window !== 'undefined') {
    window.alErt = alErt;
    window.AlErt = AlErt;
}