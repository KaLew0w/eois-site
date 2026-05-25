import { useEffect, useState } from 'react';
import './contactSectionStyle.css'
import { useForm, ValidationError } from '@formspree/react';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';

export default function ContactForm() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { t } = useTranslation();

    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

    if (!formId) {
        console.error('VITE_FORMSPREE_FORM_ID is not set in environment variables');
    }

    const [state, handleSubmit] = useForm(formId || 'xrgnprgj'); // Fallback to example ID if not set

    // Уведомление об успешной отправке
    useEffect(() => {
        if (state.succeeded) {
            api.success({
                message: t('home.contactForm.success_title'),
                description: t('home.contactForm.success_text'),
                icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                placement: 'topRight',
                duration: 5,
                style: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
            });
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 4000);
        }
    }, [state.succeeded, api, t]);

    // Уведомление об ошибках
    useEffect(() => {
        if (state.errors && Array.isArray(state.errors) && state.errors.length > 0) {
            const generalError = state.errors.find((err: { field: string | null; message: string }) => err.field === null);
            const fieldErrors = state.errors.filter((err: { field: string | null; message: string }) => err.field !== null);

            if (generalError) {
                // Общая ошибка (например, сеть или сервер)
                api.error({
                    message: t('home.contactForm.error_title'),
                    description: generalError.message || t('home.contactForm.error_submit'),
                    icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
                    placement: 'topRight',
                    duration: 6,
                    style: {
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                });
            } else if (fieldErrors.length > 0) {
                // Ошибки валидации полей
                api.warning({
                    message: t('home.contactForm.validation_error'),
                    description: t('home.contactForm.validation_error_text'),
                    icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
                    placement: 'topRight',
                    duration: 5,
                    style: {
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                });
            }
        }
    }, [state.errors, api, t]);

    // Уведомление о процессе отправки
    useEffect(() => {
        const key = 'submitting';

        if (state.submitting) {
            api.info({
                key,
                message: t('home.contactForm.sending'),
                description: t('home.contactForm.sending_description'),
                icon: <LoadingOutlined style={{ color: '#1890ff' }} spin />,
                placement: 'topRight',
                duration: 0, // Не закрывается автоматически
                style: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
            });
        } else {
            // Закрываем уведомление о процессе отправки после завершения
            api.destroy(key);
        }
    }, [state.submitting, api, t]);

    return (
        <>
            {contextHolder}
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                <input
                    id="name"
                    name="name"
                    placeholder={t('home.contactForm.name_placeholder')}
                    required
                    type="text"
                />
                <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                />
                <input
                    id="email"
                    name="email"
                    placeholder={t('home.contactForm.email_placeholder')}
                    required
                    type="email"
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
                <input
                    id="phone"
                    name="phone"
                    placeholder={t('home.contactForm.phone_placeholder')}
                    type="text"
                />
                <ValidationError
                    prefix="Phone"
                    field="phone"
                    errors={state.errors}
                />
                <input
                    id="company"
                    name="company"
                    placeholder={t('home.contactForm.company_placeholder')}
                    type="text"
                />
                <ValidationError
                    prefix="Company"
                    field="company"
                    errors={state.errors}
                />
                <textarea
                    id="message"
                    name="message"
                    placeholder={t('home.contactForm.message_placeholder') as string}
                ></textarea>
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                />
                <input name="_gotcha" style={{ display: "none" }} type="text" />
                <div className="contact-submit">
                    <button className="cta-button-contact-form" type="submit" disabled={state.submitting}>
                        {state.submitting ? t('home.contactForm.submitting') : t('home.contactForm.submit')}
                    </button>
                    <p className="disclaimer">
                        {t('home.contactForm.disclaimer')}
                    </p>
                </div>
            </form>

            {/* Сообщение об отправке */}
            {showSuccess && (
                <div className="form-success-popup" id="formSuccess">
                    <div className="form-popup-inner">
                        <button
                            className="close-popup"
                            onClick={() => setShowSuccess(false)}
                            type="button"
                        >
                            ×
                        </button>
                        <div className="icon-check">✔</div>
                        <h3>{t('home.contactForm.success_title')}</h3>
                        <p>{t('home.contactForm.success_text')}</p>
                    </div>
                </div>
            )}
        </>
    )
}